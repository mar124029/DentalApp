import axios from "axios";
import { DENTAL_APP_API } from ".";

export const register = ({ nombre, dni, nacimiento, telefono, correo, password }) => {
  return axios.post(`${DENTAL_APP_API}/auth/register`, {
    nombre,
    dni,
    nacimiento,
    telefono,
    correo,
    password
  });
};
