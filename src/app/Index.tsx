import { View, TextInput, StyleSheet, Button, Alert} from 'react-native'
import { Campo } from '@/components/Campos'
import { useState } from 'react'
import { useClienteDataBase, ClienteDataBase } from '@/database/useClienteDataBase'
import { useNavigation } from 'expo-router'

export default function Index(){
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cliente, setCliente] = useState<ClienteDataBase[]>()
    const clienteDataBase = useClienteDataBase();
    const navigation = useNavigation()

    async function create(){
        try{
            const response = await clienteDataBase.create({
                nome,
                telefone,
                endereco
            })

            Alert.alert("Cliente cadastrado com sucesso! ID: " + response.insertedRowId)
        }catch(error){
            console.log(error)
        }
    }//fim da create

    return (
        <View style={styles.container}>
            <Campo placeholder="Nome" onChangeText={setNome} value={nome}/>
            <Campo placeholder="Telefone" onChangeText={setTelefone} value={telefone}/>
            <Campo placeholder="Endereço" onChangeText={setEndereco} value={endereco}/>
            <Button title="Cadastrar" onPress={create}/>
            <Button title="Consultar" onPress={() => navigation.navigate('Consultar')}/>
        </View>
    );
}

const styles = StyleSheet.create({
        container:{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#898989',
            alignItems: "center",
        },
    }   
);