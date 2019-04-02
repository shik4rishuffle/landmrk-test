import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import geoJson from '../data/National_Trust_Open_Data__Land__Always_Open';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoic2hpazRyaXNodWZmbGUiLCJhIjoiY2p0eW9naDhhMDJ1MTN6cng4Mnp2bWJmMyJ9.TmlIfq2oA3xMH8BziA9VXw"
});

export default class TheMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: 0,
      currentLong: 0,
      geoJsonData: geoJson
    };
  }

    getLocation = () => {
      navigator.geolocation.getCurrentPosition(this.setPosition)
    };

    setPosition = (position) => {
      this.setState({currentLat: position.coords.latitude});
      this.setState({currentLong: position.coords.longitude});
      console.log(this.state);
    };


componentWillMount() {
  this.getLocation();
}

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={[this.state.currentLong, this.state.currentLat]}
        zoom={[15]}
        containerStyle={{
          width: "100vw",
          height: "100vh",
        }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
        </Layer>
        <GeoJSONLayer
          data={this.state.geoJsonData}
          symbolLayout={{
            "text-field": "{place}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
          }}/>
      </Map>
    );
  }
}