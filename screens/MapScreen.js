import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from './NavigateCard'
import RideOptionsCard from './RideOptionsCard'

const MapScreen = () => {

  const Stack = createStackNavigator()

  return (
    <View className={'bg-white h-full'}>
      <View className={'h-1/2'}>
        <Map />
      </View>
      <View className={'h-1/2'}>
        <Stack.Navigator>
          <Stack.Screen
            name={'NavigateCard'}
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={'RideOptionsCard'}
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})