import { StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db, auth } from '../firebase'

const CustomListItem = ({id, chatName, enterChat}) => {
  const [chatMessage, setchatMessages]=useState([])

  useEffect(()=>{
    const unsubscribe =db
    .collection('chats')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot)=>
      setchatMessages(snapshot.docs.map((doc)=>
      doc.data()
      ))
    )
    return unsubscribe
},[])
  return (
    <View>
      <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
        <Avatar
        rounded
        source={{
          uri: chatMessage?.[0]?.photoURL ||
            'https://th.bing.com/th/id/OIP.biXFoUjEcBMa01d8fdQ6ywHaF2?w=218&h=180&c=7&r=0&o=5&pid=1.7'
        }}
        />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:'800'}}>{chatName}</ListItem.Title>
            <ListItem.Subtitle 
            numberOfLines={1}
            ellipsizeMode='tail'
            >
              {chatMessage?.[0]?.displayName}: {chatMessage?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})