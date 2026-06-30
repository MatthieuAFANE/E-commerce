import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // On vérifie si un utilisateur est déjà sauvegardé dans le navigateur
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fonction de Connexion
  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
    setUser(response.data); // On sauvegarde l'utilisateur dans le "cerveau"
    localStorage.setItem('user', JSON.stringify(response.data)); // Et dans le navigateur
  };

  // Fonction d'Inscription
  const register = async (name, email, password) => {
    const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
  };

  // Fonction de Déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};