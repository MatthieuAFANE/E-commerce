import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[85vh] bg-blue-50 flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Donnez du goût à votre <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">eau</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
          Découvrez nos pods aromatisés. Zéro sucre, zéro calorie, 100% de plaisir grâce au pouvoir de la rétro-olfaction. L'hydratation n'a jamais été aussi savoureuse.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/shop" className="bg-secondary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-500 hover:scale-105 transition-all shadow-lg">
            Découvrir les parfums
          </Link>
          <Link to="/tracking" className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-md">
            Où est mon colis ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;