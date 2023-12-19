import Axios from "../api.service";
import { LoginDto, RegisterDto } from "./authentication.interfaces";

export const login = async (loginDto: LoginDto) => {
  const response = await Axios.post("/auth/login", { ...loginDto });
  return response.data;
};

export const register = async (registerDto: RegisterDto) => {
  const response=  await Axios.post("/auth/register", { ...registerDto });
  return response.data;
};

export const authenticationService = {
  login,
  register,
};
