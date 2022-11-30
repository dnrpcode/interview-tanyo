import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth, windowWidth } from '../Utils/ResponsiveUI'
import { Calendar } from 'react-native-calendars'
import { Colors } from '../Constants/Colors'
import { dummySchedule } from '../Constants/GlobalConstants'

export default function HomeScreen({ navigation }) {
    const [date, setDate] = useState('')

    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.scroll}>
                    <View style={styles.conCal}>
                        <Calendar
                            onDayPress={x => { setDate(x), console.log("press day", x) }}
                            initialDate={date}
                            style={{ margin: responsiveWidth(15) }}
                            theme={{
                                selectedDayBackgroundColor: Colors.primary,
                                indicatorColor: Colors.primary,
                                todayTextColor: Colors.primary,
                                arrowColor: Colors.primary
                            }}
                            markedDates={{
                                container: {
                                    backgroundColor: 'green'
                                },
                            }}
                        />
                    </View>
                    <Text style={styles.title}>List Schedule</Text>
                    {dummySchedule[date?.dateString]?.map(x => (
                        <View style={styles.conSchdl}>
                            <Text style={styles.titleSchdl}>{x.title}</Text>
                            <Text style={styles.timeSchl}>{x.time}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    scroll: {
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(20),
        paddingTop: responsiveHeight(80)
    },
    title: {
        fontSize: 20,
        marginVertical: responsiveHeight(40),
        alignSelf: 'flex-start',
        color: 'black',
        fontWeight: '700',
    },
    conSchdl: {
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        backgroundColor: 'white',
        height: responsiveHeight(60),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        paddingHorizontal: responsiveWidth(20),
        marginBottom: responsiveHeight(15)
    },
    conCal: {
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        width: windowWidth - responsiveWidth(40),
    },
    titleSchdl: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700',
    },
    timeSchl: {
        fontSize: 12,
        fontWeight: '700',
    }
})