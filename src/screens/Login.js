import React, { useState, useEffect } from 'react'
import { Button, View, Text, Image, TouchableOpacity, ScrollView, LogBox } from 'react-native'
import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'

LogBox.ignoreAllLogs()

export default function Login({ navigation }) {

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    { console.log(`user`, JSON.stringify(user)) }

    if (initializing) return null

    if (!user) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: '2%', justifyContent: 'center', alignItems: 'center' }}>

                <View>
                    <Image source={require('../images/logo.png')} style={{ height: 100, width: 200, resizeMode: 'contain' }} />
                    <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 28, marginVertical: '5%' }}>STATS FC</Text>
                </View>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center', flexDirection: 'row', width: '80%', backgroundColor: '#38ACEC', alignSelf: 'center', padding: 10, borderRadius: 8,
                        marginTop: '5%'
                    }}
                    onPress={() => onFacebookButtonPress().then(() => navigation.navigate('Home', { userName: user.displayName, photoURL: user.photoURL }))}
                >
                    <Text style={{ color: 'white', textAlignVertical: 'center', fontSize: 18, paddingHorizontal: '5%' }}>Log In with Facebook</Text>
                </TouchableOpacity>

            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: '2%' }}>

                <ScrollView contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center' }}>

                    <View>
                        <Image source={require('../images/logo.png')} style={{ height: 100, width: 200, resizeMode: 'contain' }} />
                        <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 28, marginVertical: '5%' }}>STATS FC</Text>
                    </View>

                    <Image source={require('../images/stadium.jpg')} style={{ height: 250, borderRadius: 16, resizeMode: 'contain' }} />

                    <TouchableOpacity
                        style={{
                            justifyContent: 'center', flexDirection: 'row', width: '80%', backgroundColor: '#38ACEC', alignSelf: 'center', padding: 10, borderRadius: 8,
                            marginTop: '5%'
                        }}
                        onPress={() => navigation.navigate('Splash', { userName: user.displayName, photoURL: user.photoURL })}
                    >
                        <Text style={{ color: 'white', textAlignVertical: 'center', fontSize: 18, paddingHorizontal: '5%' }}>Let's Get Started</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            justifyContent: 'center', flexDirection: 'row', width: '80%', backgroundColor: '#38ACEC', alignSelf: 'center', padding: 10, borderRadius: 8,
                            marginTop: '5%'
                        }}
                        onPress={() => { auth().signOut() }}
                    >
                        <Text style={{ color: 'white', textAlignVertical: 'center', fontSize: 18, paddingHorizontal: '5%' }}>Sign Out</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        )
    }

}