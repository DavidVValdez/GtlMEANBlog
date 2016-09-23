(function(){
    'use strict';
    let
    $ = require('jquery'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Client = require('../modules/react/client.js');
    
    window.jQuery = window.$ = $;
    
    $(document).ready(function(){
        $('head').append($('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>'));

        $.ajax('/auth')
        .done(function(user){
            ReactDOM.render(<Client user={user} />, $('body > main')[0]);
        });

    });

}());
