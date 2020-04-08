import React, { useState, useContext } from 'react';
import VariableCardsPresentation from '../Presentational/Info/VariableCards';
import VariableAddFormManager from './VariableAddFormManager';
import VariableConfigureFormManager from './VariableConfigureFormManager';
import AuthContext from '../Contexts/AuthContext';
import RiskZonesContext, { } from '../Contexts/RiskZonesContext';

export default () => {
    const [showingAddForm, setShowingAddForm] = useState(false);
    const [showingConfigureForm, setShowingConfigureForm] = useState(false);
    const variables = [1, 2, 3, 4, 5, 6, 7 ];
    return (
        <div>
            <VariableCardsPresentation
                variables={variables}
                handleOpenAddMenu={() => (setShowingAddForm(true))}
                handleOpenConfigureMenu={() => (setShowingConfigureForm(true))}
            />
            <VariableConfigureFormManager
                showDialog={showingConfigureForm}
                handleClose={() => (setShowingConfigureForm(false))}
            />
            <VariableAddFormManager
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
            />
        </div>
    )
}