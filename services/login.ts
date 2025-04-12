import axios from "axios";
import { DENTAL_APP_API } from ".";

export const login = ({dni, password}) => {
  return axios.post(`${DENTAL_APP_API}/auth/login`, { dni, password })
}