import * as React from 'react'
import {useEffect, useState} from 'react'
import { View, Text , StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView} from 'react-native'

import firebaseApp from '../FirebaseConfig'

export default function SignupScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState(null)
    const backToLogin = () => {
        props.navigation.navigate('Login')
    }
    const SignUp = () => {
        firebaseApp.auth().createUserWithEmailAndPassword(email.toLowerCase(), password)
            .then((userCredential) => {
                var user = userCredential.user;
                user.updateProfile({
                    displayName: username,
                    photoURL: avatar !== null? avatar : "https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png"
                  })
            })
            .then(() => {
                Alert.alert(
                    "Alert Title",
                    "Register Succeed",
                    [
                      { text: "OK", onPress : () => backToLogin() }
                    ]
                  ); 
            })
            .catch((error) => {
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
                <View style={{marginHorizontal: 32}}>
                    <Text style={styles.login}>Sign Up</Text>
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
                    <TextInput style={styles.input} 
                        placeholder="Enter your name" 
                        onChangeText={(name) => {
                            setUsername(name)
                        }}
                        value={username}
                        />
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30}}>
                            <TouchableOpacity style={styles.continue} onPress = {() => {
                                if(email === '' || password === '' || username === '') {
                                    alert('Information of user is not empty')
                                } 
                                else {
                                    SignUp()                         
                                }
                                }}>
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: '800'}}>SignUp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.continueForBack} onPress = {() => {
                                    backToLogin()
                                }}>
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: '800'}}>Back to Login</Text>
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
        flex: 2,
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginHorizontal: 30,
        borderRadius: 100/10,
        backgroundColor: '#8763b0',
        marginTop: 20
    },
    continueForBack: {
        flex: 3,
        width: 150,
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