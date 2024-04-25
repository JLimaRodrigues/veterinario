import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Link } from '@react-navigation/native';

import Swiper from 'react-native-swiper';

import { styles } from './styles.js';

export default function HomeScreen() {

  const [atalhos, setAtalhos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.4.132.134:3000/api/times', {
          method: 'GET'
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAtalhos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <View>
        <Text>Error Fetching data: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper 
      showsButtons={false}
      >
        <View style={styles.itemAtalho} key={0}>
          <Text>Aqui vai ficar um flyer</Text>
          <Link to={{ screen: 'produtos'}}>
            Quero dar uma olhada!
          </Link>
        </View>
        <View style={styles.itemAtalho} key={1}>
          <Text>Promoções em serviços</Text>
          <Link to={{ screen: 'servicos'}}>
            Go to Serviços
          </Link>
        </View>
      </Swiper>

      <FlatList
        data={atalhos}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Text>{item.id}: {item.nome} : {item.idade} : {item.profissao}</Text>
        )}
      />
    </View>
  );
}

