import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, donation, onSave }) {
  if (!isOpen || !donation) return null;

  const { id, name, quantity, type, image } = donation;

  const handleSave = () => {
    onSave(id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit Donation</h2>
        <div className="modal-body">
          <img src={image} alt={name} className="modal-image" />
          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => onSave({ ...donation, name: e.target.value })} />
            </label>
            <label>
              Quantity:
              <input type="number" value={quantity} onChange={(e) => onSave({ ...donation, quantity: e.target.value })} />
            </label>
            <label>
              Type:
              <input type="text" value={type} onChange={(e) => onSave({ ...donation, type: e.target.value })} />
            </label>
            <label>
              Image URL:
              <input type="text" value={image} onChange={(e) => onSave({ ...donation, image: e.target.value })} />
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
