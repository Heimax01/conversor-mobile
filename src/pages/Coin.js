import React,{useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';

import api from '../services/api';

// import { Container } from './styles';

export default function Coin({navigation}) {

    const [name, setName] = useState("");
    const [description,setDescription] = useState("");

    const sizeInput = 3;


    async function cadastrar(){
      
      
        const response = await api.post('/coins',  {name, description} );

        if (( name.length == sizeInput) && (description !== "" )) {
          Alert.alert('Moeda Cadastrada');
        }
  
        
        setName("");
        setDescription("");

        

      
        
  
  
  
      }

      function nav() {
        navigation.navigate('Conversor');
      }
  

  return (
    <View>
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
            
            <View style={styles.content}>
                <Text style={{fontSize: 16,fontWeight:"bold", paddingBottom: 10}}>Cadastre uma moeda</Text>
                
                <Text style={{paddingBottom:10, paddingTop:10}}>Sigla</Text>
                <TextInput
                  placeholder="Sigla"
                  placeholderTextColor="#999"
                  maxLength={sizeInput}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="characters" 
                  style={{padding: 10, borderColor: 'black', borderWidth: 1, fontSize:16}} 
                />
                
                <Text style={{paddingBottom:10, paddingTop:10}}>Descrição</Text>
                <TextInput
                  placeholder="Descrição"
                  placeholderTextColor="#999"
                  value={description}
                  onChangeText={setDescription}
                  autoCapitalize="words" 
                  style={{padding: 10, borderColor: 'black', borderWidth: 1, fontSize:16, marginBottom:20}} 
                />
                 
                <TouchableOpacity onPress={cadastrar} style={{backgroundColor: '#014713', } }><Text style={{color: 'white', textAlign: 'center', padding: 10}}>Cadastrar</Text></TouchableOpacity>

                <TouchableOpacity onPress={nav} style={{backgroundColor: '#38b152', marginTop:30 } }><Text style={{color: 'white', textAlign: 'center', padding: 10}}>Página principal</Text></TouchableOpacity>
                      
            </View> 
            </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        backgroundColor: "#fff",
        marginTop: 100,
        borderRadius: 4,
        padding: 30,
      }
});
