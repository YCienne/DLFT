import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function FoundItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch Found items without relying on createdAt
    const q = query(
      collection(db, "items"),
      where("type", "==", "Found")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const foundItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort manually by createdAt if available
      foundItems.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return b.createdAt.seconds - a.createdAt.seconds;
      });
      setItems(foundItems);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="page-container">
      <h2>Found Items</h2>
      {items.length === 0 ? (
        <p>No found items reported yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {items.map((item) => (
            <div key={item.id} className="card">
              {item.image && <img src={item.image} alt={item.title} />}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
