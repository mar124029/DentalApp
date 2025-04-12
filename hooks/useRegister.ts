import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";

const formatDateForMySQL = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const registerHandler = async (form, setForm, navigation) => {
    const { correo, password, confirmar, nombre, dni, nacimiento, telefono } = form;

    if (password !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    const nacimientoFormateado = formatDateForMySQL(nacimiento);

    try {
      setLoading(true);

      const response = await axios.post("http://192.168.1.8:3001/api/auth/register", {
        nombre,
        dni,
        nacimiento: nacimientoFormateado,
        telefono,
        correo,
        password,
      });

      setForm({
        nombre: "",
        dni: "",
        nacimiento: "",
        telefono: "",
        correo: "",
        password: "",
        confirmar: "",
      });

      Alert.alert("Éxito", "Registro exitoso");
      navigation.navigate("Login");

    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      Alert.alert("Error", "Error al registrar: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return { registerHandler, loading };
};
