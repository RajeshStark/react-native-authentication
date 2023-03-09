import React from 'react'
import { Text } from 'react-native'
import { AuthProvider } from './src/contexts/Auth'
import { EntryStack } from './src/navigation/EntryStack'

export default function App() {
  return (
    <AuthProvider> 
    <EntryStack/>
   </AuthProvider>
  )
}