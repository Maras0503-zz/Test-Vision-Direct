
functionality = (function(){
    var init = (function(){
        $('.usersContent').html(_buildContent(usersObj, 'none', 'highToLow'));
        _listeners();
    });
    
    var usersObj = [
        { 
            name: 'Bao',
            surname: 'Stennett',
            email: 'bao.stennett@test.com',
            phone: '02093329746',
            age: 24,
            city: 'London'
        },
        { 
            name: 'Reta',
            surname: 'Redel',
            email: 'reta.redel"test.com',
            phone: '01371247018',
            age: 62,
            city: 'Essex'
        },
        { 
            name: 'Corrin',
            surname: 'Solano',
            email: 'corrin.solano@test.com',
            phone: '01181537246',
            age: 72,
            city: 'Reading'
        },
        { 
            name: 'Modesta',
            surname: 'Talbot',
            email: 'modesta.talbot@test.com',
            phone: '02039996653',
            age: 26,
            city: 'London'
        },
        { 
            name: 'Leigh',
            surname: 'Czech',
            email: 'leigh.czech@test.com',
            phone: '01889336964',
            age: 33,
            city: 'Staffordshire'
        },
        { 
            name: 'Russ',
            surname: 'Conway',
            email: 'russ.conway@test.com',
            phone: '01970742733',
            age: 19,
            city: 'Ceredigion'
        },
        { 
            name: 'Margaretta',
            surname: 'Sison',
            email: 'margaretta.sison@test.com',
            phone: '01418405633',
            age: 38,
            city: 'Glasgow'
        },
        { 
            name: 'Marlin',
            surname: 'Kunkel',
            email: 'marlin.kunkel@test.com',
            phone: '01516005763',
            age: 64,
            city: 'Liverpool'
        },
        { 
            name: 'Dominic',
            surname: 'Hurston',
            email: 'dominic.hurston@test.com',
            phone: '01273998035',
            age: 23,
            city: 'Brighton'
        },
        { 
            name: 'Starla',
            surname: 'Poteete',
            email: 'starla.poteete@test.com',
            phone: '01698425798',
            age: 43,
            city: 'North Lanakshire'
        }
    ];

    /**
     * In this function are all listeners pined to DOM
     */

    var _listeners = (function(){
        $('#userSorting').on('change', function(){
            _selectSortingMethod();
        });
        
        $(window).on('click', function(e){
            if(e.target.id === 'addNewUser' || e.target.id === 'trigger'){
                $('#popup').removeClass('hidden');
                $('#popupWindow').removeClass('hidden');
                $('#userSorting').attr('disabled', true);
            } else if (e.target.id === 'closePopup'){
                $('#popup').addClass('hidden');
                $('#popupWindow').addClass('hidden');
                $('#userSorting').attr('disabled', false);
                _clearForm();
            } else if (e.target.id === 'addUser') {    
                if(_validateForm()) {
                    _addUser();
                    _selectSortingMethod();
                    $('#popup').addClass('hidden');
                    $('#popupWindow').addClass('hidden');
                    $('#userSorting').attr('disabled', false);
                    _clearForm();
                }
            }
        });
    });

    var _addUser = (function(){
        usersObj.push({
            name: $('#name').val(),
            surname: $('#surname').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            age: $('#age').val(),
            city: $('#city').val()
        })
    });

    var _validateEmail = (function(){ 
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val())){
            return (true)
        }
        return (false)
    });

    var _validateForm = (function(){
        var logicalTestPassed = 0;
        //Validate name
        if($('#name').val().length === 0) {
            $('#nameAlert').html('Name is required');
        } else {
            logicalTestPassed++;
            $('#nameAlert').html('');
        }
        //Validate surname
        if($('#surname').val().length === 0) {
            $('#surnameAlert').html('Surname is required');
        } else {
            logicalTestPassed++;
            $('#surnameAlert').html('');
        }
        //Validate email
        if(!_validateEmail() && $('#email').val().length > 0) {
            $('#emailAlert').html('Incorrect e-mail format');
        } else {
            logicalTestPassed++;
            $('#emailAlert').html('');
        }
        //Validate age
        if ($('#age').val() < 0 || $('#age').val() > 130) {
            $('#ageAlert').html('Value out of range 0 - 130');
        } else {
            logicalTestPassed++;
            $('#ageAlert').html('');
        }
        //Validate phone
        console.log($('#phone').val());
        if(isNaN($('#phone').val()) || !$('#phone').val() === null) {
            $('#phoneAlert').html('Given value is not a number');
        } else {
            logicalTestPassed++;
            $('#phoneAlert').html('');
        }
        //Validate city
        if($('#city').val().length === 0) {
            $('#cityAlert').html('City is required');
        } else {
            logicalTestPassed++;
            $('#cityAlert').html('');
        }
        if(logicalTestPassed === 6) {
            return true;
        } else {
            return false;
        }
    });

    /**
     * Create content of user list from sorted table
     * @param {Array} usersArr array with users data 
     * @param {String} param witch column will be taken to sorting (name or city)
     * @param {String} direction direction of sorting (lowToHigh or highToLow)
     */
    var _buildContent = (function(usersArr, param, direction) {
        var content = '';
        _sortArray(usersArr, param, direction).forEach(function (el) {
            content += '<div class="user">';
            content += '<h2>' + el.name + ' ' + el.surname + '<span>( ' + el.age + ' )</span>' + '</h2>';
            content += '<h3>' + el.city + '</h3>';
            content += '<p>phone: ' + el.email + '</p>';
            content += '<p>email: ' + el.phone + '</p>';
            content += '</div>';
        });
        return content;
    });

    /**
     * Function called when selected sorting method is changing
     */
    var _selectSortingMethod = (function(){
        if ($('#userSorting').val() == 1){
            $('.usersContent').html(_buildContent(usersObj, 'name', 'lowToHigh'));
        } else if ($('#userSorting').val() == 2){
            $('.usersContent').html(_buildContent(usersObj, 'name', 'highToLow'));
        } else if ($('#userSorting').val() == 3){
            $('.usersContent').html(_buildContent(usersObj, 'city', 'lowToHigh'));
        } else if ($('#userSorting').val() == 4){
            $('.usersContent').html(_buildContent(usersObj, 'city', 'highToLow'));
        } else {
            $('.usersContent').html(_buildContent(usersObj, 'none', 'highToLow'));
        }
    });

    /**
     * Sorting given array according to parameters
     * @param {Array} usersArr array with users data 
     * @param {String} param witch column will be taken to sorting (name or city)
     * @param {String} direction direction of sorting (lowToHigh or highToLow)
     */
    var _sortArray = (function(array, param, direction){
        var temp;
        if( param === 'name' ){
            if ( direction === 'lowToHigh' ){
                for (i = 0; i<array.length-1 ; i++){
                    for (j = 0; j<array.length-i-1; j++){
                        if (array[j].name > array[j+1].name){
                            temp = array[j];
                            array[j] = array[j+1];
                            array[j+1] = temp;
                        }
                    }
                }
            } else {
                for (i = 0; i<array.length-1 ; i++){
                    for (j = 0; j<array.length-i-1; j++){
                        if (array[j].name < array[j+1].name){
                            temp = array[j];
                            array[j] = array[j+1];
                            array[j+1] = temp;
                        }
                    }
                }

            }
        } else {
            if ( direction === 'lowToHigh' ){
                for (i = 0; i<array.length-1 ; i++){
                    for (j = 0; j<array.length-i-1; j++){
                        if (array[j].city > array[j+1].city){
                            temp = array[j];
                            array[j] = array[j+1];
                            array[j+1] = temp;
                        }
                    }
                }
            } else {
                for (i = 0; i<array.length-1 ; i++){
                    for (j = 0; j<array.length-i-1; j++){
                        if (array[j].city < array[j+1].city){
                            temp = array[j];
                            array[j] = array[j+1];
                            array[j+1] = temp;
                        }
                    }
                }
            }
        }
        return array;
    });

    var _clearForm = (function() {
        $('#name').val('');
        $('#surname').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#age').val('');
        $('#city').val('');
        $('#nameAlert').html('');
        $('#surnameAlert').html('');
        $('#emailAlert').html('');
        $('#phoneAlert').html('');
        $('#ageAlert').html('');
        $('#cityAlert').html('');
    });

    $(document).ready(function(){
        init(); 
    });
})();