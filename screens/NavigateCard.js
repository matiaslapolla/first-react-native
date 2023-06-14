import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from '../components/NavFavourites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handlePress = (data, details) => {
    dispatch(setDestination({
      location: details.geometry.location,
      description: data.description,
    }))

    navigation.navigate('RideOptionsCard')
  }

  return (
    <SafeAreaView className={'bg-white flex-1'}>
      <Text className={'text-center text-xl'}>Good Morning Wachin!</Text>
      <View className={'border-t border-gray-200 flex-shrink'}>
        <View className={'flex-row items-center justify-between px-4 py-3'}>
          <GooglePlacesAutocomplete
            placeholder={'Where to?'}
            nearbyPlacesAPI={'GooglePlacesSearch'}
            debounce={400}
            styles={styles}
            enablePoweredByContainer={false}
            returnKeyType={'search'}
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => { handlePress(data, details) }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
          />
        </View>
        <NavFavourites />

        <View className={'flex-row bg-white justify-evenly py-2 mt-auto border-top border-gray-100'}>
          <TouchableOpacity
            className={'flex items-center flex-row bg-black justify-between w-24 px-4 py-3 rounded-full'}
            onPress={() => navigation.navigate('RideOptionsCard')}
          >
            <Icon name={'car'} type={'font-awesome'} color={'white'} size={16} />
            <Text className={'text-center text-white font-bold'}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity className={'flex items-center flex-row border border-black bg-white justify-between w-24 px-4 py-3 rounded-full'}>
            <Icon name={'fast-food-outline'} type={'ionicon'} color={'black'} size={16} />
            <Text className={'text-center font-bold'}>Eats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: 'white',
      paddingTop: 20,
      flex: 1,
    },
    textInput: {
      backgroundColor: '#DDDDDF',
      fontSize: 18,
      borderRadius: 0,
    },
    textInputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 0,
    },
  }
)