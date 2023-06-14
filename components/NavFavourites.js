import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'

const dummyData = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Tandil, Buenos Aires, Argentina',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: 'Garibaldi 750, Tandil, Buenos Aires Province, Argentina',
  },
]

const NavFavourites = () => {

  const dispatch = useDispatch()

  const handlePress = (destination) => {
    dispatch(setDestination(destination))
  }

  return (
    <FlatList
      data={dummyData}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View className={'bg-slate-200 h-0.5'} />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={'flex-row items-center p-5'}
          onPress={() => handlePress(item.destination)}
        >
          <Icon
            className={'bg-slate-300 rounded-full mr-4 w-18 p-2'}
            name={item.icon}
            type={'ionicon'}
            color={'white'}
            size={18}
          />
          <View>
            <Text className={'font-semibold text-lg'}>{item.location}</Text>
            <Text className={'text-slate-500'}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})