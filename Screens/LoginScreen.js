import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((authUser)=>{
       if(authUser){
         navigation.replace('Home')
       }
      });
      return unsubscribe
    },[])

    const Login=()=>{
      auth
      .signInWithEmailAndPassword(email.trim(),password)
      .catch((error)=>alert(error.message))
    }
  

  return (
    <View behavior='padding' style={styles.container}>
      <Image
      source={{uri: 'https://th.bing.com/th/id/OIP.T5w-rcKIhFIqSgEMrq_F7QHaHa?w=165&h=180&c=7&r=0&o=5&pid=1.7'}}
      style={{width: 200, height: 200, marginTop:-50, marginBottom:20}}
      />
      <View style={styles.input}>
        <Input
        placeholder='Email'
        autoFocus
        type='email'
        value={email}
        onChangeText={text=>setEmail(text)}
        />

        <Input
        placeholder='Password'
        secureTextEntry
        type='password'
        value={password}
        onChangeText={text=>setPassword(text)}
        />
      </View>

      <Button containerStyle={styles.button} onPress={Login} title='Login'/>
      <Button containerStyle={styles.button} onPress={()=> navigation.navigate('Register')} type='outline' title='Register'/>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    input:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})