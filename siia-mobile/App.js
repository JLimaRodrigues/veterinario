import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import Main from './components/Main';

export default function App() {
  return (
    <SafeAreaView>
      <Main />
    </SafeAreaView>
  );
}
