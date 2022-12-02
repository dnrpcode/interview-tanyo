import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '../../Utils/ResponsiveUI';
import { Colors } from '../../Constants/Colors';

const TextinputLogin = ({ error, touched, ...otherProps }) => {
    const validationColor = !touched ? Colors.primary : error ? Colors.error : Colors.primary;
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.textInput, { borderColor: validationColor }]}
                {...otherProps}
            />
            {!touched ? <View/> : error ? <Text style={styles.txtError}>{error}</Text> : <View/>}
        </View>
    )
}

export default TextinputLogin

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        paddingLeft: responsiveWidth(15),
        borderRadius: responsiveWidth(5),
    },
    container: {
        width: '100%',
        marginBottom: responsiveHeight(40),
    },
    txtError: {
        color: Colors.error,
        marginTop: responsiveHeight(5)
    }
})