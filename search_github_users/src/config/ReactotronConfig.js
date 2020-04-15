import Reactotron from 'reactotron-react-native';

//__DEV__ variavel global do react native que retorna true se o usuario estiver em ambiente dev
if (__DEV__) {
  // ip do dispositivo a ser conectado
  const tron = Reactotron.configure({ host: '192.168.56.1' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear(); //limpa a time line do reactotron toda vez que tiver um reload
}
