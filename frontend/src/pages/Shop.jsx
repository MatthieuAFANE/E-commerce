import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // C'est souvent cette ligne qui pose problème si elle est oubliée !
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';

const Shop = () => {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pods');
        setPods(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de chargement", error);
        setLoading(false);
      }
    };
    fetchPods();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Chargement des parfums... 💧</div>;

  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tous nos Parfums</h1>
      
      {pods.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit pour le moment. Allez dans l'espace Admin pour en ajouter !</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pods.map((pod) => (
            <div key={pod._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden flex flex-col">
              
              {/* Image cliquable */}
              <Link to={`/pod/${pod._id}`} className="h-48 bg-gray-50 p-4 flex justify-center items-center cursor-pointer">
                <img src={pod.image} alt={pod.name} className="h-full object-contain drop-shadow-md hover:scale-110 transition-transform" />
              </Link>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">{pod.flavor}</div>
                
                {/* Titre cliquable */}
                <Link to={`/pod/${pod._id}`}>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-primary cursor-pointer transition">{pod.name}</h2>
                </Link>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{pod.description}</p>
                
                <div className="flex-grow"></div> 
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-lg font-extrabold text-gray-900">{pod.price} €</span>
                  <button className="bg-primary text-white p-2 rounded-full hover:bg-blue-600 transition flex items-center justify-center">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;