import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'

export default function Splash({ navigation, route }) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: '2%' }}>

            <ScrollView contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center' }}>

                <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 28, marginVertical: '5%' }}>Welcome!{'\n'}{route.params.userName}</Text>

                <Image source={require('../images/playing.jpg')} style={{ height: 350, width: 200, resizeMode: 'contain' }} />

                <Text style={{ textAlign: 'center', width: '80%' }}>Discover information about football teams {'\n'} and share it on your socials</Text>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center', flexDirection: 'row', width: '80%', backgroundColor: '#38ACEC', alignSelf: 'center', padding: 10, borderRadius: 8, marginTop: '5%'
                    }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={{ color: 'white', textAlignVertical: 'center', fontSize: 18, paddingHorizontal: '5%' }}>Continue</Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    )
}
