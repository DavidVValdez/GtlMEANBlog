var $ = require('jquery'),
React = require('react');

module.exports = React.createClass({
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
});
