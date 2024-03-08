import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Title(){
  return (
    <View>
      <Text style={styles.heading}>Lista de Tarefas</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
})