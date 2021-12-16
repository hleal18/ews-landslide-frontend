import React, { useContext, useState } from "react";
import RiskZonesContext from "../Contexts/RiskZonesContext";
import RiskZoneCards from "../Presentational/Info/RiskZoneCards";
import RiskZoneAddFormManager from "./RiskZoneAddFormManager";
import RiskZoneConfigManager from "./RiskZoneConfigManager";
import AuthContext from "../Contexts/AuthContext";
import { useRiskZoneNotificationSettingsUpdater } from "../Contexts/RiskZonesContext";

export default () => {
    const { riskZones, setRiskZones } = useContext(RiskZonesContext);
    const { token } = useContext(AuthContext);
    const setRiskZoneNotificationSettings = useRiskZoneNotificationSettingsUpdater();
    const [showingAddMenu, setShowingAddMenu] = useState(false);
    const [showingConfigMenu, setShowingConfigMenu] = useState(false);
    const [configMenuRiskZone, setConfigMenuRiskZone] = useState(undefined);

    return (
        <div>
            <RiskZoneCards
                riskZones={riskZones}
                handleOpenAddMenu={() => setShowingAddMenu(true)}
                handleOpenConfigMenu={(riskZone) => {
                    setConfigMenuRiskZone(riskZone);
                    setShowingConfigMenu(true);
                }}
            />
            <RiskZoneAddFormManager
                setRiskZones={setRiskZones}
                showAddForm={showingAddMenu}
                handleClose={() => setShowingAddMenu(false)}
                token={token}
            />
            {showingConfigMenu && (
                <RiskZoneConfigManager
                    riskZone={configMenuRiskZone}
                    showDialog={showingConfigMenu}
                    handleClose={() => setShowingConfigMenu(false)}
                    setRiskZoneNotificationSettings={setRiskZoneNotificationSettings}
                    token={token}
                />
            )}
        </div>
    );
};
