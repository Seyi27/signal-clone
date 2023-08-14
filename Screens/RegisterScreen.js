import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({navigation}) => {
  const [name, setName]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [imageUrl, setImageUrl]= useState('')

 

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerBackTitle:"Back",
    });
  },[]);

  const Register=()=>{
    auth
    .createUserWithEmailAndPassword(email.trim(),password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName:name,
        photoUrl:
         imageUrl || 'https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?w=184&h=192&c=7&r=0&o=5&pid=1.7'
      });
    })
    .catch((error)=> alert(error.message))
  }

  return (
    <View style={styles.container}>
        
            <Text h3 style={{marginBottom:10}}>Create a Signal Account</Text>

            <View style={styles.input}>
              <Input
              placeholder='Full Name'
              type='text'
              value={name}
              onChangeText={text=>setName(text)}
              />

              <Input
              placeholder='Email'
              type='email'
              value={email}
              onChangeText={text=>setEmail(text)}
              />

              <Input
              placeholder='Password'
              type='password'
              secureTextEntry
              value={password}
              onChangeText={text=>setPassword(text)}
              />

              <Input
              placeholder='Image Url'
              type='text'
              value={imageUrl}
              onChangeText={text=>setImageUrl(text)}
              />
            </View>

            <Button 
            onPress={Register} 
            title='Register'
            containerStyle={styles.button}
            />
       
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    width:300
  },
  button:{
    width:200
  }
})