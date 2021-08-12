import * as React from 'react'
import {useCallback, useEffect, useState, useLayoutEffect} from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import FirebaseApp from '../FirebaseConfig'

const auth = FirebaseApp.auth()
const db = FirebaseApp.firestore()

export default function ChatScreen(props) {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
      props.navigation.setOptions({
        headerRight: () => (
            <View>
                <Text onPress={() => props.navigation.replace('Login')}>abc</Text>
            </View>
        ),
        headerLeft: () => (
            <View>
               <Image
                source={{
                    uri: auth?.currentUser?.photoURL ||"https://reactnative.dev/img/tiny_logo.png",
                  }}
                style={{borderRadius: 40/2, width: 40, height: 40, marginHorizontal: 10}}
                />
            </View>
        )
    })
      const unSubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
        }))
      ))
      return unSubscribe
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const {
        _id,
        createdAt,
        text,
        user
      } = messages[0]
      db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
      })
    }, [])
  
    return (

      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        
        
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL
        }}
        
      />
    )
}