import React from 'react';
import { User } from '../types/User';

interface DeleteUserProps {
  user: User;
  refreshUsers: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user, refreshUsers }) => {
  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
    
      try {
        
        const res = await fetch(`/users/api/${user._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("User successfully deleted.");
          refreshUsers();
        } else {
          const errorData = await res.json();
          console.error("Error deleting user:", errorData.error);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDeleteClick}
    >
      Delete
    </button>
  );
};

export default DeleteUser;
