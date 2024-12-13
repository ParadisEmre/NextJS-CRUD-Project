import React, { useState } from "react";

interface CreateUserProps {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUsers: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({
  setIsFormVisible,
  refreshUsers,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const createUser = async () => {
    setIsCreating(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/users/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to create user");
      }

      setName("");
      setEmail("");
      setRole("");

      setSuccess(true);
      refreshUsers();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred while creating the user");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsCreating(false);
      setIsFormVisible(false)
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create User</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">User created successfully</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-gray-600 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-600 font-medium">
            Role
          </label>
          <input
            type="text"
            id="role"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            isCreating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create User"}
        </button>
      </form>
      <button
        className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mt-4"
        onClick={() => setIsFormVisible(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateUser;
