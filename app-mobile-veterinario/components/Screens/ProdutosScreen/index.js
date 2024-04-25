import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../../contexts/CarrinhoContext';
import axios from 'axios';

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState([]);
  const navigation              = useNavigation();
  const { addItemToCart }       = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.4.132.134:3000/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.log('Erro ao buscar dados dos produtos: ', error)
    }
  }

  const renderProduto = ({ item }) => (
    <Pressable
      style={styles.productContainer}
      onPress={() => navigation.navigate('DetalhesProduto', { productId: item.id })}
    >
      <Image style={styles.productImage} source={{ uri: `http://10.4.132.134:3000/api/produtos/imagem/${item.imagens[0].caminhoImagem}` }} />
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productDescription}>{item.descricao}</Text>
      <Pressable style={styles.addButton} onPress={() => addItemToCart(item)}>
        <FontAwesomeIcon icon={faPlus} style={{ fontSize: 18, color: 'white' }} />
      </Pressable>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderProduto}
        contentContainerStyle={styles.listContainer}
      />
      <Pressable
        style={styles.floatingButton}
        onPress={() => navigation.navigate('carrinho')}
      >
        <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}/>
      </Pressable>
    </View>
  );
}
