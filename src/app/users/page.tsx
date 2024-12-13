"use client";

import React, { useState, useEffect } from "react";
import { User } from "../types/User";
import CreateUser from "../components/CreateUser";
import UpdateUser from "../components/UpdateUser";
import DeleteUser from "../components/DeleteUser";

const UsersPage = () => {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const res = await fetch("/users/api");
      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
        console.log("Users fetched:", data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [isCreateFormVisible, isUpdateFormVisible]);

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
    setIsUpdateFormVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-gray-800">Users</h1>
        <p className="text-lg text-gray-600">Manage and view user information</p>
      </header>
      <main className="container mx-auto">
        <div className="flex justify-center items-center my-4">
          {!isCreateFormVisible && !isUpdateFormVisible && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsCreateFormVisible(true)}
            >
              Create User
            </button>
          )}

          {/* Show the CreateUser form */}
          {isCreateFormVisible && (
            <div className="my-4">
              <CreateUser
                setIsFormVisible={setIsCreateFormVisible}
                refreshUsers={getUsers}
              />
            </div>
          )}

          {isUpdateFormVisible && selectedUser && (
            <div className="my-4">
              <UpdateUser
                user={selectedUser}
                setIsFormVisible={setIsUpdateFormVisible}
                refreshUsers={getUsers}
              />
            </div>
          )}
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUpdateClick(user)}
                >
                  Update
                </button>
                <DeleteUser
                  user={user}
                  refreshUsers={getUsers}
                />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default UsersPage;
