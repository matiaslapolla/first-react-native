import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { getOrigin } from '../slices/navSlice'

const data = [
  {
    "id": 1,
    "title": "Get a ride",
    "image": "https://links.papareact.com/3pn",
    "screen": "MapScreen"
  },
  {
    "id": 2,
    "title": "Order food",
    "image": "https://links.papareact.com/28w",
    "screen": "EatsScreen"
  },
  {
    "id": 3,
    "title": "Go to the store",
    "image": "https://links.papareact.com/5w8",
    "screen": "MapScreen"
  }
]


const NavOptions = () => {

  const navigation = useNavigation()
  const origin = useSelector(getOrigin)

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className={'p-8 m-2 w-40 rounded-lg bg-slate-200'}
          disabled={!origin}
        >
          <View className={`${!origin && 'opacity-20'}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />
            <Text className={'mt-2 text-lg text-center font-semibold'}>{item.title}</Text>
            <Icon
              className={'p-2 mt-4 w-10 white rounded-full bg-slate-950'}
              type={'antdesign'}
              name={'arrowright'}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions

const styles = StyleSheet.create({})