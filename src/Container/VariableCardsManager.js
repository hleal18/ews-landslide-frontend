import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VariableCardsPresentation from '../Presentational/Info/VariableCards';
import VariableAddFormManager from './VariableAddFormManager';
import VariableConfigureFormManager from './VariableConfigureFormManager';
import AuthContext from '../Contexts/AuthContext';
import RiskZonesContext, { useVariableUpdater } from '../Contexts/RiskZonesContext';

export default () => {
    const { riskZones } = useContext(RiskZonesContext);
    const { token } = useContext(AuthContext);
    const { riskZoneId, criticalSpotId, sensorNodeId } = useParams();
    const setVariable = useVariableUpdater();

    const [showingAddForm, setShowingAddForm] = useState(false);
    const [showingConfigureForm, setShowingConfigureForm] = useState(false);

    const [variables, setVariables] = useState([]);
    const [idSensorsTaken, setIdSensorsTaken] = useState(new Set());
    const [sensorNodeName, setSensorNodeName] = useState('');

    const [currentRiskZone, setCurrentRiskZone] = useState(undefined);
    const [currentCriticalSpot, setCurrentCriticalSpot] = useState(undefined);
    const [currentSensorNode, setCurrentSensorNode] = useState(undefined);

    useEffect(() => {
        setCurrentRiskZone(riskZones.find((riskZone) => riskZone._id === riskZoneId));

        if (!currentRiskZone) return;

        const { criticalSpots } = currentRiskZone;
        setCurrentCriticalSpot(criticalSpots.find((criticalSpot) => criticalSpot._id === criticalSpotId));


        if (!currentCriticalSpot) return;

        const { sensorNodes } = currentCriticalSpot;
        setCurrentSensorNode(sensorNodes.find((sensorNode) => sensorNode._id === sensorNodeId));

        if (!currentSensorNode) return;
        const { variables, name } = currentSensorNode;

        setSensorNodeName(name);
        setVariables(variables);
        setIdSensorsTaken(variables.reduce((curSet, variable) => {
            curSet.add(variable.idSensor);
            return curSet;
        }, new Set()))



    }, [riskZoneId,
        criticalSpotId,
        sensorNodeId,
        riskZones,
        currentRiskZone,
        currentCriticalSpot,
        currentSensorNode]);

    return (
        <div>
            <VariableCardsPresentation
                variables={variables}
                handleOpenAddMenu={() => (setShowingAddForm(true))}
                handleOpenConfigureMenu={() => (setShowingConfigureForm(true))}
                riskZoneName={currentRiskZone ? currentRiskZone.name : ''}
                criticalSpotName={currentCriticalSpot ? currentCriticalSpot.name : ''}
                sensorNodeName={currentSensorNode ? currentSensorNode.name : ''}
            />
            <VariableConfigureFormManager
                showDialog={showingConfigureForm}
                handleClose={() => (setShowingConfigureForm(false))}
            />
            <VariableAddFormManager
                sensorNodeName={sensorNodeName}
                token={token}
                idSensorsTaken={idSensorsTaken}
                sensorNodeId={sensorNodeId}
                setVariable={setVariable}
                showAddForm={showingAddForm}
                handleClose={() => (setShowingAddForm(false))}
            />
        </div>
    )
}