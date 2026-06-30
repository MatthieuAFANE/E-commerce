import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Pour rediriger après la connexion

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Retour à l'accueil si ça marche !
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-12 max-w-md">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <LogIn className="text-primary" size={32} /> Connexion
        </h1>
        <p className="text-gray-500 mb-8">Ravi de vous revoir ! 💧</p>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition shadow-md mt-2">
            Se connecter
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Pas encore de compte ? <Link to="/register" className="text-primary font-bold hover:underline">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;