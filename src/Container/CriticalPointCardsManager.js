import React from 'react';
import CriticalPointCards from '../Presentational/Info/CriticalPointCards';
import DialogForm from '../Playground/DialogForm';

export default class CriticalPointCardsManager extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAddForm: false,
            criticalPoints: [1, 2, 3, 4, 5, 6, 7, ],
            addFormContent: {
                name: '',
                description: '',
                lat: 0,
                lng: 0
            }
        }
    }
    
    handleAddButton = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm
        }));
    }
    
    handleSubmit = () => {
        const criticalPointInfo= {
            ...this.state.addFormContent
        }
        console.log('CriticalPointInfo: ', criticalPointInfo);
        
        
    }
    
    handleText = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        
        this.setState((prevState) => ({
            addFormContent: {
                ...prevState.addFormContent,
                [id]: value
            }
        }));
    }
    
    handleMapClick = (e) => {
        console.log('Map click: ', e);
        this.setState((prevState) => ({
            addFormContent: {
                ...prevState.addFormContent,
                lat: e.lat,
                lng: e.lng
            }
        }));
    }
    
    render() {
        return (
            <div>
                <CriticalPointCards
                    criticalPoints={this.state.criticalPoints}
                    handleOpenAddMenu={this.handleAddButton}
                />
                <DialogForm 
                    showDialog={this.state.showAddForm}
                    handleClose={this.handleAddButton}
                    handleSubmit={this.handleSubmit}
                    nameContent={this.state.addFormContent.name}
                    descriptionContent={this.state.addFormContent.description}
                    mapContent={{ 
                        lat:  this.state.addFormContent.lat,
                        lng: this.state.addFormContent.lng
                    }}
                    handleMapClick={this.handleMapClick}
                    handleText={this.handleText}
                />
            </div>
        )
    }
}