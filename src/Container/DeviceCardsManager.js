import React, { useContext, useState } from 'react';
import DeviceCardsPresentation from '../Presentational/Info/DeviceCards';
import DeviceAddFormManager from './DeviceAddFormManager';
import RiskZonesContext, { } from '../Contexts/RiskZonesContext';


export default () => {
    const [showingAddForm, setShowingAddForm] = useState(false);
    
    const devices = [{_id: 1}, {_id: 2},{_id: 3}, {_id: 4} ];
    return (
        <div>
            <DeviceCardsPresentation
                devices={devices}
                handleOpenAddMenu={() => (setShowingAddForm(true))}
            />
            <DeviceAddFormManager
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
            />
        </div>
    )
}