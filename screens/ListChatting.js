import React, {useEffect, useState} from 'react'
import { View, Text, Image } from 'react-native'
import { Avatar } from 'react-native-gifted-chat'

import FirebaseApp from '../FirebaseConfig'
export default function ListChatting(props) {
    const [friends, setFriends] = useState([])


    useEffect(() => {                                                               
        props.navigation.setOptions({
            headerRight: () => (
                <View>
                    <Text>i</Text>
                </View>
            ),
            headerLeft: () => (
                <View>
                   <Image
                    source={{
                        uri: FirebaseApp.auth()?.currentUser?.photoURL ||"https://reactnative.dev/img/tiny_logo.png",
                      }}
                    style={{borderRadius: 40/2, width: 40, height: 40, marginHorizontal: 10}}
                    />
                </View>
            ),
            
        })



    }, [])

    const SignOut = () => {
        FirebaseApp.auth().signOut().then(() => {
            props.navigation.replace('Login')
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text onPress={SignOut}>Sign Out</Text>
            <Image 
                 
                
            />
        </View>
    )
}
