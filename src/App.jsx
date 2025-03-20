// src/App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingItem, setEditingItem] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 1. Función para agregar un nuevo ítem
  const addItem = async () => {
    if (newItem.trim() !== "") {
      try {
        await addDoc(collection(db, 'items'), { name: newItem });
        setNewItem("");
        fetchItems(); // Actualiza la lista después de agregar el ítem
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  // 2. Función para obtener los ítems
  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  // 3. Función para actualizar un ítem
  const updateItem = async () => {
    if (editingItem.trim() !== "") {
      try {
        const itemRef = doc(db, 'items', editingId);
        await updateDoc(itemRef, { name: editingItem });
        setEditingItem("");
        setEditingId(null);
        fetchItems(); // Actualiza la lista después de editar
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  // 4. Función para eliminar un ítem
  const deleteItem = async (id) => {
    try {
      const itemRef = doc(db, 'items', id);
      await deleteDoc(itemRef);
      fetchItems(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // 5. Llamada inicial para cargar los ítems
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>CRUD en Firebase con React</h1>
      
      {/* Formulario para agregar un ítem */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Nuevo ítem"
      />
      <button onClick={addItem}>Agregar</button>
      
      {/* Mostrar los ítems */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingItem}
                  onChange={(e) => setEditingItem(e.target.value)}
                  placeholder="Editar ítem"
                />
                <button onClick={updateItem}>Guardar</button>
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <button onClick={() => { setEditingId(item.id); setEditingItem(item.name); }}>Editar</button>
                <button onClick={() => deleteItem(item.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;