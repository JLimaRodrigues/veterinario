import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { FaPlus } from 'react-icons/fa';

export default function Form({ handleChange, handleSubmit, novaTarefa }){
  return (
    <View>
      <View style={styles.form}>

        <TextInput
        style={styles.input}
        placeholder="Ex. Lavar a Louça"
        onChange={handleChange}
        value={novaTarefa}
        />

        <Pressable 
        style={styles.button}
        onPress={handleSubmit}
        >
          <FaPlus />
        </Pressable>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    paddingHorizontal: 20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 80,
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: '#f04c64',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})