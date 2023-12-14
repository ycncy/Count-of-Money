import Axios from "../../api.service";
import {AddKeywordsDto, UpdateProfileDto} from "./public.users.interfaces";
import {User} from "../admin/admin.users.interfaces";

export const getProfile = async (): Promise<User> => {
    const response = await Axios.get("/users/profile");
    return response.data;
}

export const updateProfile = async (updateProfileDto: UpdateProfileDto): Promise<User> => {
    const response = await Axios.put("/users/profile", updateProfileDto);
    return response.data;
}

export const addKeyword = async (addKeywordsDto: AddKeywordsDto) => {
    const response = await Axios.put("/users/keywords", addKeywordsDto);
    return response.data;
}

export const deleteKeyword = async (keyword: string) => {
    const response = await Axios.delete(`/users/keywords/${keyword}`);
    return response.data;
}

export const publicUsersService = {
    getProfile,
    updateProfile,
    addKeyword,
    deleteKeyword,
}