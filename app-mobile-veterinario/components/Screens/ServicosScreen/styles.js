import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalContainer: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent:{
      backgroundColor: 'white', 
      padding: 20, 
      borderRadius: 10, 
      width: '80%'
    },
    modalHeader:{
      fontSize: 18,
      padding:20,
      fontWeight: 'bold',
      marginBottom: 10,
      backgroundColor: '#7dff9b',
    },
    buttonInfoModal: {
      padding: 20,
      borderRadius: 4,
      backgroundColor: '#7db5ff'
    },
    buttonDangerModal: {
      padding: 20,
      borderRadius: 4,
      backgroundColor: '#ff7d7d'
    },
    buttonWarningModal: {
      padding: 20,
      borderRadius: 4,
      backgroundColor: '#ffeb7d'
    },
    textButton: {
      color: 'black',
      fontWeight: 'bold'
    },
    inputModal: {
      borderWidth: 1, 
      borderColor: 'gray', 
      padding: 10, 
      marginBottom: 10
    }
});