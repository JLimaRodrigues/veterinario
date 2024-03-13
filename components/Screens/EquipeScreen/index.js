import { StyleSheet, Text, View } from 'react-native';

export default function EquipeScreen() {
  return (
    <View style={styles.container}>
        <Text>Equipe!</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
