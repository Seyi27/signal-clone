import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import { async } from '@firebase/util';
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {
    const [input, setInput]=useState('')

     useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Chat'
        })
     },[])

     const createChat= async ()=>{
        await db.collection('Chats').add({
            chatName: input
        }).then(()=>{
            navigation.goBack()
        }).catch((error)=> alert(error) )
     }

  return (
    <View style={styles.container}>
        <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text)=>setInput(text)}
        leftIcon={
            <FontAwesome name="wechat" size={24} color="black" />
        }
        />
        <Button title='Create new chat' onPress={createChat}/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        padding:20
    }
})