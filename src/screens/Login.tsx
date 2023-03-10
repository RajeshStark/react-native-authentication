import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { height, width } from "../utilities/dimensions";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { mailformat, passwordregex } from "../utilities/constants";
import { useAuth } from "../contexts/Auth";
import { dummySignInApi } from "../services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }: any) {
  const [alldata, setAlldata] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData()
    }, [])
  );



  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@all_users");
      const mydata = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (mydata != null) {
        setAlldata(mydata);
      }
    } catch (e) {
      // error reading value
      console.log("Error in getting all user's data", e);
    }
  };

  const auth = useAuth();
  const [email, setEmail] = useState({
    value: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
  });

  const onChange = (type: string, value: string) => {
    if (type === "email" && !mailformat.test(value)) {
      setEmail({ value: value, error: true });
    } else if (type === "email" && mailformat.test(value)) {
      setEmail({ value: value, error: false });
    } else if (type === "password" && !passwordregex.test(value)) {
      setPassword({ value: value, error: true });
    } else if (type === "password" && passwordregex.test(value)) {
      setPassword({ value: value, error: false });
    }
  };

  const onSubmit = async () => {
    if (email.value.length == 0 || password.value.length == 0) {
      return Alert.alert("", "Please enter all fields");
    } else if (email.error || password.error) {
      Alert.alert("", "Please enter all fields");
    } else {
      const data = {
        email: email.value.toLowerCase(),
        password: password.value,
      };

      dummySignInApi(data, alldata).then((res) => {
        if (res?.code === 200) {
          Alert.alert("", res?.message);
          console.log("userdata", res?.data[0]);
          auth.signIn(res?.data);
        } else {
          Alert.alert("", res?.message);
          
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: "blue" }}>
        MY APP LOGIN{" "}
      </Text>
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

      <CustomButton title="Log in" onPress={() => onSubmit()} />

      <Pressable onPress={() => navigation.navigate("signup")}>
        <Text style={{ fontSize: 16 }}>
          Don't have an account?{" "}
          <Text
            style={{
              color: "blue",
              textDecorationLine: "underline",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Sign up
          </Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
