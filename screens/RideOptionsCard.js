import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { getTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    "id": 1,
    "title": "UberX",
    "multiplier": 1,
    "image": "https://links.papareact.com/3pn",
  },
  {
    "id": 2,
    "title": "UberXL",
    "multiplier": 1.2,
    "image": "https://links.papareact.com/5w8",
  },
  {
    "id": 3,
    "title": "Uber LUX",
    "multiplier": 1.75,
    "image": "https://links.papareact.com/7pf",
  }
]

const RideOptionsCard = () => {

  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(getTravelTimeInformation)

  const handleSelected = (item) => {
    if (item.id === selected?.id) {
      setSelected(null)
    } else {
      setSelected(item)
    }
  }

  return (
    <SafeAreaView className={'bg-white flex flex-grow'}>
      <View className={'flex flex-row justify-center'}>
        <TouchableOpacity onPress={() => navigation.navigate("NavigateCard")} className={'flex-1 rounded-full'}>
          <Icon name={'chevron-left'} type={'font-awesome'} />
        </TouchableOpacity>
        <Text className={'text-center text-xl flex-2'}>Select a ride - {travelTimeInformation?.distance.text}</Text>
        <Text className={'flex-1'}></Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelected(item)}
            className={`flex-row items-center justify-center px-10 ${item.id === selected?.id && 'bg-slate-200'}`} >
            <Image style={{ width: 100, height: 100, resizeMode: 'contain' }} source={{ uri: item.image }} />
            <View>
              <Text className={'text-xl font-semibold'}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text className={'text-xl'}>{new Intl.NumberFormat('en-gb', {
              style: 'currency',
              currency: 'ARS',
            }).format(
              (travelTimeInformation?.duration.value * item.multiplier) / 2
            )}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View className={'bg-slate-200 h-0.5'} />
        )}
      />

      <View className={'mt-auto border-t border-slate-100'}>
        <TouchableOpacity disabled={!selected} className={`${!selected ? 'bg-gray-300' : 'bg-slate-900'}  py-3 m-3 rounded-lg`}>
          <Text className={'text-center text-white text-xl'}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})