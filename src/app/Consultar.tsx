import { View, TextInput, StyleSheet, Button, Alert, FlatList} from 'react-native'
import { Campo } from '@/components/Campos'
import { useState, useEffect } from 'react'
import { useClienteDataBase, ClienteDataBase } from '@/database/useClienteDataBase'
import { useNavigation } from 'expo-router'
import { Cliente } from '@/components/Cliente'

export default function Index(){
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [busca, setBusca] = useState("")
    const [cliente, setCliente] = useState<ClienteDataBase[]>()
    const clienteDataBase = useClienteDataBase()
    const navigation = useNavigation()

    async function list(){
        try{
            const response = await clienteDataBase.consultar(busca)
            setCliente(response)
        }catch(error){
            console.log(error)
        }
    }//fim do listar

    async function details(item:ClienteDataBase){
        setId(String(item.id))
        setNome(item.nome)
        setTelefone(item.telefone)
        setEndereco(item.endereco)
    }//detalha a estrutura de consulta

    async function remove(id:number){
        try{
            await clienteDataBase.remove(id)
            await list()
        }catch(error){
            console.log(error)
        }
    }//fim da função remover

    //Para carregar a lista do banco...
    useEffect(() => {list()}, [busca])

    return (
        <View style={styles.container}>
            <Campo placeholder="Pesquisar" onChangeText={setBusca}/>

            <View style={styles.flat}>
                <FlatList 
                    data={cliente}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => <Cliente data={item} onDelete={() => remove(item.id)} onEditar={() => navigation.navigate('Atualizar', {item}) }/>}
                    contentContainerStyle={{gap:16}}
                />
            </View>


            <Button title="Voltar" onPress={() => navigation.navigate('Index')}/>
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
            marginTop: 25,
        },
        flat:{
            width: "100%",
            height: "50%",
            padding: 10,
            backgroundColor: "#fff",
        },
    }   
);