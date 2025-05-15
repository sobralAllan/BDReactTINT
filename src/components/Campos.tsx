import { View, TextInput, StyleSheet, TextInputProps } from 'react-native'

export function Campo({...rest}:TextInputProps){
    return (
        <View>
            <TextInput style={styles.cmp} {...rest}/>
        </View>
    );
}

const styles = StyleSheet.create({
    cmp:{
        width: 300,
        fontSize: 20,
        borderRadius: 20,
        backgroundColor: "#fff",
        margin: 10,
    },
})