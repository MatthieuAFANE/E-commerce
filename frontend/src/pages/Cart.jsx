import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 mt-20 text-center max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Votre Panier est vide 💧</h1>
        <p className="text-gray-500 mb-8">On dirait que vous n'avez pas encore ajouté de pods pour aromatiser votre eau !</p>
        <Link to="/shop" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition shadow-lg inline-block">
          Découvrir nos parfums
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Votre Panier</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Liste des articles */}
        <div className="lg:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          {cart.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 py-6 last:border-0">
              <img src={item.image} alt={item.name} className="h-24 w-24 object-contain bg-gray-50 rounded-xl p-2" />
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">Quantité : {item.qty}</p>
              </div>

              <div className="text-xl font-extrabold text-gray-900">
                {(item.price * item.qty).toFixed(2)} €
              </div>

              <button 
                onClick={() => {
                    if (window.confirm(`Voulez-vous vraiment retirer "${item.name}" de votre panier ?`)) {
                    removeFromCart(item._id);
                    }
                }} 
                className="text-red-400 hover:text-red-600 transition p-2 bg-red-50 rounded-full">
                <Trash2 size={20} />
                </button>
            </div>
          ))}
        </div>

        {/* Résumé et Paiement */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Résumé</h2>
            
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Sous-total</span>
              <span>{getCartTotal().toFixed(2)} €</span>
            </div>
            <div className="flex justify-between mb-6 text-gray-600 border-b border-gray-100 pb-6">
              <span>Frais de port estimés</span>
              <span className="text-green-500 font-medium">Gratuits</span>
            </div>

            <div className="flex justify-between mb-8 text-2xl font-black text-gray-900">
              <span>Total</span>
              <span>{getCartTotal().toFixed(2)} €</span>
            </div>

            <Link to="/checkout" className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-blue-600 hover:shadow-lg transition flex justify-center items-center gap-2">
            Passer commande <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;