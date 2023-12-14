import Axios from "../../api.service";
import {UpdateUserDto, User} from "./admin.users.interfaces";

export const getUserById = async (userId: number): Promise<User> => {
  const response = await Axios.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (
  userId: number,
  updateUserDto: UpdateUserDto,
) => {
  const response = await Axios.put(`/users/${userId}`, updateUserDto);
  return response.data;
};

export const deleteUser = async (userId: number) => {
    const response = await Axios.delete(`/users/${userId}`);
    return response.data;
}

export const getAllUsers = async (): Promise<User[]> => {
    const response = await Axios.get(`/users`);
    return response.data;
}

export const adminUsersService = {
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
}