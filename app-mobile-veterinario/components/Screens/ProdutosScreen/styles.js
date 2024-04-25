import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    listContainer: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 20,
    },
    productContainer: {
      width: (windowWidth - 30) / 2,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      padding: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    productImage: {
      width: '80%',
      height: 120,
      resizeMode: 'cover',
      marginBottom: 10,
      borderRadius: 8,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    productDescription: {
      fontSize: 14,
      textAlign: 'center',
    },
    addButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'blue',
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'blue',
      width: 120,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4, // Para sombra no Android
    },
  });