import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from "../contexts/Auth";
import CustomButton from '../components/CustomButton';
import { height, width } from '../utilities/dimensions';


export default function Home() {
const [userdata, setuserdata] = useState<any>()
  const auth = useAuth();

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@AuthData");
      const mydata = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(mydata != null){
        setuserdata(mydata);
        console.log(mydata);
      }
    } catch (e) {
      // error reading value
      console.log("Error in getting user's data from homepage", e);
    }
  };

  const logout = () => {
    auth.signOut()
  }

  const onClear = () =>
  Alert.alert('Are you sure you want to clear all logins?', 'if you clear all logins all the data associated with users will be cleared', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => removeValue()},
  ]);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@all_users')
      logout()
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }
  
  return (
    <SafeAreaView style={{height: height, width: width, justifyContent: 'center', alignItems: 'center'}}>

       <Text style={{fontSize: 32, fontWeight: '700', color: '#000'}}>{`Hi ${userdata.length != 0  ? userdata[0].username : JSON.stringify(userdata)}. How are you ?`}</Text>
      
      <CustomButton title="Log out" onPress={() => logout()} />
      <CustomButton title="Clear All Users" onPress={() => onClear()} />
    </SafeAreaView>
  )
}