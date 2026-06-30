import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/'); // Redirection vers l'accueil
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-12 max-w-md">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <UserPlus className="text-secondary" size={32} /> Créer un compte
        </h1>
        <p className="text-gray-500 mb-8">Rejoignez l'aventure Air Up ! 💧</p>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Prénom ou Pseudo</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Jean" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Adresse Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="jean@exemple.com" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition shadow-md mt-4">
            M'inscrire
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Déjà un compte ? <Link to="/login" className="text-primary font-bold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;