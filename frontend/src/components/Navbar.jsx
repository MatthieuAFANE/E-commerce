import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // <-- IMPORT
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, PackageSearch, LogOut } from 'lucide-react';

const Navbar = () => {
  const { getCartCount, isCartAnimating } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // <-- IMPORT DU USER
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          💧 AirUp Shop
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/shop" className="text-gray-600 hover:text-primary font-medium transition">Boutique</Link>
          <Link to="/tracking" className="text-gray-600 hover:text-primary font-medium flex items-center gap-1 transition">
            <PackageSearch size={18} /> Suivi Colis
          </Link>
          
          {/* Le lien Admin n'apparaît QUE si l'utilisateur est connecté ET qu'il est Admin */}
          {user && user.isAdmin && (
            <Link to="/admin" className="text-red-500 hover:text-red-700 font-medium transition">Admin</Link>
          )}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative flex items-center justify-center">
            <div className={`transition-all duration-300 ${isCartAnimating ? 'scale-125 text-primary' : 'text-gray-600 hover:text-primary'}`}>
              <ShoppingCart size={24} />
            </div>
            <span className={`absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold px-1.5 py-0.5 rounded-full transition-all duration-300 ${isCartAnimating ? 'animate-bounce scale-110' : ''}`}>
              {getCartCount()}
            </span>
          </Link>
          
          {/* Logique d'affichage Utilisateur */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-700 hidden sm:block">Salut, {user.name}</span>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition" title="Se déconnecter">
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-primary transition" title="Se connecter">
              <User size={24} />
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;