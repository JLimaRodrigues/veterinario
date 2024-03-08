import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default function Tarefas({ tarefas, handleEdit, handleDelete }){
  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        renderItem={
                    ({item, index}) => 
                    <View style={styles.itemContainer}>
                      <Text style={styles.item}>{item}</Text>
                      <View style={styles.buttons}>
                        <TouchableOpacity onPress={(e) => handleEdit(e, index)} style={styles.edit}>
                          <FaEdit />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => handleDelete(e, index)} style={styles.delete}>
                          <FaWindowClose />
                        </TouchableOpacity>
                      </View>
                    </View>
                    }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  edit: {
    marginRight: 15,
    color: '#51c5de'
  },
  delete: {
    marginRight: 15,
    color: '#f04c64'
  }
})