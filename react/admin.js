(function(){
    'use strict';
    var
    Gtl = require('/web/gtl/v04.20.00/gtl/js/core.js'),
    Xhr = require('/web/gtl/v04.20.00/gtl/js/xhr.js'),
    React = require('react'),
    ReactDOM = require('react-dom'),

    List = React.createClass({
        xhr:new XMLHttpRequest(),
        getInitialState:function(){
            return {};
        },
        componentDidMount:function(){
            console.log('keso');
        },
        onClickList:function(evt){
            console.log('list');
        },
        onClickAdd:function(evt){
            console.log('add');
        },
        render:function(){
            return (
                <div>
                    <button onClick={this.onClickList}>List</button>
                    <button onClick={this.onClickAdd}>Add</button>
                </div>
            );
        }
    }),

    Client = React.createClass({
        getInitialState:function(){
            return {tab:'list'};
        },
        render:function(){
            return (
                <div>
                {(() => {
                    return this.state.tab === 'list' ? <List /> : <div>form</div>
                })()}
                </div>
            );
        }
    });

    (function(){
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status !== 401){
                ReactDOM.render(<Client />, gtlQ('body > main'));
            }
        };
        xhr.open('GET','/auth');
        xhr.send('');
    }());

}());
