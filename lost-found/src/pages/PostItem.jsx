import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// PostItem page - Allows logged-in users to post Lost or Found items
export default function PostItem() {
  // Form states
  const [type, setType] = useState("Lost");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  // Convert uploaded image to Base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 string
    };
    reader.readAsDataURL(file);
  };

  // Submit form data to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "items"), {
        type,
        title,
        description,
        location,
        date,
        image,
        userId: auth.currentUser?.uid || "guest",
        createdAt: serverTimestamp()
      });

      alert("Item posted successfully!");
      
      // Reset form
      setType("Lost");
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setImage("");
    } catch (err) {
      console.error("Error posting item:", err);
      alert("Error posting item, please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Post a Lost or Found Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Item Type */}
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        {/* Title */}
        <label>Title:</label>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />

        {/* Description */}
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        {/* Location */}
        <label>Location:</label>
        <input 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        />

        {/* Date */}
        <label>Date:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />

        {/* Image Upload */}
        <label>Image:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
        {image && (
          <div>
            <p>Preview:</p>
            <img src={image} alt="preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" style={{ marginTop: "10px" }}>Post Item</button>
      </form>
    </div>
  );
}
