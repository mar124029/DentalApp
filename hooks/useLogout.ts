import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Toast } from "toastify-react-native";
import { DENTAL_APP_API } from "../services"; 

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const logoutHandler = async (navigation) => {
    setLoading(true);
    try {
      await axios.post(`${DENTAL_APP_API}/auth/logout`);

      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');

      Toast.show({
        text1: "Sesión cerrada",
        text2: "Has cerrado sesión con éxito.",
        position: "bottom",
        type: "success",
      });

      navigation.navigate('Login');
    } catch (error) {
      Toast.show({
        text1: "Error",
        text2: "Hubo un error al cerrar sesión.",
        position: "bottom",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return [loading, logoutHandler];
};
