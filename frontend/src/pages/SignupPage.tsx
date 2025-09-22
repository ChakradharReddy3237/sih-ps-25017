import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Alumini'); // Default role
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, role);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
      // Handle signup error (e.g., show a message to the user)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded">
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
