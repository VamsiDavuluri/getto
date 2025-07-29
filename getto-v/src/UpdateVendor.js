
// src/UpdateVendor.js
import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './UpdateVendor.css';

// IMPORTANT: Replace this with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyDV_enuaHK6dGFGszfOyVfILcG8zt1cPCw";

const libraries = ['places'];

// CORRECTED: Added 'onBack' to the list of props
const UpdateVendor = ({ formData, handleChange, handleImageChange, imagePreview, errors, onPlaceSelect, onBack }) => {
  const { isLoaded } = useJsApiLoader({
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

  return (
    <div className="update-vendor-container">
      <div className="header">
        <button onClick={onBack} className="back-button">&larr;</button>
        <h2>Add New Vendor</h2>
      </div>
      <div className="vendor-form">
        <div className="form-row">
          <div className="form-group">
            <label>Store Name*</label>
            <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} autoComplete="organization" />
            {errors.storeName && <span className="error-message">{errors.storeName}</span>}
          </div>
          <div className="form-group">
            <label>Owner Name*</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} autoComplete="name" />
            {errors.ownerName && <span className="error-message">{errors.ownerName}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone No.*</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Email Address*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Search Location*</label>
            {isLoaded ? (
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={{ componentRestrictions: { country: 'in' } }}>
                <input type="text" name="location" placeholder="Start typing your address..." value={formData.location} onChange={handleChange} style={{ width: '100%' }} />
              </Autocomplete>
            ) : <div>Loading...</div>}
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
        </div>
        <div className="form-group full-width">
          <label>Address*</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} autoComplete="street-address" readOnly />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} autoComplete="address-level1" readOnly />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} autoComplete="address-level2" readOnly />
          </div>
          <div className="form-group">
            <label>PinCode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} autoComplete="postal-code" readOnly />
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
