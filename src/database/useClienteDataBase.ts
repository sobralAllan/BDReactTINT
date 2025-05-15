import { useSQLiteContext } from 'expo-sqlite';

export type ClienteDataBase = {
    id: number
    nome: string
    telefone: string
    endereco: string
}//Criando o local de variáveis do Banco

export function useClienteDataBase(){
    const dataBase = useSQLiteContext()//Acessar todos os métodos do BD

    async function create(data: Omit<ClienteDataBase, "id">){
        const statement = await dataBase.prepareAsync(
            "insert into pessoa(nome, telefone, endereco) values($nome,$telefone,$endereco)"
        )

        try{
            const result = await statement.executeAsync({
                $nome: data.nome,
                $telefone: data.telefone,
                $endereco: data.endereco
            })
            
            //Coletando o último id cadastrado e devolvendo
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return { insertedRowId }

        }catch(error){
            throw error
        }finally{
            await statement.finalizeAsync()
        }
    }//fim do create

    async function consultar(nome:string){
        try{
            const query = "select * from pessoa where nome like ?"//Interrogação: Substituir por qualquer item de busca
            const response = await dataBase.getAllAsync<ClienteDataBase>(query,`%${nome}%`)
            return response
        }catch(error){
            throw error
        }
    }//fim do consultar

    return { create, consultar }

}//fim da função