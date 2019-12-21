import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Picker,TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';

import api from '../services/api';

// import { Container } from './styles';

export default function Conversor({navigation}) {

    useEffect(() => {
        async function loadCoins() {
          const response = await api.get('/listcoins');
          setCoins(response.data);
        }
    
       loadCoins();
      },[]);

  
  const [coins, setCoins] = useState([]);
  const [moedaA, setMoedaA] = useState("");
  const [moedaB,setMoedaB] = useState("");
  const [moedaAValor, setMoedaAValor] = useState("");
  const [moedaBValor, setMoedaBValor] = useState(0);

  
   function converter ()  {

        const moeda = moedaAValor.replace(',','.');

        const de_para = `${moedaA}_${moedaB}`;
    
        const url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=dc8365a2147573c09ad1`
    
        fetch(url)
        .then(res=>{
          return res.json()
        })
        .then(json=>{
          const cotacao = json[de_para];
          
          const moedaBValor = (parseFloat(moeda) * cotacao).toFixed(2);
          if (moedaBValor === 'NaN') {
            Alert.alert('Moeda inexistente')
            setMoedaBValor("0");
          }else{
            setMoedaBValor(moedaBValor);
          }
            
        })
    
    
        
    
      }

      function nav() {
        navigation.navigate('Coin');
      }
    
      function nav2() {
        navigation.navigate('Relatorio');
      }


 

  return (
    <View>
        
        <ImageBackground source={require('../../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
            
        <View style={styles.content}>
            <Text style={{fontSize: 16,fontWeight:"bold", paddingBottom: 10}}>Conversor de Moedas</Text>
            <Text>Moedas a comprar</Text>
            <Picker selectedValue={moedaA} onValueChange={(itemValue, itemIndex) =>setMoedaA(itemValue)}>
                {coins.map(coin => (
               
                <Picker.Item label={`${coin.name} - ${coin.description}`} key={coin._id} value={coin.name}>
                    
                </Picker.Item>
                ))}
            </Picker>
            <Text>Moedas a vender</Text>
            <Picker style={{padding: 20}} selectedValue={moedaB} onValueChange={(itemValue, itemIndex) =>setMoedaB(itemValue)}>
                {coins.map(coin => (
                <Picker.Item label={`${coin.name} - ${coin.description}`} key={coin._id} value={coin.name}>
                  
                </Picker.Item>
                ))}
            </Picker> 
            <Text style={{paddingBottom:10, paddingTop:10}}>Quantidade que irá comprar</Text>
            <TextInput
              placeholder="Quantidade a comprar"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={moedaAValor}
              onChangeText={setMoedaAValor} 
              style={{padding: 10, borderColor: 'black', borderWidth: 1, fontSize:16}} 
            />
            <Text style={{fontSize: 16,fontWeight:"bold", paddingBottom: 10, textAlign:'center', paddingTop: 10}}>{moedaBValor}</Text> 
            <TouchableOpacity onPress={converter} style={{backgroundColor: '#014713'} }><Text style={{color: 'white', textAlign: 'center', padding: 10}}>Converter</Text></TouchableOpacity>
            <View style={{flexDirection:"row", paddingTop:10 }}>        
                <TouchableOpacity onPress={nav} style={{backgroundColor: '#38b152', width:'60%', marginRight:10}}><Text style={{color: 'white', textAlign: 'center', padding: 10}}>Cadastrar uma moeda</Text></TouchableOpacity>
                <TouchableOpacity onPress={nav2} style={{backgroundColor: '#38b152', width: '36%', justifyContent:'center'}}><Text style={{color: 'white', textAlign: 'center'}}>Relatório</Text></TouchableOpacity> 
            </View>            
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
