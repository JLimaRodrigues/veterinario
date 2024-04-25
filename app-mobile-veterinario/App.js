import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';

import { CartProvider } from './contexts/CarrinhoContext';
import Main from './components/Main'

export default function App() {
  return (
    <CartProvider>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </CartProvider>
  );
}