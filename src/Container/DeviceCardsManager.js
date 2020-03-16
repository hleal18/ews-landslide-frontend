import React from 'react';
import DeviceCardsPresentation from '../Presentational/Info/DeviceCards';
import DeviceAddFormManager from './DeviceAddFormManager';

export default class CriticalPointCardsManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAddForm: false,
            devices: [1, 2, 3, 4, 5, 6, 7, ]
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
                <DeviceCardsPresentation
                    devices={this.state.devices}
                    handleOpenAddMenu={this.handleAddButton}
                />
                <DeviceAddFormManager 
                    showAddForm={this.state.showAddForm}
                    handleClose={this.handleAddButton}
                />
            </div>
        )
    }
}