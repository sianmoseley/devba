import React from 'react';
import {globalStyles} from '../style/Styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

//shows markers for SHU campus buildings

export default function MapScreen() {
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
        coordinate={{latitude: 53.380254, longitude: -1.465394}}
        title={'Adsetts Library'}
      />
      <Marker
        coordinate={{latitude: 53.377778, longitude: -1.467868}}
        title={'Arundel'}
      />
      <Marker
        coordinate={{latitude: 53.37693, longitude: -1.468305}}
        title={'Cantor'}
      />
      <Marker
        coordinate={{latitude: 53.378317, longitude: -1.46847}}
        title={'Charles Street'}
      />
      <Marker
        coordinate={{latitude: 53.375759, longitude: -1.492784}}
        title={'Chestnut Court'}
      />
      <Marker
        coordinate={{latitude: 53.371195, longitude: -1.490886}}
        title={'Collegiate Hall'}
      />
      <Marker
        coordinate={{latitude: 53.379296, longitude: -1.464054}}
        title={'Eric Mensforth'}
      />
      <Marker
        coordinate={{latitude: 53.379174, longitude: -1.465394}}
        title={'Harmer'}
      />
      <Marker
        coordinate={{latitude: 53.373079, longitude: -1.49177}}
        title={'Heart of Campus'}
      />
      <Marker
        coordinate={{latitude: 53.378753, longitude: -1.464892}}
        title={'Howard/Surrey'}
      />
      <Marker
        coordinate={{latitude: 53.371771, longitude: -1.490688}}
        title={'Library'}
      />
      <Marker
        coordinate={{latitude: 53.373456, longitude: -1.491416}}
        title={'Main Building'}
      />
      <Marker
        coordinate={{latitude: 53.374962, longitude: -1.492533}}
        title={'The Mews'}
      />
      <Marker
        coordinate={{latitude: 53.379651, longitude: -1.465135}}
        title={'Norfolk'}
      />
      <Marker
        coordinate={{latitude: 53.382606, longitude: -1.465704}}
        title={'Oneleven'}
      />
      <Marker
        coordinate={{latitude: 53.379195, longitude: -1.465705}}
        title={'Owen'}
      />
      <Marker
        coordinate={{latitude: 53.373666, longitude: -1.488716}}
        title={'Robert Winston Building'}
      />
      <Marker
        coordinate={{latitude: 53.371487, longitude: -1.490708}}
        title={'Saunders Building'}
      />
      <Marker
        coordinate={{latitude: 53.378878, longitude: -1.464006}}
        title={'Sheaf'}
      />
      <Marker
        coordinate={{latitude: 53.382367, longitude: -1.464478}}
        title={'Sheffield Institute of Arts (SIA)'}
      />
      <Marker
        coordinate={{latitude: 53.378201, longitude: -1.46793}}
        title={'Stoddart'}
      />
      <Marker
        coordinate={{latitude: 53.375662, longitude: -1.492358}}
        title={'Willow Court'}
      />
      <Marker
        coordinate={{latitude: 53.373222, longitude: -1.49015}}
        title={'Woodville'}
      />
    </MapView>
  );
}
