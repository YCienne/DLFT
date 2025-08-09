import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function LostItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch Lost items without relying on createdAt
    const q = query(
      collection(db, "items"),
      where("type", "==", "Lost")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lostItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort manually by createdAt if available
      lostItems.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return b.createdAt.seconds - a.createdAt.seconds;
      });
      setItems(lostItems);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="page-container">
      <h2>Lost Items</h2>
      {items.length === 0 ? (
        <p>No lost items reported yet.</p>
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
