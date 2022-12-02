import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth, windowWidth } from '../Utils/ResponsiveUI';
import { Colors } from '../Constants/Colors';
import { dummySchedule, emailUser, passwordUser } from '../Constants/GlobalConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifications from '../Utils/Notifications';
import { useFormik } from "formik";
import TextinputLogin from '../Components/Textinput/TextinputLogin';
import { LoginSchema } from '../Utils/UtilsGlobal';

export default function LoginScreen({ navigation }) {

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: '', password: '' },
    onSubmit: () => {
      validateLogin()
    }
  });

  const pushNotif = async () => {
    const onceLogin = await AsyncStorage.getItem('onceLogin')
    if (onceLogin) {
      navigation.navigate('Home')
    } else {
      dummySchedule.map((x) => {
        return Notifications.scheduleNotification(x.title, new Date(x.time))
      })
      await AsyncStorage.setItem('onceLogin', JSON.stringify(true))
      navigation.navigate('Home')
    }
  }

  const validateLogin = () => {
    if (values.email !== emailUser || values.password !== passwordUser) {
      Alert.alert("Mohon maaf", "Email / Password yang kamu masukan tidak cocok!")
    } else {
      pushNotif()
    }
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>LoginScreen</Text>
      <TextinputLogin
        placeholder="Input Email"
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        touched={touched.email}
        value={values.email}
        keyboardType='email-address'
      />
      <TextinputLogin
        placeholder="Input Password"
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        error={errors.password}
        touched={touched.password}
        value={values.password}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
