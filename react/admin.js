(function(){
    'use strict';
    var
    Gtl = require('/web/gtl/v04.20.00/gtl/js/core.js'),
    Xhr = require('/web/gtl/v04.20.00/gtl/js/xhr.js'),
    React = require('react'),
    ReactDOM = require('react-dom'),

    user,

    List = React.createClass({
        xhr:new XMLHttpRequest(),
        getInitialState:function(){
            return {articles:[]};
        },
        parseArticles:function(){
            return this.state.articles.map(function(item,indx){
                return (
                        <div key={indx}>{item.title}</div>
                );
            });
        },
        componentDidMount:function(){
            this.xhr.onreadystatechange = () => {
                if(this.xhr.readyState === 4){
                    this.setState({articles:JSON.parse(this.xhr.responseText)});
                }
            };
            this.xhr.open('GET','/api/articles');
            this.xhr.setRequestHeader('Authorization','Bearer '+user.token);
            this.xhr.send('');
        },
        render:function(){
            return (
                <div>{this.parseArticles()}</div>
            );
        }
    }),

    Client = React.createClass({
        getInitialState:function(){
            return {tab:'list'};
        },
        switchUI:function(ui){
            this.setState({tab:ui});
        },
        onClickList:function(evt){
            console.log('list');
            this.switchUI('list');
        },
        onClickAdd:function(evt){
            console.log('add');
            this.switchUI('add');
        },
        render:function(){
            return (
                <div>
                    <div>
                        <button onClick={this.onClickList}>List</button>
                        <button onClick={this.onClickAdd}>Add</button>
                    </div>
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
                user = JSON.parse(xhr.responseText);
                ReactDOM.render(<Client />, gtlQ('body > main'));
            }
        };
        xhr.open('GET','/auth');
        xhr.send('');
    }());

}());
