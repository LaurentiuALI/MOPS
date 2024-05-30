import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface CoffeeShop {
  Name: string;
  Geolocation: number[];
  ManagerId: string;
  Coffees: string[];
  Address: string;
  Availabilities: string[];
  ServiceType: string;
  Description: string;
  Photos: string[];
}

const Manager: React.FC = () => {

  const params = useParams();
  const [coffeeShop, setCoffeeShop] = useState<CoffeeShop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
      const managerId = params["managerId"]; // Replace with the actual manager ID
      const fetchCoffeeShop = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}coffeeshop/manager/${managerId}`, {
        });
        setCoffeeShop(response.data);
      } catch (err) {
        setError('Failed to fetch coffee shop');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShop();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {coffeeShop && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{coffeeShop.Name}</h1>
          <p className="text-gray-700 mb-2"><strong>Address:</strong> {coffeeShop.Address}</p>
          <p className="text-gray-700 mb-2"><strong>Service Type:</strong> {coffeeShop.ServiceType}</p>
          <p className="text-gray-700 mb-4"><strong>Description:</strong> {coffeeShop.Description || 'No description available'}</p>
          <h2 className="text-xl font-semibold mb-2">Coffees</h2>
          <ul className="list-disc list-inside mb-4">
            {coffeeShop.Coffees.map((coffee, index) => (
              <li key={index} className="text-gray-700">{coffee}</li>
            ))}
          </ul>
          {coffeeShop.Photos && coffeeShop.Photos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {coffeeShop.Photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Coffee Shop ${index + 1}`} className="w-full h-auto rounded-lg"/>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Manager;
