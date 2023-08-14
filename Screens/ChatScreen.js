import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db, auth } from '../firebase' 
import firebase from 'firebase/compat/app';

const ChatScreen = ({navigation, route}) => {
  const [input, setInput]=useState('')
  const [messages, setMessages]=useState([])
  const sendMessage=()=>{
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      message:input,
      displayName: auth.currentUser.displayName,
      email:auth.currentUser.email,
      photoURL:auth.currentUser.photoURL,
    })
    setInput('');
  }

  useEffect(()=>{
    const unsubscribe =
    db.collection('chats')
    .doc(route.params.id)
    .collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>
      setMessages(
        snapshot.docs.map((doc)=>({
          id: doc.id,
          data: doc.data()
        }))
      ))
      return unsubscribe;
      },[route])


    useLayoutEffect(()=>{
       navigation.setOptions({
        title:'Name',
        headerTitle:()=>(
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginLeft:-20
            }}>
                <Avatar
                rounded
                source={{uri: messages[0]?.data.photoURL ||
                  'https://th.bing.com/th/id/OIP.biXFoUjEcBMa01d8fdQ6ywHaF2?w=218&h=180&c=7&r=0&o=5&pid=1.7'}}
                />
                <Text style={{color:'white', marginLeft:10}}>
                  {route.params.chatName}</Text>
            </View>
        ),
        headerRight:()=>(
            <View
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
                width: 70,
                marginRight:10
            }}
            >
                <TouchableOpacity>
                 <Feather name="video" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity>
                 <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
       })
    }
    ,[navigation, messages])

  return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <>
  <ScrollView>
    {messages.map(({id,data})=>
    data.email === auth.currentUser.email ? (
      <View key={id} style={styles.receiver}>
        <Avatar
        containerStyle={{
          position:'absolute',
        bottom:-15,
        right:-5
        }}
        position='absolute'
        bottom={-15}
        right={-5}
        rounded
        size={30}
        source={{uri: data.photoURL}}/>
        <Text style={styles.receiverText}>{data.message}</Text>
      </View>
    ):(
      <View key={id} style={styles.sender}>
        <Avatar
                containerStyle={{
                  position:'absolute',
                bottom:-15,
                left:-5
                }}
        position='absolute'
        bottom={-15}
        left={-5}
        rounded
        size={30}
        source={{uri: data.photoURL}}/>
        <Text style={styles.senderText}>{data.message}</Text>
        <Text style={styles.sendername}>{data.displayName}</Text>
      </View>
    )
    )}
  </ScrollView>

  <View style={styles.footer}>
    <TextInput
    placeholder='Signal Message'
    value={input}
    onChangeText={(text)=>setInput(text)}
    onSubmitEditing={sendMessage}
    style={styles.textinput}
    />
    <TouchableOpacity onPress={sendMessage}>
    <Ionicons name="send" size={24} color="black" />
    </TouchableOpacity>
  </View>
</>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>


      </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  footer:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    padding:15
  },
  receiver:{
    padding:15,
    backgroundColor:'#ECECEC',
    alignSelf:'flex-end',
    borderRadius: 20,
    marginRight:15,
    marginBottom: 20,
    maxWidth:'80%',
    position:'relative'
  },
  sender:{
    padding:15,
    backgroundColor:'#ECECEC',
    alignSelf:'flex-start',
    borderRadius: 20,
    marginRight:15,
    maxWidth:'80%',
    position:'relative'
  },
  senderText:{
   color:'black',
   fontWeight:'500',
   marginLeft:10,
   marginBottom:15
  }, 
   receiverText:{
    color:'black',
    fontWeight:'500',
    marginLeft:10,
  
   },
  sendername:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:'black'
  },
  textinput:{
    bottom:0,
    flex:1,
    marginRight:10,
    borderWidth:1,
    padding:10,
    borderRadius:30,
    borderColor:'transparent',
    color:'grey',
    backgroundColor:'#ECECEC',
    height:40
  }
})

// 'https://th.bing.com/th/id/OIP.biXFoUjEcBMa01d8fdQ6ywHaF2?w=218&h=180&c=7&r=0&o=5&pid=1.7'