import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";
import { Alert } from "react-native";
import { login } from "../services/login";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
  
    const loginHandler = async (dni, contrasena, navigation) => {
      try {
        setLoading(true);
    
        
        const response = await login({ dni, contrasena });
       

        if (response.data.token) {
          const { token, user } = response.data;

          await AsyncStorage.setItem('userToken', response.data.token);
          await AsyncStorage.setItem('userData', JSON.stringify(user));
  
          Toast.show({
            text1: 'Inicio de sesión exitoso',
            text2: 'Bienvenido a la aplicación.',
            position: 'bottom',  
            type: 'success', 
          });
  
          navigation.navigate('Home');
        } else {
          Alert.alert('Credenciales incorrectas');
        }
      } catch (error) {
        Alert.alert('Error al iniciar sesión: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return [loading, loginHandler];
  };
  