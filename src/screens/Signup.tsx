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
import React, { useState } from "react";
import { height, width } from "../utilities/dimensions";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { mailformat, passwordregex } from "../utilities/constants";

export default function Signup({ navigation }) {
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
    if(username.value.length == 0 || email.value.length == 0 || password.value.length == 0) {
        return Alert.alert("", "Please enter all fields");
    } else if (username.error || email.error || password.error) {
      Alert.alert("", "Please enter all fields");
    } else {
      Alert.alert("", "signed up");
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
