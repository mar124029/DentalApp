import axios from "axios";
import { DENTAL_APP_API } from ".";

export const login = ({dni, contrasena}) => {
  return axios.post(`${DENTAL_APP_API}/auth/login`, { dni, contrasena })
}