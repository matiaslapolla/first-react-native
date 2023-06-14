import React from 'react'
import NavOptions from '../components/NavOptions'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'
// = AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY

const HomeScreen = () => {

  const dispatch = useDispatch()

  const handlePress = (data, details) => {
    dispatch(setOrigin({
      location: details.geometry.location,
      description: data.description,
    }))
    dispatch(setDestination(null))
  }


  return (
    <SafeAreaView className={'bg-white h-full'}>
      <View className={'p-5'}>
        <Text className={'text-4xl font-semibold'}>Alto Uber Ameo</Text>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI={'GooglePlacesSearch'}
          debounce={400}
          placeholder={'Where From?'}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            handlePress(data, details)
          }}

          fetchDetails={true}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

//just in case we need to style 
const styles = StyleSheet.create({})
