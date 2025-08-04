// src/VendorList.js
import React from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import './VendorList.css';

const VendorList = ({
  vendors,
  onEdit,
  onDelete,
  onAddNew,
  onSearch,
  requestSort,
  sortConfig,
  currentPage,
  itemsPerPage,
  totalVendors,
  onPageChange,
}) => {
  const firstItemNum = (currentPage - 1) * itemsPerPage + 1;
  const lastItemNum = Math.min(currentPage * itemsPerPage, totalVendors);

  return (
    <div className="vendor-list-container">
      <div className="list-header">
        <h2 className="list-title">Vendors</h2>
        <div className="list-actions">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for vendors..."
              className="search-input"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button onClick={onAddNew} className="add-new-btn">
            <FaPlus />
            <span>Add New Vendor</span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>S.NO.</th>
              <th onClick={() => requestSort('storeName')} className="sortable">STORE</th>
              <th onClick={() => requestSort('ownerName')} className="sortable">OWNER</th>
              <th>ADDRESS</th>
              <th>CONTACT NO</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => {
                const sNo = firstItemNum + index;
                return (
                  <tr key={vendor.id}>
                    <td>{sNo}</td>
                    <td>{vendor.formData.storeName}</td>
                    <td>{vendor.formData.ownerName}</td>
                    <td>{vendor.formData.address}</td>
                    <td>{vendor.formData.phone}</td>
                    <td>
                      <div className="actions-cell">
                        <button
                          onClick={() => onEdit(vendor.id)}
                          className="icon-btn edit-btn"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => onDelete(vendor.id)}
                          className="icon-btn delete-btn"
                          aria-label="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  <h3>No Vendors Found</h3>
                  <p>Click "Add New Vendor" to get started.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalVendors > 0 && (
        <div className="list-footer">
          <span>Rows per page: {itemsPerPage}</span>
          <span>{`${firstItemNum}-${lastItemNum} of ${totalVendors}`}</span>
          <div className="pagination-controls">
              <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}></button>
              <button disabled={lastItemNum >= totalVendors} onClick={() => onPageChange(currentPage + 1)}></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorList;