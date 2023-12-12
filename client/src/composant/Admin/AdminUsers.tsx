import React from 'react';
import {useQuery} from "react-query";
import {deleteUser, getAllUsers} from "../../api/admin";

const AdminUsers = () => {
    const {data: user} = useQuery('users', getAllUsers, {
        retry: (_, error: any) => !(error.response?.status === 404),
        enabled: localStorage.getItem('token') !== null,
    });

    const handleDeleteUser = async (userId: number) => {
        try {
            if (!userId) return;
            await deleteUser(userId);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='bg-white bg-opacity-10 text-white rounded-lg shadow-lg mt-4 p-4'>
            <h2 className='text-xl font-semibold'>Liste des utilisateurs</h2>
            <table className='w-full text-center mt-4'>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Creation Date</th>
                </tr>
                </thead>
                <tbody>
                {user?.map((user: any) => (
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.createdAt}</td>
                        <td>
                            <button
                                className='text-red-500 ml-2 hover:underline'
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;