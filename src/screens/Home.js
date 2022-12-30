import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native'
import { SvgCssUri } from 'react-native-svg'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'

export default function Home({ navigation }) {

    const [isLoading, setIsLoading] = useState(true)

    const [teams, setTeams] = useState([])

    const [favTeams, setFavTeams] = useState([])

    useEffect(() => {
        getTeams()
    }, [])

    const getTeams = () => {
        fetch('https://api.football-data.org/v2/teams', {
            method: 'GET',
            headers: {
                'X-Response-Control': 'full',
                'X-Auth-Token': '7266f5dcac804f848769649503b2b31f'
            }
        }).then((response) => response.json())
            .then((json) => {
                console.log(`teams `, json.teams)
                setTeams(json.teams)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        fetchFavTeams()
    }, [])

    const fetchFavTeams = () => {
        AsyncStorage.getItem('TEAMS').then((teams) => {
            const newTeamList = teams ? JSON.parse(teams) : []
            setFavTeams(newTeamList)
        })
    }

    const saveTeam = (teamName) => {
        AsyncStorage.getItem('TEAMS').then((teams) => {
            const newTeamList = teams ? JSON.parse(teams) : [];
            newTeamList.push(teamName);
            setFavTeams(newTeamList);
            AsyncStorage.setItem('TEAMS', JSON.stringify(newTeamList));
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: '2%' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: '2%' }}>

                <Image source={require('../images/logo.png')} style={{ height: 50, width: 100, resizeMode: 'contain' }} />

                <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 28, paddingVertical: '5%' }}>STATS FC</Text>

                <Image source={require('../images/logo.png')} style={{ height: 50, width: 100, resizeMode: 'contain', transform: [{ rotate: '180deg' }] }} />

            </View>

            <ScrollView>
                {
                    isLoading
                        ?
                        <View style={{ justifyContent: 'center', marginTop: '50%' }}>
                            <ActivityIndicator size='large' color='#38ACEC' />
                            <Text style={{ textAlign: 'center', marginTop: '5%' }}>Loading teams! Please wait!</Text>
                        </View>
                        :
                        teams.map((item, index) => {
                            return (
                                <View key={index} style={{ marginVertical: '2%', marginHorizontal: '5%' }}>

                                    <TouchableOpacity onPress={() => navigation.navigate('Team', { item: item })}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                    >

                                        <SvgCssUri height={50} width={50} uri={item.crestUrl} />

                                        <Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{item.name}</Text>

                                        <TouchableOpacity onPress={() => { saveTeam(item.name) }} style={{ paddingTop: '3%' }}>
                                            <FontAwesome name={(favTeams.includes(`${item.name}`)) ? 'star' : 'star-o'} size={24} color={'orange'} />
                                        </TouchableOpacity>

                                    </TouchableOpacity>

                                </View>
                            )
                        })
                }
            </ScrollView>
        </View>
    )
}