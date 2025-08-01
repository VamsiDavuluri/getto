// src/UpdateVendor.js
import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './UpdateVendor.css';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ['places'];

// Add `editingVendorId` to the props destructuring
const UpdateVendor = ({ formData, handleChange, handleImageChange, errors, onPlaceSelect, onBack, handleBlur, editingVendorId }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  
  if (loadError) {
    return <div>Error loading maps. Please check the API key and configuration.</div>;
  }

  return (
    <div className="update-vendor-container">
      {/* --- THIS HEADER SECTION IS UPDATED --- */}
      <div className="header">
        <div className="back-button-wrapper">
        <button onClick={onBack} className="back-button" aria-label="Go back">
          ←
        </button>
        </div>
        {/* The h2 now dynamically changes based on editingVendorId */}
        <h2>{editingVendorId ? 'Update Vendor' : 'Add New Vendor'}</h2>
      </div>

      <div className="vendor-form">
        <div className="form-row">
          <div className="form-group">
            <label>Store Name*</label>
            <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} onBlur={handleBlur} className={errors.storeName ? 'input-error' : ''} />
            {errors.storeName && <span className="error-message">{errors.storeName}</span>}
          </div>
          <div className="form-group">
            <label>Owner Name*</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} onBlur={handleBlur} className={errors.ownerName ? 'input-error' : ''} />
            {errors.ownerName && <span className="error-message">{errors.ownerName}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone No.*</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={errors.phone ? 'input-error' : ''} />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Email Address*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={errors.email ? 'input-error' : ''} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Search Location*</label>
            {isLoaded ? (
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={{ componentRestrictions: { country: 'in' } }}>
                <input type="text" name="location" placeholder="Start typing your address..." defaultValue={formData.location} onChange={handleChange} onBlur={handleBlur} className={errors.location ? 'input-error' : ''} />
              </Autocomplete>
            ) : <div>Loading...</div>}
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
        </div>
        <div className="form-group full-width">
          <label>Address*</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} onBlur={handleBlur} className={errors.address ? 'input-error' : ''} readOnly />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} readOnly />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} readOnly />
          </div>
          <div className="form-group">
            <label>PinCode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} readOnly />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Landmark</label>
            <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
          </div>
          <div className="form-group description-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>
      </div>
      </div>
  );
};

export default UpdateVendor;