import React from 'react'
import { View, Text, ScrollView, Linking, Share, TouchableOpacity } from 'react-native'
import { SvgCssUri } from 'react-native-svg'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Team({ navigation, route }) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: '5%' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: '2%' }}>

                <FontAwesome name={'angle-left'} size={24} color={'black'} onPress={() => navigation.goBack()} />

                <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 26, textAlignVertical: 'center' }}>{route.params.item.name}</Text>

                <View />

            </View>

            <ScrollView>

                <View style={{ alignSelf: 'center', marginVertical: '5%' }}>
                    <SvgCssUri height={150} width={150} uri={route.params.item.crestUrl} />
                </View>

                {
                    console.log(`route.params.item`, route.params.item),
                    Object.entries(route.params.item).map((value, index) => {
                        if (value[0] == 'area') {
                            return <Text style={{ marginHorizontal: '5%' }} key={index}>Area : {value[1].name}</Text>
                        }
                        else {
                            return (
                                <View key={index} style={{ flexDirection: 'row', marginHorizontal: '5%', paddingVertical: '1%' }}>
                                    <Text>
                                        {`${value[0].replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + value[0].replace(/([A-Z])/g, " $1").slice(1)} : `}
                                    </Text>
                                    <Text
                                        style={`${value[1]}`.includes('http') ? { color: '#38ACEC' } : null}
                                        onPress={`${value[1]}`.includes('http') ? () => Linking.openURL(`${value[1]}`) : null}
                                    >
                                        {value[1]}
                                    </Text>
                                </View>
                            )
                        }
                    })
                }

                <TouchableOpacity
                    style={{
                        justifyContent: 'center', flexDirection: 'row', width: '80%', backgroundColor: '#38ACEC', alignSelf: 'center', padding: 10, borderRadius: 8,
                        marginVertical: '5%'
                    }}
                    onPress={() => Share.share({
                        message: `Team Name: ${route.params.item.name} \nArea: ${route.params.item.area.name} \nShort Name: ${route.params.item.shortName} \nAddress: ${route.params.item.address} \nFounded: ${route.params.item.founded} \nClub Colors: ${route.params.item.clubColors}`
                    })}
                >
                    <FontAwesome name={'share'} size={24} color={'white'} />
                    <Text style={{ color: 'white', textAlignVertical: 'center', fontSize: 18, paddingHorizontal: '5%' }}>Share</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}
