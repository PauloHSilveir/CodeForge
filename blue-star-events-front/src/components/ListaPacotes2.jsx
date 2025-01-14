import React, { useState } from "react";
import stylesOP2 from "../styles/ListaSelecaoPersonalizado.module.css";

const ListaPacotes2 = ({ 
    initialItems, 
    onItemsChange,
    preSelectedItems = [] 
}) => {
    const [items, setItems] = useState(() => {
        return initialItems.map((item) => {
            const preSelected = preSelectedItems.find((selected) => selected.id === item.id);
            return {
                ...item,
                quantity: preSelected ? preSelected.quantity : 0
            };
        });
    });

    const handleCheckboxChange = (id) => {
        setItems(prevItems => {
            const updatedItems = prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity > 0 ? 0 : 1 } : item
            );
            onItemsChange(updatedItems.filter(item => item.quantity > 0));
            return updatedItems;
        });
    };

    const handleQuantityChange = (id, quantity) => {
        setItems(prevItems => {
            const updatedItems = prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
            );
            onItemsChange(updatedItems.filter(item => item.quantity > 0));
            return updatedItems;
        });
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
