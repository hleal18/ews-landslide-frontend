import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };
  
//   constructor(props) {
//       super(props);
      
//       this.state = {
//           currentMarker: {
//             lat: center.lat,
//             lng: center.lng
//           }
//       }
//   }
  
//   handleClick = (e) => {
//       this.setState({
//           currentMarker: {
//               lat: e.lat,
//               lng: e.lng
//           }
//       });
//   }
  
//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyANwB6gQaXT2StJWRgbR6DV4tA5cBDm2PE' }}
//           defaultCenter={center}
//           defaultZoom={zoom}
//           onClick={this.handleClick}
//         >
//           {/* <AnyReactComponent
//             lat={position.lat}
//             lng={position.lng}
//             text="My Marker"
//           /> */}
//           <Marker 
//             lat={position.lat}
//             lng={position.lng}
//             text="My Marker"
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

export default function SimpleMap({ 
    position,
    handleClick
 }) {
    
    const center = {
        lat: 10.399,
        lng: -75.51
    };
    
    const zoom = 11;
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyANwB6gQaXT2StJWRgbR6DV4tA5cBDm2PE' }}
                defaultCenter={center}
                defaultZoom={zoom}
                onClick={handleClick}
            >
                <Marker 
                  lat={position.lat}
                  lng={position.lng}
                  text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}