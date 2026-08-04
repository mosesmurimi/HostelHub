import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import HostelCard from "../components/home/HostelCard";

const SavedHostels = () => {

  const [savedHostels, setSavedHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchSavedHostels = async () => {

      if (!auth.currentUser) return;

      try {

        const q = query(
          collection(db, "favorites"),
          where("studentId", "==", auth.currentUser.uid)
        );

        const snapshot = await getDocs(q);

        const hostelPromises = snapshot.docs.map(async (favoriteDoc) => {

  const hostelId = favoriteDoc.data().hostelId;

  const hostelRef = doc(db, "hostels", hostelId);

  const hostelSnap = await getDoc(hostelRef);

  if (hostelSnap.exists()) {

    return {

      id: hostelSnap.id,

      ...hostelSnap.data(),

    };

  }

  return null;

});

const hostels = await Promise.all(hostelPromises);

setSavedHostels(hostels.filter(Boolean));

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchSavedHostels();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            ❤️ Saved Hostels
          </h1>

          <p className="mt-3 text-green-100">
            Your favourite hostels.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {loading ? (

          <p>Loading...</p>

        ) : savedHostels.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold">

              No saved hostels yet.

            </h2>

            <p className="text-gray-500 mt-3">

              Browse hostels and tap ❤️ to save them.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {savedHostels.map(hostel => (

              <HostelCard
                key={hostel.id}
                hostel={hostel}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default SavedHostels;