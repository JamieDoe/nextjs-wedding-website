'use client'

import { useState, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { weddingInfo } from '@/data/wedding-info'

const containerStyle = {
  width: '800px',
  height: '400px'
}

const center = {
  lat: 50.913667220784426,
  lng: -1.303812013030833
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        position={{
          lat: weddingInfo.receptionInfo.coordinates.lat,
          lng: weddingInfo.receptionInfo.coordinates.lng
        }}
      />
      <Marker
        position={{
          lat: weddingInfo.serviceInfo.coordinates.lat,
          lng: weddingInfo.serviceInfo.coordinates.lng
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(MyComponent)
