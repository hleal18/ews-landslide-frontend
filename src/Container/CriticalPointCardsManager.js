import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import CriticalPointCardsPresentation from "../Presentational/Info/CriticalPointCards";
import CriticalPointCardsAddFormManager from "./CriticalPointAddFormManager";
import RiskZonesContext, {
  useCriticalSpotUpdater,
} from "../Contexts/RiskZonesContext";
import AuthContext from "../Contexts/AuthContext";
import CriticalPointCardsWatchMap from "../Presentational/Info/CriticalPointWatchMap";

export default () => {
  const { riskZones } = useContext(RiskZonesContext);
  const { token } = useContext(AuthContext);
  const { riskZoneId } = useParams();
  const setCriticalSpot = useCriticalSpotUpdater();
  const [showingAddForm, setShowingAddForm] = useState(false);
  const [showingMap, setShowingMap] = useState(false);
  const [mapToShow, setMapToShow] = useState({});

  const currentRiskZone = riskZones.find(
    (riskZone) => riskZone._id === riskZoneId
  );
  const criticalSpots = currentRiskZone ? currentRiskZone.criticalSpots : [];

  return (
    <div>
      <CriticalPointCardsPresentation
        criticalPoints={criticalSpots}
        handleOpenAddMenu={() => setShowingAddForm(true)}
        handleOpenWatchMap={(ev) => {
          const { _id } = ev;
          const criticalPoint = criticalSpots.find((c) => c._id === _id);
          setMapToShow({
            lat: criticalPoint.latitude,
            lng: criticalPoint.longitude,
          });
          setShowingMap(true);
        }}
        riskZoneName={currentRiskZone ? currentRiskZone.name : ""}
      />
      <CriticalPointCardsAddFormManager
        setCriticalSpot={setCriticalSpot}
        showAddForm={showingAddForm}
        handleClose={() => setShowingAddForm(false)}
        riskZoneId={riskZoneId}
        riskZoneName={currentRiskZone ? currentRiskZone.name : ""}
        token={token}
      />

      <CriticalPointCardsWatchMap
        title="Posición punto critico"
        showWatchMap={showingMap}
        position={mapToShow}
        handleClose={() => setShowingMap(false)}
      />
    </div>
  );
};
