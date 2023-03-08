import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { height, width } from '../utilities/dimensions'

export default function Splash() {
  return (
    <SafeAreaView style={{width: width, height: height, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 32, fontWeight: '800', color: '#a93225'}}>My Application</Text>
    </SafeAreaView>
  )
}