import { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard() {

  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const storeRes = await axios.get(
        "http://localhost:5000/api/stores/owner/1"
      );

      const ratingRes = await axios.get(
        "http://localhost:5000/api/stores/owner/1/ratings"
      );

      setStore(storeRes.data[0]);
      setRatings(ratingRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
        Owner Dashboard
      </h1>

      {store && (

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold">
            {store.name}
          </h2>

          <p className="text-xl mt-3">
            ⭐ Average Rating:
            {" "}
            {store.averageRating}
          </p>

        </div>

      )}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-4">
          Users Ratings
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                User
              </th>

              <th className="text-left p-2">
                Rating
              </th>
            </tr>
          </thead>

          <tbody>

            {ratings.map((item, index) => (

              <tr
                key={index}
                className="border-b"
              >
                <td className="p-2">
                  {item.name}
                </td>

                <td className="p-2">
                  ⭐ {item.rating}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OwnerDashboard;
