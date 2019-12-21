import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import api from '../services/api';

// import { Container } from './styles';

export default function Relatorio({navigation}) {

    useEffect(() => {
        async function loadCoins() {
          const response = await api.get('/listcoins');
          setCoins(response.data);
        }
    
        loadCoins();
      },[]);
    
      const [coins, setCoins] = useState([]);


      function nav() {
        navigation.navigate('Conversor');
      }

  return (
    <View>
         <ImageBackground source={require('../../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
            
            <View style={styles.content}>
                <Text style={{fontSize: 16,fontWeight:"bold", paddingBottom: 10}}>Relatório de moedas cadastradas</Text>
            <View style={{height:300}}>
               <ScrollView>
                {coins.map(coin => (
                 <Text key={coin._id} value={coin.name}>
                 {coin.name} - {coin.description}
                 </Text>
                ))}
                </ScrollView>
            </View> 
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
