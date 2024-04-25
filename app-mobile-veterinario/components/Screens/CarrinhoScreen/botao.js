import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useCart } from '../../../contexts/CarrinhoContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const PressableButton = ({ item }) => {
  const { addItemToCart } = useCart();

  return (
    <Pressable onPress={() => addItemToCart(item)} style={styles.button}>
      <FontAwesomeIcon icon={faPlus} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: 'blue',
    padding: 20,
  },
  icon: {
    color: 'white',
  },
});
