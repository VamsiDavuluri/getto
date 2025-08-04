// src/App.js

import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar';
import UpdateVendor from './UpdateVendor';
import StoreTimings from './StoreTimings';
import BusinessAndBankDetails from './BusinessAndBankDetails';
import VendorList from './VendorList';
import Toast from './Toast';
import './App.css';

const initialVendorState = { storeName: '', ownerName: '', phone: '', email: '', location: '', address: '', state: '', city: '', pincode: '', landmark: '', description: '' };

const initialTimingsState = {
  monday:    { isOpen: false, from: '', to: '' },
  tuesday:   { isOpen: false, from: '', to: '' },
  wednesday: { isOpen: false, from: '', to: '' },
  thursday:  { isOpen: false, from: '', to: '' },
  friday:    { isOpen: false, from: '', to: '' },
  saturday:  { isOpen: false, from: '', to: '' },
  sunday:    { isOpen: false, from: '', to: '' }
};

const initialBusinessState = { gst: '', pan: '', commission: '', bankName: '', accountType: '', accountHolderName: '', accountNumber: '', accountNumberConfirm: '', ifscCode: '' };

function App() {
  // --- All State and Logic Functions are Unchanged ---
  const [view, setView] = useState('list');
  const [vendors, setVendors] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState(initialVendorState);
  const [timings, setTimings] = useState(initialTimingsState);
  const [businessDetails, setBusinessDetails] = useState(initialBusinessState);
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'storeName', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/vendors');
      if (!response.ok) throw new Error('Failed to fetch vendors');
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  const handleDelete = async (vendorId) => {
    if (window.confirm('Are you sure you want to permanently delete this vendor?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/vendors/${vendorId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete vendor');
        setToast({ message: 'Vendor deleted successfully!', type: 'success' });
        fetchVendors();
      } catch (error) {
        setToast({ message: error.message, type: 'error' });
      }
    }
  };
  
  const validateField = (name, value, allData) => {
    switch (name) {
      case 'storeName': return !value ? 'Store name is required.' : null;
      case 'ownerName':
        if (!value) return 'Owner name is required.';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces are allowed.';
        return null;
      case 'phone':
        if (!value) return 'Phone number is required.';
        if (!/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits.';
        return null;
      case 'email':
        if (!value) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Please enter a valid email format.';
        return null;
      case 'location': case 'address': return !value ? 'This field is required.' : null;
      case 'gst':
        if (!value) return 'GST Number is required.';
        if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value.toUpperCase())) return 'Enter a valid 15-character GSTIN.';
        return null;
      case 'pan':
        if (!value) return 'PAN is required.';
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) return 'Enter a valid 10-character PAN number.';
        return null;
      case 'bankName': case 'accountHolderName':
        if (!value) return 'This field is required.';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces are allowed.';
        return null;
      case 'accountNumber':
        if (!value) return 'Account number is required.';
        if (!/^\d{9,18}$/.test(value)) return 'Account number must be 9 to 18 digits.';
        return null;
      case 'accountNumberConfirm':
        if (!value) return 'This field is required.';
        if (value !== allData.accountNumber) return 'Account numbers do not match.';
        return null;
      case 'ifscCode':
        if (!value) return 'IFSC Code is required.';
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())) return 'Enter a valid 11-character IFSC code.';
        return null;
      case 'commission': case 'accountType': return !value ? 'This field is required.' : null;
      default: return null;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const allData = { ...formData, ...businessDetails };
    const error = validateField(name, value, allData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForms = () => {
    const allData = { ...formData, ...businessDetails };
    let allErrors = {};
    Object.keys(allData).forEach(key => {
      const error = validateField(key, allData[key], allData);
      if (error) allErrors[key] = error;
    });

    const isTimingsInvalid = Object.values(timings).some(day => day.isOpen && (!day.from || !day.to));
    if (isTimingsInvalid) {
        setToast({ message: "All open time slots must be completely filled.", type: 'error' });
    }

    setErrors(allErrors);
    return Object.keys(allErrors).length === 0 && !isTimingsInvalid;
  };

  const handlePageSave = async () => {
    if (!validateForms()) {
      setToast({ message: 'Please fix all errors before saving.', type: 'error' });
      return;
    }
    setIsLoading(true);
    const allData = { formData, timings, businessDetails };
    const url = editingVendorId ? `http://localhost:5001/api/vendors/${editingVendorId}` : 'http://localhost:5001/api/vendors';
    const method = editingVendorId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(allData) });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
      }
      setToast({ message: `Vendor ${formData.storeName} ${editingVendorId ? 'updated' : 'saved'} successfully!`, type: 'success' });
      handleCancel();
    } catch (error) {
      setToast({ message: `Error: ${error.message}`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'list') {
      fetchVendors();
    }
  }, [view]);

  const visibleVendors = useMemo(() => {
    let sortableVendors = [...vendors];
    if (searchTerm) {
      sortableVendors = sortableVendors.filter(v => 
          (v.formData?.storeName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (v.formData?.ownerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (v.formData?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key) {
      sortableVendors.sort((a, b) => {
        const aValue = a.formData?.[sortConfig.key] || '';
        const bValue = b.formData?.[sortConfig.key] || '';
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    return sortableVendors.slice(firstItemIndex, lastItemIndex);
  }, [vendors, searchTerm, sortConfig, currentPage]);

  const handleUniversalChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const allData = { ...formData, ...businessDetails };
      const error = validateField(name, value, allData);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };
  
  const handleCancel = () => {
    setView('list');
    setFormData(initialVendorState);
    setTimings(initialTimingsState);
    setBusinessDetails(initialBusinessState);
    setErrors({});
    setEditingVendorId(null);
    setToast({ message: '', type: '' });
  };

  const handleAddNew = () => {
    setView('form');
    setFormData(initialVendorState);
    setTimings(initialTimingsState);
    setBusinessDetails(initialBusinessState);
    setErrors({});
    setEditingVendorId(null);
    setToast({ message: '', type: '' });
  };

  const handleEdit = (vendorId) => {
    const vendorToEdit = vendors.find(v => v.id === vendorId);
    if (vendorToEdit) {
      setView('form');
      const loadedTimings = { ...initialTimingsState, ...(vendorToEdit.timings || {}) };
      setFormData(vendorToEdit.formData || initialVendorState);
      setTimings(loadedTimings);
      setBusinessDetails(vendorToEdit.businessDetails || initialBusinessState);
      setEditingVendorId(vendorId);
      setToast({ message: '', type: '' });
    }
  };

  const handleToggle = (day) => {
    setTimings(prev => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen }
    }));
  };
  
  const handleTimeChange = (day, field, value) => {
    setTimings(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };
  
  const handlePlaceSelect = (place) => {
    if (!place.address_components) return;
    const get = (type) => place.address_components.find(c => c.types.includes(type))?.long_name || '';
    setFormData(prev => ({
      ...prev,
      location: place.formatted_address || '', address: place.name || '',
      state: get('administrative_area_level_1'), city: get('locality'), pincode: get('postal_code'),
    }));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleApplyToAll = () => {
    const mondayTimings = timings['monday'];
    if (!mondayTimings.isOpen) {
        setToast({ message: "Please open Monday to apply its timings.", type: 'error' });
        return;
    }
    if (!mondayTimings.from || !mondayTimings.to) {
      setToast({ message: "Please set Monday's opening and closing times first.", type: 'error' });
      return;
    }
    const newTimings = { ...timings };
    Object.keys(newTimings).forEach(day => {
      newTimings[day] = { isOpen: true, from: mondayTimings.from, to: mondayTimings.to };
    });
    setTimings(newTimings);
    setToast({ message: "Monday's timings have been applied to all days.", type: 'success' });
  };

  // --- RENDER LOGIC ---
  return (
    <div className={`App ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <Sidebar />
      <main className="main-content">
        {view === 'list' ? (
          <VendorList 
            vendors={visibleVendors} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            onAddNew={handleAddNew} 
            onSearch={setSearchTerm}
            requestSort={requestSort} 
            sortConfig={sortConfig}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalVendors={vendors.length}
            onPageChange={setCurrentPage}
          />
        ) : (
          <div className="form-view-container">
            <UpdateVendor 
              formData={formData} 
              handleChange={(e) => handleUniversalChange(e, setFormData)}
              errors={errors} 
              onPlaceSelect={handlePlaceSelect}
              handleBlur={handleBlur}
              onBack={handleCancel}
            />

            {/* This is the new divider line */}
            <hr className="section-divider" />

            <StoreTimings 
              timings={timings} 
              handleToggle={handleToggle}
              handleTimeChange={handleTimeChange} 
              handleApplyToAll={handleApplyToAll}
            />

            {/* This is the new divider line */}
            <hr className="section-divider" />

            <BusinessAndBankDetails 
              details={businessDetails} 
              handleChange={(e) => handleUniversalChange(e, setBusinessDetails)} 
              errors={errors} 
              handleBlur={handleBlur}
            />
            
            <div className="page-actions">
              <button onClick={handleCancel} className="cancel-button">Cancel</button>
              <button onClick={handlePageSave} className="submit-button" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Vendor'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;