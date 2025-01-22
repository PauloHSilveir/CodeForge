import React, { useState, useEffect } from "react";
import stylesOP2 from "../styles/ListaSelecaoPersonalizado.module.css";

const ListaPacotes2 = ({ initialItems = [], onItemsChange, preSelectedItems = [] }) => {
    const [items, setItems] = useState([]);  // Initialize with empty array

    // Update items when initialItems changes
    useEffect(() => {
        if (initialItems.length > 0) {
            const updatedItems = initialItems.map(item => ({
                ...item,
                quantity: 0
            }));
            setItems(updatedItems);
        }
    }, [initialItems]);

   const handleQuantityChange = (id, newQuantity) => {
       const quantity = Math.max(0, newQuantity);
       const updatedItems = items.map(item => 
           item.id === id ? { ...item, quantity } : item
       );
       setItems(updatedItems);
       onItemsChange(updatedItems.filter(item => item.quantity > 0));
   };

   const handleCheckboxChange = (id) => {
       const updatedItems = items.map(item =>
           item.id === id ? { ...item, quantity: item.quantity > 0 ? 0 : 1 } : item
       );
       setItems(updatedItems);
       onItemsChange(updatedItems.filter(item => item.quantity > 0));
   };

   return (
       <div className={stylesOP2.itemContainer}>
           {items.map((item) => (
               <div key={item.id} className={stylesOP2.itemRow}>
                   <label className={stylesOP2.checkboxLabel}>
                       <input
                           type="checkbox" 
                           checked={item.quantity > 0}
                           onChange={() => handleCheckboxChange(item.id)}
                       />
                       <span className={stylesOP2.checkmark}></span>
                       {item.name}
                   </label>

                   {item.quantity > 0 && (
                       <div className={stylesOP2.quantityControls}>
                           <button
                               className={stylesOP2.quantityButton}
                               onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                           >
                               ‹
                           </button>
                           <input
                               type="number"
                               className={stylesOP2.quantityInput}
                               value={item.quantity}
                               onChange={(e) => {
                                   const value = parseInt(e.target.value, 10);
                                   if (!isNaN(value)) {
                                       handleQuantityChange(item.id, value);
                                   }
                               }}
                               min="0"
                           />
                           <button
                               className={stylesOP2.quantityButton}
                               onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                           >
                               ›
                           </button>
                       </div>
                   )}
               </div>
           ))}
       </div>
   );
};

export default ListaPacotes2;