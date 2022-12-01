import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth, windowWidth } from '../Utils/ResponsiveUI';
import { Colors } from '../Constants/Colors';
import { dummySchedule, emailUser, passwordUser } from '../Constants/GlobalConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifications from '../Utils/Notifications';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const pushNotif = async () => {
    const onceLogin = await AsyncStorage.getItem('onceLogin')
    if(onceLogin){
      navigation.navigate('Home')
    }else{
      dummySchedule.map((x) => {
        return Notifications.scheduleNotification(x.title, new Date(x.time))
      })
      await AsyncStorage.setItem('onceLogin', JSON.stringify(true))
      navigation.navigate('Home')
    }
  }

  const validateLogin = () => {
    if (!email || !password) {
      Alert.alert("Mohon maaf", "Lengkapi form input terlebih dahulu!")
    } else if (email !== emailUser || password !== passwordUser) {
      Alert.alert("Mohon maaf", "Email / Password yang kamu masukan tidak cocok!")
    } else {
      pushNotif()
    }
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>LoginScreen</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Input Email"
        onChangeText={x => setEmail(x)}
        value={email}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.textInput}
        placeholder="Input Password"
        onChangeText={x => setPassword(x)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={validateLogin} style={styles.button}>
        <Text style={styles.txtBtn}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    paddingHorizontal: responsiveWidth(20),
    backgroundColor: 'white'
  },
  textInput: {
    height: 40,
    // backgroundColor: 'red',
    width: '100%',
    marginBottom: responsiveHeight(40),
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingLeft: responsiveWidth(15),
    borderRadius: responsiveWidth(5),
  },
  button: {
    height: responsiveHeight(50),
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  txtBtn: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
  },
  title: {
    fontSize: 30,
    marginBottom: responsiveHeight(50),
    fontWeight: '900',
    color: Colors.primary
  }
})
