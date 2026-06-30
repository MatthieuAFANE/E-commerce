import { Link } from 'react-router-dom';
import { ShoppingCart, User, PackageSearch } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Le Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          💧 AirUp Shop
        </Link>

        {/* Les Liens de Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/shop" className="text-gray-600 hover:text-primary font-medium transition">Boutique</Link>
          <Link to="/tracking" className="text-gray-600 hover:text-primary font-medium flex items-center gap-1 transition">
            <PackageSearch size={18} /> Suivi Colis
          </Link>
        </div>

        {/* Les Icônes (Panier / Profil) */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="text-gray-600 hover:text-primary transition relative">
            <ShoppingCart size={24} />
            {/* Petit badge rouge pour le nombre d'articles (statique pour l'instant) */}
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">0</span>
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-primary transition">
            <User size={24} />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;