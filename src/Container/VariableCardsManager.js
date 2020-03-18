import React from 'react';
import VariableCardsPresentation from '../Presentational/Info/VariableCards';
import VariableAddFormManager from './VariableAddFormManager';
import VariableConfigureFormManager from './VariableConfigureFormManager';

export default class CriticalPointCardsManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAddForm: false,
            showConfigureForm: false,
            variables: [1, 2, 3, 4, 5, 6, 7, ]
        }
    }
    
    handleOpenAddMenu = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm
        }));
    }
    
    handleOpenConfigureMenu = () => {
        this.setState((prevState) => ({
            showConfigureForm: !prevState.showConfigureForm
        }));
    }
    
    render() {
        return (
            <div>
                <VariableCardsPresentation
                    variables={this.state.variables}
                    handleOpenAddMenu={this.handleOpenAddMenu}
                    handleOpenConfigureMenu={this.handleOpenConfigureMenu}
                />
                <VariableConfigureFormManager
                    showDialog={this.state.showConfigureForm}
                    handleClose={this.handleOpenConfigureMenu}
                />
                <VariableAddFormManager
                    showAddForm={this.state.showAddForm}
                    handleClose={this.handleOpenAddMenu}
                />
            </div>
        )
    }
}