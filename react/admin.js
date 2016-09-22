(function(){
    'use strict';
    let
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
        getInitialState:function(){
            return {title:'', content:'', publishDate:(new Date()).toISOString()};
        },
        onSubmit:function(evt){
            let that = this;
            evt.preventDefault();
            $.ajax({
                url:'/api/articles',
                method:'POST',
                headers:{'Authorization':'Bearer '+user.token},
                data:JSON.stringify(this.state),
                dataType:'json',
                processData:false
            })
            .always(function(response){
                that.setState(that.getInitialState());
                that.props.switchUI();
            });
        },
        render:function(){
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <h2>Title:</h2>
                        <div><input placeholder="Enter a title" type="text" value={this.state.title} onChange={(evt) => {this.setState({title:evt.target.value})}} /></div>
                        <h2>Content:</h2>
                        <div><textarea placeholder="your message" value={this.state.content} onChange={(evt) => {this.setState({content:evt.target.value})}}></textarea></div>
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
        componentWillMount:function(){
            this.form = <Form switchUI={() => this.switchUI('list')} />;
            this.list = <List />;
        },
        render:function(){
            return (
                <div>
                    <div>
                        <button onClick={() => this.switchUI('list')}>List</button>
                        <button onClick={() => this.switchUI('add')}>Add</button>
                    </div>
                    {(() => {
                        return this.state.tab === 'list' ? this.list : this.form
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
