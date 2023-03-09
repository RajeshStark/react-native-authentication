import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React from "react";
import { width } from "../utilities/dimensions";

type props = {
  title: string;
  onPress: () => void;
};

const CustomButton = ({ title, onPress }: props) => {
  return (
    <TouchableOpacity
      style={{
        width: width * 0.9,
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        margin: 20
      }}
      onPress={onPress}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
