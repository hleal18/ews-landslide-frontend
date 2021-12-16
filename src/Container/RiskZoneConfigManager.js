import React from "react";
import ewsApi from "../Api/ewsApi";
import RiskZoneConfigForm from "../Presentational/Forms/RiskZoneConfigForm";

class RiskZoneConfigManager extends React.Component {
    constructor(props) {
        super(props);

        console.log("Constructor, received riskzone: ", this.props.riskZone);

        this.state = {
            notificationsEnabled: this.props.riskZone?.notificationsEnabled ?? false,
            isLoading: false,
        }
    }

    handleSubmit = async () => {
        const { notificationsEnabled } = this.state;

        try {
            this.setState({ isLoading: true })
            
            await ewsApi.putRiskZoneNotifications(
                this.props.token,
                this.props.riskZone._id,
                notificationsEnabled
            );

            this.props.setRiskZoneNotificationSettings(
                this.props.riskZone._id,
                notificationsEnabled
            );

            this.props.handleClose();
        } catch (e) {
            console.log("Error happened");
        } finally {
            this.setState({ isLoading: false });
        }
    }

    handleCheckBox = (e) => {
        this.setState({
            ...this.state,
            notificationsEnabled: !this.state.notificationsEnabled,
        });
    }

    render() {
        return (
            <div>
                <RiskZoneConfigForm
                    {...this.props}
                    {...this.state}
                    {...this.errorMessage}
                    handleSubmit={this.handleSubmit}
                    handleText={() => console.log("Handling text")}
                    handleCheckBox={(e) => {
                        console.log('Event for checkbox: ', e.target);
                        this.handleCheckBox(e);
                    }}
                    showDialog={this.props.showDialog}
                    handleClose={this.props.handleClose}
                />
            </div>
        );
    }
}

export default RiskZoneConfigManager;
