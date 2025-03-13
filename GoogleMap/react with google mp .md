# Google Maps React Integration Cheat Sheet

## Setup and Installation

### 1. Install Required Packages

```bash
# Using npm
npm install @react-google-maps/api

# Using yarn
yarn add @react-google-maps/api
```

### 2. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable Google Maps JavaScript API
4. Create API key from Credentials page
5. Set restrictions for the API key (recommended)

## Basic Implementation

### Basic Map Component

```jsx
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyMap() {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Child components go here */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMap;
```

### Map with Marker

```jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function MapWithMarker() {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
      >
        <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapWithMarker;
```

## Common Components and Features

### InfoWindow

```jsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

function MapWithInfoWindow() {
  const [selected, setSelected] = useState(null);
  
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
      >
        <Marker
          position={{ lat: 37.7749, lng: -122.4194 }}
          onClick={() => setSelected(true)}
        />
        
        {selected && (
          <InfoWindow
            position={{ lat: 37.7749, lng: -122.4194 }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h3>San Francisco</h3>
              <p>Welcome to SF!</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
```

### Polyline

```jsx
import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

function MapWithPolyline() {
  const path = [
    { lat: 37.772, lng: -122.214 },
    { lat: 37.742, lng: -122.224 },
    { lat: 37.782, lng: -122.244 }
  ];

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 37.772, lng: -122.214 }}
        zoom={12}
      >
        <Polyline
          path={path}
          options={options}
        />
      </GoogleMap>
    </LoadScript>
  );
}
```

### Polygon

```jsx
import React from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

function MapWithPolygon() {
  const paths = [
    { lat: 25.774, lng: -80.190 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.190 }
  ];

  const options = {
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 25.774, lng: -80.190 }}
        zoom={5}
      >
        <Polygon
          paths={paths}
          options={options}
        />
      </GoogleMap>
    </LoadScript>
  );
}
```

### Circle

```jsx
import React from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

function MapWithCircle() {
  const center = { lat: 37.7749, lng: -122.4194 };
  
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={8}
      >
        <Circle
          center={center}
          options={options}
        />
      </GoogleMap>
    </LoadScript>
  );
}
```

## Advanced Features

### Autocomplete

```jsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];

function MapWithAutocomplete() {
  const [searchBox, setSearchBox] = useState(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const location = places[0].geometry.location;
      setCenter({
        lat: location.lat(),
        lng: location.lng()
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
      libraries={libraries}
    >
      <div>
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search places..."
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              marginBottom: '10px'
            }}
          />
        </StandaloneSearchBox>

        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={center}
          zoom={12}
        />
      </div>
    </LoadScript>
  );
}
```

### Directions

```jsx
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function MapWithDirections() {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  
  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res);
    }
  }, []);

  const origin = { lat: 37.7749, lng: -122.4194 }; // San Francisco
  const destination = { lat: 37.3382, lng: -121.8863 }; // San Jose

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '10px' }}>
          <select onChange={(e) => setTravelMode(e.target.value)} value={travelMode}>
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
        </div>
        
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={origin}
          zoom={12}
        >
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: travelMode
            }}
            callback={directionsCallback}
          />
          
          {response && (
            <DirectionsRenderer
              options={{
                directions: response
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
```

### Heat Maps

```jsx
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { HeatmapLayer } from '@react-google-maps/api';

const libraries = ['visualization'];

function MapWithHeatmap() {
  const center = { lat: 37.774546, lng: -122.433523 };
  
  const data = [
    { lat: 37.782551, lng: -122.445368 },
    { lat: 37.782745, lng: -122.444586 },
    { lat: 37.782842, lng: -122.443688 },
    { lat: 37.782919, lng: -122.442815 },
    { lat: 37.782992, lng: -122.442112 },
    { lat: 37.783100, lng: -122.441461 },
    { lat: 37.783206, lng: -122.440829 },
    { lat: 37.783273, lng: -122.440324 },
    { lat: 37.783316, lng: -122.440023 },
    { lat: 37.783357, lng: -122.439794 },
  ];

  const options = {
    radius: 20,
    opacity: 0.6,
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={13}
      >
        <HeatmapLayer
          data={data.map(point => new window.google.maps.LatLng(point.lat, point.lng))}
          options={options}
        />
      </GoogleMap>
    </LoadScript>
  );
}
```

## Custom Markers

```jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function MapWithCustomMarker() {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
      >
        <Marker
          position={{ lat: 37.7749, lng: -122.4194 }}
          icon={{
            url: 'https://example.com/custom-marker.png',
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20)
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
```

## Map Styling

```jsx
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function StyledMap() {
  // Custom styles from https://mapstyle.withgoogle.com/
  const mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    }
  ];

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
        options={{
          styles: mapStyles,
          disableDefaultUI: true
        }}
      >
        {/* No markers */}
      </GoogleMap>
    </LoadScript>
  );
}
```

## Performance Optimization

### Lazy Loading Maps

```jsx
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

function OptimizedMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_API_KEY',
    libraries
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 37.7749, lng: -122.4194 }}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components */}
    </GoogleMap>
  ) : <div>Loading...</div>;
}
```

### Memory Optimization

```jsx
import React, { useMemo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function MemoryOptimizedMap() {
  const center = useMemo(() => ({ lat: 37.7749, lng: -122.4194 }), []);
  
  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    scrollwheel: false
  }), []);
  
  const markers = useMemo(() => [
    { id: 1, position: { lat: 37.7749, lng: -122.4194 } },
    { id: 2, position: { lat: 37.7848, lng: -122.4294 } },
    { id: 3, position: { lat: 37.7648, lng: -122.4094 } }
  ], []);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={12}
        options={mapOptions}
      >
        {markers.map(({ id, position }) => (
          <Marker key={id} position={position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
```

## Event Handling

### Click Events

```jsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function MapWithClickEvents() {
  const [markers, setMarkers] = useState([]);
  
  const handleMapClick = (event) => {
    setMarkers([...markers, {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      time: new Date()
    }]);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
```
