import React from 'react';
import CriticalPointCardsPresentation from '../Presentational/Info/CriticalPointCards';
import CriticalPointCardsAddFormManager from './CriticalPointCardsAddFormManager';

export default class CriticalPointCardsManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAddForm: false,
            criticalPoints: [1, 2, 3, 4, 5, 6, 7, ]
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
                <CriticalPointCardsPresentation
                    criticalPoints={this.state.criticalPoints}
                    handleOpenAddMenu={this.handleAddButton}
                />
                <CriticalPointCardsAddFormManager 
                    showAddForm={this.state.showAddForm}
                    handleClose={this.handleAddButton}
                />
            </div>
        )
    }
}