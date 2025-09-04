import React, { useEffect, useState} from "react"
import { View, Text, ScrollView,  StyleSheet, Button} from "react-native";
import api from './src/devices/api.js';

// Declaração do componente principal da aplicação 'App'
export default function App(){
  //'users' e 'setUsers' são a variavel e a função da atualização respectivamente 
  const[users, setUsers] = useState([]);

  const API ="http://10.110.12.43:3000/users"

  async function fetchUsers() {
    try{
      // Faz uma requisição GET para a URL da API
      const response = await api.get(API)
      //Se bem-sucedida a chamada da api carrega a lista dos dados
      setUsers(response.data);
    }catch(error){
      // Se ocorrererro (ex: falha de conexão, exibe)
      console.error("Error GET:",error.message);
    }
  };

  useEffect(()=> {
    fetchUsers();
  },[])

  const _render = () => {

    const vet = [];

    users.map((item, index)=>{
      vet.push(
        <View key={index}>
         <Text style={styles.item}>ID:{item.id} Nome:{item.name} Email:{item.email}</Text>
        </View>
      )
    })
    return vet;
  }

  return(
    <View style={styles.container}>
       <Text style={styles.title}>GET - Listar usuários</Text>
       <Button title="Recaregar Lista" onPress={fetchUsers}/>
       <ScrollView>
        {_render()}
       </ScrollView>
    </View>
  );
}

//Styles utilizados no projeto 
const styles = StyleSheet.create({
  container : {flex: 1, padding: 20, marginTop: 40},
  title: {fontSize: 22, fontWeight:"bold", marginBottom:10},
  item: {fontSize:12, marginTop:10}
});