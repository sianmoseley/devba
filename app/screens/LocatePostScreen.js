import React, {Component} from 'react';
import {globalStyles} from '../config/Styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Firebase from 'firebase';

export default class LocatePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [53.3781, 1.4665],
      Location: '',
    };
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates() {
    const {location} = this.props.route.params;
    this.setState({Location: location});
    console.log(location);
    Firebase.database()
      .ref('location/' + location)
      .on('value', snapshot => {
        const buildingObject = snapshot.val();
        if (!buildingObject) {
          console.log('NO DATA IN FIREBASE:', Date(Date.now()));
        } else {
          const buildingArray = Object.values(buildingObject);
          this.setState({coordinates: buildingArray});
        }
      });
  }

  componentDidMount() {
    this.getCoordinates();
  }

  render() {
    console.log(this.state.coordinates);
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={globalStyles.map}
        region={{
          latitude: 53.3781,
          longitude: -1.4665,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0035,
        }}>
        <Marker
          coordinate={{
            latitude: this.state.coordinates[0],
            longitude: this.state.coordinates[1],
          }}
          title={this.state.Location}
        />
      </MapView>
    );
  }
}
