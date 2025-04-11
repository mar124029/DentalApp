import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Toast } from 'toastify-react-native';

export const loginHandler = async (dni, password, navigation) => {
    try {
      const response = await axios.post('http://192.168.1.8:3001/api/auth/login', { dni, password });
      
      console.log(response.data);
  
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);

        Toast.show({
          text1: 'Inicio de sesión exitoso',
          text2: 'Bienvenido a la aplicación.',
          position: 'bottom',  
          type: 'success', 
        });

        navigation.navigate('Home');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };
  