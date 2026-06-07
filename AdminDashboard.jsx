import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    stores: 0,
    ratings: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await axios.get(
        "http://localhost:5000/api/admin/users"
      );

      const stores = await axios.get(
        "http://localhost:5000/api/admin/stores"
      );

      const ratings = await axios.get(
        "http://localhost:5000/api/admin/ratings"
      );

      setStats({
        users: users.data.length,
        stores: stores.data.length,
        ratings: ratings.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">
            Total Users
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            {stats.users}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">
            Total Stores
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            {stats.stores}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">
            Total Ratings
          </h2>

          <p className="text-4xl font-bold text-yellow-600 mt-4">
            {stats.ratings}
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;