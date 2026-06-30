import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Truck } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si l'utilisateur n'est pas connecté, on le renvoie à l'accueil
  useEffect(() => {
    if (!user) {
      alert("Vous devez être connecté pour passer commande.");
      navigate('/login');
    }
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: 'France' });
  const [carrier, setCarrier] = useState('Colissimo');

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` } // On montre notre tampon au videur !
      };

      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name, qty: item.qty, image: item.image, price: item.price, product: item._id
        })),
        shippingAddress: address,
        carrier,
        paymentMethod: 'Stripe', // Par défaut
        itemsPrice: getCartTotal(),
        shippingPrice: 0,
        totalPrice: getCartTotal()
      };

      // On crée la commande dans la base de données
      const response = await axios.post('http://localhost:5000/api/orders', orderData, config);
      
      // Magie : On est redirigé vers la page de paiement avec l'ID de la commande
      navigate(`/payment/${response.data._id}`);
      
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de la commande.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <MapPin className="text-primary" size={32} /> Livraison
      </h1>

      <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-6">
        
        <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-2">Adresse d'expédition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-bold text-gray-600">Adresse (N° et rue)</label>
            <input type="text" name="address" value={address.address} onChange={handleChange} required className="w-full p-3 bg-gray-50 border rounded-xl mt-1 focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600">Code Postal</label>
            <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} required className="w-full p-3 bg-gray-50 border rounded-xl mt-1 focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600">Ville</label>
            <input type="text" name="city" value={address.city} onChange={handleChange} required className="w-full p-3 bg-gray-50 border rounded-xl mt-1 focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-2 mt-4 flex items-center gap-2">
          <Truck size={24}/> Transporteur
        </h2>
        <select value={carrier} onChange={(e) => setCarrier(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary">
          <option value="Colissimo">Colissimo - Livraison à domicile (Gratuit)</option>
          <option value="Mondial Relay">Mondial Relay - Point Relais (Gratuit)</option>
        </select>

        <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition shadow-md mt-6">
          Valider et Passer au Paiement
        </button>
      </form>
    </div>
  );
};

export default Checkout;