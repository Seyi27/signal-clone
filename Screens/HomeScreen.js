import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../Components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { db, auth } from '../firebase' 

const HomeScreen = ({navigation}) => {
  const [chats, setChats]=useState([])

  const signOut =()=> {
   auth.signOut().then(()=>{
     navigation.replace('Login')
   })
  }

  useEffect(()=>{
    const unsubscribe= db.collection('Chats').onSnapshot(snapshot=>(
      setChats(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    ))
  },[])

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'Signal',
      headerStyle: {backgroundColor:'#fff'},
      headerTitleStyle: {color:'black'},
      headerTintColor:'black',
      headerLeft: ()=> 
      (<View style={{marginRight:10}}>
        <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
        <Avatar
        rounded
        source={{
          uri: 'https://th.bing.com/th/id/OIP.biXFoUjEcBMa01d8fdQ6ywHaF2?w=218&h=180&c=7&r=0&o=5&pid=1.7'
      }}
        />
        </TouchableOpacity>
      </View>),
      headerRight:()=>(
        <View style={{
          flexDirection:'row',
          marginRight:20,
          justifyContent:'space-between',
          width:70
        }}>
          <TouchableOpacity >
           <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('AddChat')}>
           <SimpleLineIcons name="pencil" size={24} color="black" />
         </TouchableOpacity>
        </View>
      )
    });

  },[])

  const enterChat=(id, chatName)=>{
    navigation.navigate('Chat',{
    id,
    chatName
    })
  }
  
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data:{chatName} })=>(
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    height: '100%'
  }
})