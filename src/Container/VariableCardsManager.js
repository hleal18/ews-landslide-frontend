import React from 'react';
import VariableCardsPresentation from '../Presentational/Info/VariableCards';
import VariableAddFormManager from './VariableAddFormManager';

export default class CriticalPointCardsManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAddForm: false,
            variables: [1, 2, 3, 4, 5, 6, 7, ]
        }
    }
    
    handleAddButton = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm
        }));
    }
    
    
    
    render() {
        return (
            <div>
                <VariableCardsPresentation
                    variables={this.state.variables}
                    handleOpenAddMenu={this.handleAddButton}
                />
                {/* <VariableConfigureFormManager
                    showAddForm={this.state.showAddForm}
                    handleClose={this.handleAddButton}
                /> */}
                <VariableAddFormManager
                    showAddForm={this.state.showAddForm}
                    handleClose={this.handleAddButton}
                />
            </div>
        )
    }
}