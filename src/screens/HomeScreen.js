import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth, windowWidth } from '../Utils/ResponsiveUI'
import { Calendar } from 'react-native-calendars'
import { Colors } from '../Constants/Colors'
import { dummySchedule } from '../Constants/GlobalConstants'
import Notifications from '../Utils/Notifications'
import NotifIcon from '../Assets/Icons/notif.png'
import { filterSchedule, generateTime } from '../Utils/UtilsGlobal'

export default function HomeScreen({ navigation }) {
    const [date, setDate] = useState('')
    const [schedule, setSchedule] = useState(filterSchedule(dummySchedule));

    const getNotification = () => {
        Notifications.scheduleNotification("Try Notification!", new Date(Date.now()))
    }

    const selectDay = (d) => {
        setDate(d)
        setSchedule(filterSchedule(dummySchedule, new Date(d.timestamp)))
    }

    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.scroll}>
                    <View style={styles.conCal}>
                        <Calendar
                            onDayPress={selectDay}
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
                    {schedule?.map((x, i) => (
                        <View style={styles.conSchdl} key={i}>
                            <Text style={styles.titleSchdl}>{x.title}</Text>
                            <Text style={styles.timeSchl}>{generateTime(x.time)}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={getNotification} style={styles.btnNotif}>
                <Image source={NotifIcon} style={styles.iconNotif}/>
            </TouchableOpacity>
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
        paddingVertical: responsiveHeight(80)
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
    },
    btnNotif: {
        zIndex: 2,
        backgroundColor: Colors.primary,
        width: responsiveHeight(60),
        height: responsiveHeight(60),
        borderRadius: responsiveHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: responsiveHeight(20),
        alignSelf: 'center'
    },
    iconNotif: {
        height: responsiveHeight(25), 
        width: responsiveHeight(25), 
        resizeMode: 'contain'
    }
})