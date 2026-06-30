import { useEffect, useState, useContext } from 'react'; // <-- LA CORRECTION EST ICI
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Droplet } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [pod, setPod] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPod = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pods/${id}`);
        setPod(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur", error);
        setLoading(false);
      }
    };
    fetchPod();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Chargement... 💧</div>;
  if (!pod) return <div className="text-center mt-20 text-xl text-red-500">Produit introuvable.</div>;

  return (
    <div className="container mx-auto p-4 mt-8 max-w-5xl">
      <Link to="/shop" className="text-gray-500 hover:text-primary flex items-center gap-2 mb-8 transition">
        <ArrowLeft size={20} /> Retour à la boutique
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Colonne de gauche : Image */}
        <div className="md:w-1/2 bg-gray-50 p-10 flex justify-center items-center">
          <img src={pod.image} alt={pod.name} className="max-h-96 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Colonne de droite : Infos */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-sm font-bold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
            <Droplet size={16} /> {pod.flavor}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{pod.name}</h1>
          <p className="text-3xl font-black text-gray-900 mb-6">{pod.price} €</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            {pod.description}
          </p>

          <div className="mb-8">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Intensité du goût ({pod.intensity}/5) :</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <div key={index} className={`h-2 w-8 rounded-full ${index < pod.intensity ? 'bg-primary' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-auto">
            {/* Sélecteur de quantité */}
            <div className="flex items-center border-2 border-gray-200 rounded-full bg-white">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-4 py-2 text-gray-600 hover:text-primary font-bold text-xl">-</button>
              <span className="px-4 py-2 font-bold text-lg w-12 text-center">{qty}</span>
              <button onClick={() => setQty(qty < pod.stock ? qty + 1 : pod.stock)} className="px-4 py-2 text-gray-600 hover:text-primary font-bold text-xl">+</button>
            </div>

            <button 
                onClick={() => addToCart(pod, qty)} 
                className="flex-grow bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-blue-600 hover:shadow-lg transition-all flex justify-center items-center gap-2">
                <ShoppingCart size={24} /> Ajouter au panier
            </button>
          </div>
          
          {pod.stock > 0 ? (
            <p className="text-green-500 text-sm mt-4 text-center font-medium">En stock ({pod.stock} disponibles)</p>
          ) : (
            <p className="text-red-500 text-sm mt-4 text-center font-medium">Rupture de stock</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;