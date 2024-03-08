import { Text, SafeAreaView, StyleSheet } from 'react-native';

import Title from './components/Title';
import Main from './components/Main';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <Main />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center'
  },
});
