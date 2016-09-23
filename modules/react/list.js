var React = require('react'),
Xhr = require('/web/gtl/v04.20.00/gtl/js/xhr.js');

module.exports = React.createClass({
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
        this.xhr.setRequestHeader('Authorization','Bearer '+this.props.user.token);
        this.xhr.send('');
    },
    render:function(){
        return (
                <div>{this.parseArticles()}</div>
        );
    }
});
