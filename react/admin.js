(function(){
    'use strict';
    var
    Gtl = require('/web/gtl/v04.20.00/gtl/js/core.js'),
    Xhr = require('/web/gtl/v04.20.00/gtl/js/xhr.js'),
    $ = require('jquery'),
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

    Form = React.createClass({
        xhr:new XMLHttpRequest(),
        getInitialState:function(){
            return {title:'', content:'', publishDate:(new Date()).toISOString()};
        },
        titleChange:function(e){
            this.setState({title:e.target.value});
        },
        contentChange:function(e){
            this.setState({content:e.target.value});
        },
        onSubmit:function(e){
            e.preventDefault();
            /*this.setState({publishDate:(new Date()).toISOString()});*/
            this.xhr.onreadystatechange = () => {
                if(this.xhr.readyState === 4){
                    this.props.switchUI('list');
                }
            };
            this.xhr.open('POST','/api/articles');
            this.xhr.setRequestHeader('Authorization','Bearer '+user.token);
            this.xhr.send(JSON.stringify(this.state));
            this.setState(this.getInitialState());
            /*this.props.onSubmit();*/
        },
        render:function(){
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <h2>Title:</h2>
                        <div><input type="text" value={this.state.title} onChange={this.titleChange} /></div>
                        <h2>Content:</h2>
                        <div><textarea value={this.state.content} onChange={this.contentChange}></textarea></div>
                        <div><input type="submit" value="post" /></div>
                    </form>
                </div>
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
        render:function(){
            return (
                <div>
                    <div>
                        <button onClick={() => this.switchUI('list')}>List</button>
                        <button onClick={() => this.switchUI('add')}>Add</button>
                    </div>
                    {(() => {
                        return this.state.tab === 'list' ? <List /> : <Form switchUI={this.switchUI} />
                    })()}
                </div>
            );
        }
    });

    window.$ = $;
    window.jQuery = $;
    
    $(document).ready(function(){
        $('head').append($('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>'));

        $.ajax('/auth')
        .done(function(response){
            user = response;
            ReactDOM.render(<Client />, gtlQ('body > main'));
        });

    });

}());
