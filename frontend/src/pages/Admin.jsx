import { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '', flavor: '', description: '', price: '', image: '', intensity: '3', stock: '50'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // On envoie les données du formulaire à notre backend Node.js
      await axios.post('http://localhost:5000/api/pods', formData);
      setMessage('✅ Pod ajouté avec succès !');
      // On vide le formulaire
      setFormData({ name: '', flavor: '', description: '', price: '', image: '', intensity: '3', stock: '50' });
    } catch (error) {
      setMessage('❌ Erreur lors de l\'ajout du pod.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        ⚙️ Espace Admin - Ajouter un Pod
      </h1>
      
      {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">{message}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom du Pod</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="ex: Pod Pêche" className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Saveur</label>
            <input type="text" name="flavor" value={formData.flavor} onChange={handleChange} required placeholder="ex: Fruité" className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required placeholder="5.99" className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Description du goût..." className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lien de l'image (URL)</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} required placeholder="https://lien-de-mon-image.com/pod.png" className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
        </div>

        <button type="submit" className="mt-4 bg-primary text-white py-3 rounded-md font-bold hover:bg-blue-600 transition">
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default Admin;