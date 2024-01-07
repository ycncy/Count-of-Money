import React, { useEffect } from 'react';
import { adminUsersService } from '../../services/users/admin/admin.users.service';
import { User } from '../../services/users/admin/admin.users.interfaces';

export function AdminUsers() {
  const [users, setUsers] = React.useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: User[] = await adminUsersService.getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      if (!userId) return;
      await adminUsersService.deleteUser(userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-[#1F2937] bg-opacity-10 text-white rounded-lg shadow-lg mt-4 p-4'>
      <h2 className='text-xl font-semibold'>Users List</h2>
      <table className='w-full text-center mt-4'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Base currency</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.baseCurrency}</td>
              <td>
                <button
                  className='text-red-500 ml-2 hover:underline'
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
