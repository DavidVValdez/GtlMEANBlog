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
