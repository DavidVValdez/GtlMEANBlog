(function(){
    'use strict';
    var
    Gtl = require('/web/gtl/v04.20.00/gtl/js/core.js'),
    Xhr = require('/web/gtl/v04.20.00/gtl/js/xhr.js'),
    React = require('react'),
    ReactDOM = require('react-dom'),

    bearer,

    LoginForm = React.createClass({
        xhr:gtlXhr(),
        onXhrReady:function(){
            console.log(arguments);
        },
        getInitialState:function(){
            return {u:'', p:''};
        },
        uChange:function(evt){
            this.setState({u:evt.target.value});
        },
        pChange:function(evt){
            this.setState({p:evt.target.value});
        },
        onSubmit:function(evt){
            evt.preventDefault();
            this.xhr.gtlFetch('GET', '/auth', undefined, this.onXhrReady, [['Authorization','Basic RGF2aWQ6a2Vzbw==']]);
        },
        render:function(){
            return (
                    <form onSubmit={this.onSubmit}>
                    <input type="text" name="u" onChange={this.uChange} />
                    <input type="password" name="p" onChange={this.pChange} />
                    <input type="submit" value="login" />
                    </form>
            );
        }
    }),
    
    Client = React.createClass({
        getInitialState:function(){
            return {};
        },
        render:function(){
            return (
                    <div>{(() => {
                        return bearer === undefined ? <LoginForm /> : <div>logged in </div> ;
                    })()}</div>
            );
        }
    });

    ReactDOM.render(<Client />, gtlQ('body > main'));

}());
/*
(function(){
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');

    var data = [
        {author:"keso", text:"gato bueno"},
        {author:"facus", text:"gato malo"}
    ];
    
    var Comment = React.createClass({
        render:function(){
            return (
                <div>
                    <h2>{this.props.author}</h2>
                    {this.props.children}
                </div>
            );
        }
    });
    
    var CommentList = React.createClass({
        render:function(){
            var comments = this.props.data.map(function(comment, indx){
                return (
                    <Comment key={indx} author={comment.author}>{comment.text}</Comment>
                );
            });
            return (
                <div>
                    {comments}
                </div>
            );
        }
    });
    
    var CommentForm = React.createClass({
        getInitialState:function(){
            return {author:'', text:''};
        },
        authorChange:function(e){
            this.setState({author:e.target.value});
        },
        textChange:function(e){
            this.setState({text:e.target.value});
        },
        onSubmit:function(e){
            e.preventDefault();
            data.push(this.state);
            this.setState(this.getInitialState());
            this.props.onSubmit();
        },
        render:function(){
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" value={this.state.author} onChange={this.authorChange} />
                        <input type="text" value={this.state.text} onChange={this.textChange} />
                        <input type="submit" value="post" />
                    </form>
                </div>
            );
        }
    });
    
    var CommentBox = React.createClass({
        getInitialState:function(){
            return {data:data};
        },
        onSubmit:function(){
            this.setState(this.getInitialState());
        },
        render:function(){
            return (
                <div>
                    <h1>Comments</h1>
                    <CommentList data={this.props.data} />
                    <CommentForm onSubmit={this.onSubmit} />
                </div>
            );
        }
    });

    ReactDOM.render(<CommentBox data={data} />, document.querySelector('#keso'));
}());
*/
