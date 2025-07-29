// src/App.js







import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import UpdateVendor from './UpdateVendor';
import StoreTimings from './StoreTimings';
import BusinessAndBankDetails from './BusinessAndBankDetails';
import VendorList from './VendorList';
import Toast from './Toast';
import { FaBars } from 'react-icons/fa';
import './App.css';

const initialVendorState = { storeName: '', ownerName: '', phone: '', email: '', location: '', address: '', state: '', city: '', pincode: '', landmark: '', description: '' };
const initialTimingsState = { monday: { isOpen: false, from: '', to: '' }, tuesday: { isOpen: false, from: '', to: '' }, wednesday: { isOpen: false, from: '', to: '' }, thursday: { isOpen: false, from: '', to: '' }, friday: { isOpen: false, from: '', to: '' }, saturday: { isOpen: false, from: '', to: '' }, sunday: { isOpen: false, from: '', to: '' } };
const initialBusinessState = { gst: '', pan: '', commission: '', bankName: '', accountType: '', accountHolderName: '', accountNumber: '', accountNumberConfirm: '', ifscCode: '' };

function App() {
  const [formData, setFormData] = useState(initialVendorState);
  const [timings, setTimings] = useState(initialTimingsState);
  const [businessDetails, setBusinessDetails] = useState(initialBusinessState);
  const [view, setView] = useState('list');
  const [vendors, setVendors] = useState([]);
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const handleDelete = async (vendorId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this vendor?');
    if (isConfirmed) { // <-- Fix: should be isConfirmed, not !isConfirmed
      try {
        const response = await fetch(`http://localhost:5001/api/vendors/${vendorId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete vendor');
        setToast({ message: 'Vendor deleted successfully!', type: 'success' });
        fetchVendors();
      } catch (error) {
        console.error("failed to delete vendor:", error);
        setToast({ message: error.message, type: 'error' });
      }
    }
  };

  useEffect(() => {
    if (view === 'list') {
      fetchVendors();
    }
  }, [view]);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/vendors');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
      setToast({ message: 'Could not load vendor data.', type: 'error' });
    }
  };

  const validateForms = () => {
    const newErrors = {};
    const requiredVendorFields = ['storeName', 'ownerName', 'phone', 'email', 'location', 'address'];
    requiredVendorFields.forEach(field => {
      if (!formData[field]) newErrors[field] = 'This field is required';
    });
    const requiredBusinessFields = ['gst', 'pan', 'commission', 'bankName', 'accountType', 'accountHolderName', 'accountNumber', 'ifscCode'];
    requiredBusinessFields.forEach(field => {
      if (!businessDetails[field]) newErrors[field] = 'This field is required';
    });
    if (businessDetails.accountNumber && businessDetails.accountNumberConfirm && businessDetails.accountNumber !== businessDetails.accountNumberConfirm) {
      newErrors.accountNumberConfirm = 'Account numbers do not match.';
    }
    const isTimingsInvalid = Object.values(timings).some(day => day.isOpen && (day.from === '' || day.to === ''));
    if (isTimingsInvalid) newErrors.timings = "All open time slots must be filled.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUniversalChange = (e, setState) => {
    const { name, value } = e.target;
    if (name === 'location') {
      setState(prevState => ({ ...prevState, location: value, address: '', city: '', state: '', pincode: '' }));
      return;
    }
    const numericFields = ['pincode', 'phone', 'accountNumber', 'accountNumberConfirm'];
    if (numericFields.includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, '');
      setState(prevState => ({ ...prevState, [name]: numericValue }));
    } else {
      setState(prevState => ({ ...prevState, [name]: value }));
    }
  };
  
  const handleImageChange = (e) => { 
    if (e.target.files && e.target.files[0]) setImagePreview(URL.createObjectURL(e.target.files[0])); 
  };

  const handleToggle = (day) => { setTimings(prev => ({ ...prev, [day]: { ...prev[day], isOpen: !prev[day].isOpen } })); };
  
  const handleTimeChange = (day, field, value) => {
    setTimings(prevTimings => ({
      ...prevTimings,
      [day]: { ...prevTimings[day], [field]: value },
    }));
  };
  
  const handlePlaceSelect = (place) => {
    let streetNumber = '';
    let route = '';
    let neighborhood = '';
    let sublocality = '';
    let city = '';
    let state = '';
    let pincode = '';

    if (!place.address_components) {
      console.error("Google Places API did not return address components.");
      return;
    }

    for (const component of place.address_components) {
      const componentType = component.types[0];
      switch (componentType) {
        case "street_number":
          streetNumber = component.long_name;
          break;
        case "route":
          route = component.long_name;
          break;
        case "neighborhood":
          neighborhood = component.long_name;
          break;
        case "sublocality_level_1":
        case "sublocality":
          sublocality = component.long_name;
          break;
        case "locality":
          city = component.long_name;
          break;
        case "administrative_area_level_1":
          state = component.long_name;
          break;
        case "postal_code":
          pincode = component.long_name;
          break;
        default:
          break;
      }
    }

    const addressParts = [];
    if (place.name && place.name !== route && place.name !== streetNumber) {
        addressParts.push(place.name);
    }
    if (streetNumber) addressParts.push(streetNumber);
    if (route) addressParts.push(route);
    if (sublocality) addressParts.push(sublocality);
    if (neighborhood) addressParts.push(neighborhood);
    
    const finalAddress = addressParts.join(', ');

    setFormData(prev => ({
      ...prev,
      location: place.formatted_address,
      address: finalAddress,
      city,
      state,
      pincode,
    }));
  };


  const handleCancel = () => {
    setFormData(initialVendorState);
    setTimings(initialTimingsState);
    setBusinessDetails(initialBusinessState);
    setImagePreview(null);
    setErrors({});
    setEditingVendorId(null);
    setView('list');
  };

  const handlePageSave = async () => {
    if (!validateForms()) {
      setToast({ message: 'Please fix the errors before saving.', type: 'error' });
      return;
    }
    setIsLoading(true);
    const allData = { formData, timings, businessDetails };
    const url = editingVendorId !== null ? `http://localhost:5001/api/vendors/${editingVendorId}` : 'http://localhost:5001/api/vendors';
    const method = editingVendorId !== null ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(allData) });
      if (!response.ok) throw new Error('Network response was not ok');
      setToast({ message: `Vendor ${editingVendorId !== null ? 'updated' : 'details updated'} successfully!`, type: 'success' });
      handleCancel();
      fetchVendors();
    } catch (error) {
      console.error('Failed to save data:', error);
      setToast({ message: 'Error: Could not save data.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddNew = () => {
    setFormData(initialVendorState);
    setTimings(initialTimingsState);
    setBusinessDetails(initialBusinessState);
    setEditingVendorId(null);
    setView('form');
  };

  const handleEdit = (vendorId) => {
    const vendorToEdit = vendors.find(v => v.id === vendorId);
    if (vendorToEdit) {
      setFormData(vendorToEdit.formData);
      setTimings(vendorToEdit.timings);
      setBusinessDetails(vendorToEdit.businessDetails);
      setEditingVendorId(vendorId);
      setView('form');
    }
  };

  const handleApplyToAll = () => {
    const mondayTimings = timings.monday;
    if (!mondayTimings.isOpen || !mondayTimings.from || !mondayTimings.to) {
        setToast({ message: "Please set Monday's timings first.", type: 'error' });
        return;
    }
    setTimings(currentTimings => {
        const newTimings = { ...currentTimings };
        Object.keys(newTimings).forEach(day => {
            newTimings[day] = { ...mondayTimings };
        });
        return newTimings;
    });
    setToast({ message: "Timings from Monday applied to all days!", type: 'success' });
  };

  return (
    <div className={`App ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      <Sidebar />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <main className="main-content">
        <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>
        
        {view === 'list' ? (
          <VendorList vendors={vendors} onEdit={handleEdit} onDelete={handleDelete} onAddNew={handleAddNew} />
        ) : (
          <>
            <UpdateVendor 
              formData={formData} 
              handleChange={(e) => handleUniversalChange(e, setFormData)}
              handleImageChange={handleImageChange}
              imagePreview={imagePreview}
              errors={errors}
              onPlaceSelect={handlePlaceSelect}
              onBack={handleCancel}
            />
            <StoreTimings 
                timings={timings}
                handleToggle={handleToggle}
                handleTimeChange={handleTimeChange}
                handleApplyToAll={handleApplyToAll}
            />
            <BusinessAndBankDetails 
              details={businessDetails} 
              handleChange={(e) => handleUniversalChange(e, setBusinessDetails)} 
              errors={errors}
            />
            <div className="page-actions">
              <button onClick={handleCancel} className="cancel-button">Cancel</button>
              <button onClick={handlePageSave} className="submit-button" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Update'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
