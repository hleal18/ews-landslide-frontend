import React, { useContext, useState, useEffect } from 'react';
import RiskZonesContext from '../Contexts/RiskZonesContext';
import AuthContext from '../Contexts/AuthContext';
import EwsApi from '../Api/ewsApi';
import AlertsTable from '../Presentational/Info/AlertsTable';

export default () => {
  const { riskZones } = useContext(RiskZonesContext);
  const { token } = useContext(AuthContext);
  const [transformedAlerts, setTransformedAlerts] = useState([]);

  useEffect(() => {
    const transformAlerts = async () => {
      try {
        const result = await EwsApi.getAlerts(token);

        if (!result || result.length === 0) return;

        const alerts = [];
        result.forEach((alert) => {
          const {
            deviceId,
            variableId,
            value: variableValue,
            alertTriggererValue: thresholdValue,
            notified,
            timestamp,
          } = alert;

          if (!riskZones) return;
          let riskZone = riskZones.find(
            (rz) =>
              rz.criticalSpots.find(
                (cs) =>
                  cs.sensorNodes.find((d) => d._id === deviceId) !== undefined
              ) !== undefined
          );

          if (!riskZone) return;

          let criticalSpot = riskZone.criticalSpots.find(
            (cs) => cs.sensorNodes.find((d) => d._id === deviceId) !== undefined
          );

          if (!criticalSpot) return;

          let sensorNode = criticalSpot.sensorNodes.find(
            (d) => d._id === deviceId
          );

          if (!sensorNode) return;

          let variable = sensorNode.variables.find((v) => v._id === variableId);

          if (!variable) return;

          alerts.push({
            riskZoneName: riskZone.name,
            criticalSpotName: criticalSpot.name,
            sensorNodeName: sensorNode.name,
            variableName: variable.name,
            variableValue,
            thresholdValue,
            notified,
            timestamp,
          });
        });

        setTransformedAlerts(alerts);
      } catch (e) {
        console.log("An error occurred: ", e.message);
      }
    }

    transformAlerts();
  }, [riskZones, token]);

  return (
    <div>
      <AlertsTable alerts={transformedAlerts} />
    </div>
  )
}