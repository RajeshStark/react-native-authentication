import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {

  useEffect(() => {
   const data = AsyncStorage.getItem('@AuthData');
   console.log({data});
   
  }, [])
  
  return (
    <View>
      <Text style={{color: 'red'}}>Home</Text>
    </View>
  )
}