import * as React from 'react'
import {useEffect, useState} from 'react'
import { View, Text , StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView} from 'react-native'

import firebaseApp from '../FirebaseConfig'

export default function LoginScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {

        const unSubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              //getListScreen()
            } else {
              // User is signed out
              // ...
            }
          });

          return unSubscribe
    }, [])
    const getListScreen = () => {
        props.navigation.replace('Chat')
    }
    const getSignupScreen = () => {
        props.navigation.navigate('Signup')
    }
    const Login = () => {
        firebaseApp.auth().signInWithEmailAndPassword(email.toLowerCase(), password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                getListScreen() 
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'
        >
            <View style={styles.container }>
                <View style={styles.circle}/>
                <View style={{marginTop: 40}}>
                    <Image source={require("../assets/chat.png")} style={{width: 150, height: 150, alignSelf: 'center'}}/>
                </View>
                <View style={{marginHorizontal: 32, marginVertical: 20}}>
                    <Text style={styles.login}>Login</Text>
                    <TextInput style={styles.input} 
                        placeholder="Enter your email" 
                        onChangeText={(email) => {
                            setEmail(email)
                        }}
                        value={email}
                        keyboardType="email-address"
                        />
                    <TextInput style={styles.input} 
                        placeholder="Enter your password" 
                        onChangeText={(password) => {
                            setPassword(password)
                        }}
                        value={password}
                        secureTextEntry={true}
                        />
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30}}>
                            <TouchableOpacity style={styles.continue} onPress = {() => {
                                if(email === '' || password === '') {
                                    alert('Email and password is not empty!')
                                } else {
                                    Login()
                                }
                                }}>
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: '800'}}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.continue} onPress = {() => {
                                getSignupScreen()
                                }}>
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: '800'}}>SignUp</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>       
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f5f7'
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500 / 2,
        backgroundColor: '#fff',
        position: 'absolute',
        left: -120,
        top: -20
    },
    login: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#514e5a',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center'
    },
    input : {
        marginTop: 25,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 16,
        paddingHorizontal: 16,
        color: '#514e5a',
        fontWeight: '600'
    },
    continue: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginHorizontal: 30,
        borderRadius: 100/10,
        backgroundColor: '#8763b0',
        marginTop: 20
    }
})