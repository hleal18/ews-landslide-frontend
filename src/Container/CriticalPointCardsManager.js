import React from 'react';
import CriticalPointCardsPresentation from '../Presentational/Info/CriticalPointCards';
import CriticalPointCardsAddFormManager from './CriticalPointAddFormManager';

export default class CriticalPointCardsManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAddForm: false,
            criticalPoints: [{_id: 1}, {_id: 2},{_id: 3}, {_id: 4} ]
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