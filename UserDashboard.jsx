import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  api.get("/stores")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores", err);
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      await api.post("/ratings", {
        storeId,
        rating: Number(rating),
      });

      fetchStores(); // refresh data after rating
    } catch (err) {
      alert("Failed to submit rating");
    }
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search stores by name or address..."
        className="w-full p-3 mb-6 border rounded shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading */}
      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <p className="text-gray-600">{store.address}</p>

              <div className="mt-2">
                <p>
                  ⭐ Average Rating:{" "}
                  <span className="font-bold">
                    {store.avgRating || "0"}
                  </span>
                </p>

                <p>
                  Your Rating:{" "}
                  <span className="font-bold text-blue-600">
                    {store.userRating || "Not Rated"}
                  </span>
                </p>
              </div>

              {/* Rating Input */}
              <div className="mt-3 flex gap-2">
                <select
                  id={`rating-${store.id}`}
                  className="border p-2 rounded w-full"
                  defaultValue="5"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <button
                  onClick={() =>
                    submitRating(
                      store.id,
                      document.getElementById(`rating-${store.id}`).value
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
