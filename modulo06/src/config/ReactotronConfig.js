import Reactotron from 'reactotron-react-native';

// __DEV__ é uma variavel global do react native, que retorna true em ambiente
// de desenvolvimento
if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  // Linha permite limpar a timeline ao dar refresh
  tron.clear();
}
