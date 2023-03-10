import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { height, width } from "../utilities/dimensions";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { mailformat, passwordregex } from "../utilities/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type itype = {
  username: string;
  email: string;
  token: string;
};
export default function Signup({ navigation }: any) {
  const [alldata, setAlldata] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@all_users");
      const mydata = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(mydata != null){
        setAlldata(mydata);
      }
    } catch (e) {
      // error reading value
      console.log("Error in getting all user's datanfrom signup page", e);
    }
  };

  const [username, setUsername] = useState({
    value: "",
    error: false,
  });

  const [email, setEmail] = useState({
    value: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
  });

  const onChange = (type: string, value: string) => {
    if (type === "username" && value.length < 6) {
      setUsername({ value: value, error: true });
    } else if (type === "username" && value !== "") {
      setUsername({ value: value, error: false });
    } else if (type === "email" && !mailformat.test(value)) {
      setEmail({ value: value, error: true });
    } else if (type === "email" && mailformat.test(value)) {
      setEmail({ value: value, error: false });
    } else if (type === "password" && !passwordregex.test(value)) {
      setPassword({ value: value, error: true });
    } else if (type === "password" && passwordregex.test(value)) {
      setPassword({ value: value, error: false });
    }
  };

  const onSubmit = () => {
    const data = alldata;
    let flag = false;
    console.log({data});
    
    if (
      username.value.length == 0 ||
      email.value.length == 0 ||
      password.value.length == 0
    ) {
      return Alert.alert("", "Please enter all fields");
    } else if (username.error || email.error || password.error) {
      Alert.alert("", "Please enter all fields");
    } else if (data == null) {
      data.push({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      storeData(data);
    } else {
      data.forEach((i) => {
        if (i.email == email.value) {
          flag = true;
        }
      });
      if (flag) return Alert.alert("", "email already exists");
      data.push({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      storeData(data);
    }
  };

  const storeData = async (value: object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@all_users", jsonValue);
      Alert.alert("", "signed up successfully, please login");
    } catch (e) {
      // saving error
      console.log(e, "Error saving users data");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require("../assets/chevron.png")}
          style={{ width: 40, height: 40, transform: [{ rotate: "180deg" }] }}
        />
      </Pressable>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: height * 0.2,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700", color: "blue" }}>
          MY APP SIGNUP{" "}
        </Text>
        <CustomInput
          value={username.value}
          placeholder="Please enter your username"
          onChangeText={(txt) => onChange("username", txt)}
          error={username.error}
          errortxt={"Please enter username atleast 6 letters"}
        />

        <CustomInput
          value={email.value}
          placeholder="Please enter your e-mail"
          onChangeText={(txt) => onChange("email", txt)}
          error={email.error}
          errortxt={"Please enter valid email"}
        />

        <CustomInput
          value={password.value}
          placeholder="Please enter your password"
          onChangeText={(txt) => onChange("password", txt)}
          error={password.error}
          errortxt={
            "Please atleast one special charecter, atleast one uppercase letter, lower case letter and number"
          }
        />

        <CustomButton title="Sign Up" onPress={() => onSubmit()} />

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16 }}>
            Already have an account?{" "}
            <Text
              style={{
                color: "blue",
                textDecorationLine: "underline",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Log in
            </Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#fff",
  },
});
