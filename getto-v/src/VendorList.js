// src/VendorList.js
import React from 'react';
import './VendorList.css';

const VendorList = ({ vendors, onEdit, onDelete, onAddNew }) => {
  return (
    <div className="vendor-list-container">
      <div className="list-header">
        <h2>All Vendors</h2>
        <button onClick={onAddNew} className="add-new-btn">Add New Vendor</button>
      </div>
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.formData.storeName}</td>
              <td>{vendor.formData.ownerName}</td>
              <td>{vendor.formData.email}</td>
              <td>{vendor.formData.phone}</td>
              <td>
                <button onClick={() => onEdit(vendor.id)} className="edit-btn">Edit</button>
                <button onClick={() => onDelete(vendor.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;
