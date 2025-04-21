import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch Items
  useEffect(() => {
    axios.get("http://localhost:5000/items").then((res) => setItems(res.data));
  }, []);

  // Add or Update Item
  const handleSubmit = () => {
    if (editingId) {
      axios.put(`http://localhost:5000/items/${editingId}`, { name, quantity }).then((res) => {
        setItems(items.map((item) => (item._id === editingId ? res.data : item)));
        setEditingId(null);
      });
    } else {
      axios.post("http://localhost:5000/items", { name, quantity }).then((res) => {
        setItems([...items, res.data]);
      });
    }
    setName("");
    setQuantity("");
  };

  // Delete Item
  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`).then(() => {
      setItems(items.filter((item) => item._id !== id));
    });
  };

  // Edit Item
  const editItem = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setQuantity(item.quantity);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Inventory Management</h2>
      <input placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleSubmit}>{editingId ? "Update" : "Add"} Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity}
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;