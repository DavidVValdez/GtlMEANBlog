let React = require('react'),
List = require('./list.js'),
Form = require('./form.js');

module.exports = React.createClass({
    getInitialState:function(){
        return {tab:'list'};
    },
    switchUI:function(ui){
        this.setState({tab:ui});
    },
    componentWillMount:function(){
        this.form = <Form switchUI={() => this.switchUI('list')} />;
        this.list = <List user={this.props.user} />;
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
