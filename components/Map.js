import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { getDestination, getOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_API_KEY } from '@env'

const Map = () => {

  const origin = useSelector(getOrigin)
  const destination = useSelector(getDestination)
  const mapReference = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return

    mapReference.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })

  }, [origin, destination])

  useEffect(() => {
    if (!origin || !destination) return

    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
    }

    getTravelTime()

  }, [origin, destination, GOOGLE_MAPS_API_KEY])


  return (
    <View>
      <MapView
        ref={mapReference}
        className={'h-full'}
        mapType={'mutedStandard'}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >

        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor={'black'}
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title={'Origen'}
            description={origin.description}
            identifier={'origin'}
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title={'Destino'}
            description={destination.description}
            identifier={'destination'}
          />
        )}
      </MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})