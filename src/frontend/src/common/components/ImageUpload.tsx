import React, { useState } from 'react';
import { userService } from '../../services/userService';
import { View, StyleSheet } from 'react-native';


const style = StyleSheet.create({
    container: {
    alignSelf: 'center',
    width: 320,
    margin: 10,
    backgroundColor: "#E1DCC5",
    },
    btn:{
        backgroundColor:"#E1DCC5",
    }
  
  });


export default function ImageUpload ()  {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const ImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadfile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
        userService.updatePrivateUserImage(formData)
        alert("DEU CERTO")
    } else {
      alert('Selecione um arquivo antes de fazer o upload.');
    }
  };

  return (
    <View style={style.container}>
      <input
        style={style.btn}
        type="file"
        name='teste'
        accept="image/*"
        onChange={ImageFile}
      />
    </View>
  );
};


