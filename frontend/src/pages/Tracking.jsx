import { useState } from 'react';
import axios from 'axios';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('Colissimo');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingNumber) return;
    
    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/tracking/${carrier}/${trackingNumber}`);
      setTrackingData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 flex justify-center items-center gap-3">
          <Truck className="text-primary" size={40} /> Suivez votre commande
        </h1>
        <p className="text-gray-500 text-lg">Saisissez votre numéro de suivi pour connaître l'acheminement de vos Pods.</p>
      </div>

      {/* Le Formulaire de Recherche */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex-grow">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Numéro de suivi</label>
          <input 
            type="text" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Ex: 6A1234567890" 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>
        
        <div className="md:w-64">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Transporteur</label>
          <select 
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none cursor-pointer">
            <option value="Colissimo">Colissimo (La Poste)</option>
            <option value="MondialRelay">Mondial Relay</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="md:mt-6 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? "Recherche..." : <><Search size={20} /> Suivre</>}
        </button>
      </form>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100 mb-8">
          {error}
        </div>
      )}

      {/* Les Résultats - La Timeline */}
      {trackingData && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          
          {/* En-tête du résultat */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Colis N° {trackingData.trackingNumber}</h2>
              <p className="text-gray-500 font-medium mt-1">Expédié via {trackingData.carrier}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 text-primary px-4 py-2 rounded-lg text-center">
              <p className="text-sm font-bold uppercase">Livraison Estimée</p>
              <p className="text-lg font-black">{trackingData.estimatedDelivery}</p>
            </div>
          </div>

          {/* Timeline Visuelle (Frise) */}
          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-8 pb-4">
            
            {trackingData.events.map((event, index) => (
              <div key={event.id} className="relative pl-8 md:pl-10">
                {/* Point de couleur (Vert si fait, Gris si en attente) */}
                <div className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${event.done ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {event.done && <CheckCircle size={12} className="text-white" />}
                </div>

                <div className={`${event.done ? 'text-gray-800' : 'text-gray-400'}`}>
                  <h3 className="text-lg font-bold">{event.status}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    {event.date && (
                      <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {event.date}
                      </span>
                    )}
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin size={16} /> {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;