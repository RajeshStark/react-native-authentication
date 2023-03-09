import { View, Text, TextInput } from "react-native";
import React from "react";
import { width } from "../utilities/dimensions";

type props = {
  value: string;
  onChangeText: (txt: string) => void;
  placeholder: string;
  error : boolean;
  errortxt : string;
};

const CustomInput = ({ value, onChangeText, placeholder, error, errortxt }: props) => {
  return (
    <>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{  margin: 10, padding: 15, fontSize: 18,borderTopRightRadius: 10, width: width * 0.9, borderBottomWidth: 0.5, borderBottomColor: error ? 'red': 'blue' }}
    />
    {
        error ?
        <Text style={{ marginLeft: 20,color: 'red', fontSize: 14, alignSelf:'flex-start', width: width * 0.9, }}>{errortxt}</Text>
        : null
    }
    </>
  );
};

export default CustomInput;
