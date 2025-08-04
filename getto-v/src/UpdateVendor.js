// src/UpdateVendor.js
import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import './UpdateVendor.css';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ['places'];

const UpdateVendor = ({ formData, handleChange, errors, onPlaceSelect, handleBlur, onBack }) => {
  const { isLoaded, loadError } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: GOOGLE_MAPS_API_KEY, libraries });
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autocompleteInstance) => setAutocomplete(autocompleteInstance);
  const onPlaceChanged = () => { if (autocomplete !== null) onPlaceSelect(autocomplete.getPlace()); };

  return (
    <div className="update-vendor-container">
      <div className="form-section-header">
        <div className="title-with-back-btn">
          <button onClick={onBack} className="back-button">←</button>
          <h2>Vendor Details</h2>
        </div>
      </div>

      <div className="vendor-form-grid">
        <div className="form-group">
          <label htmlFor="storeName">Store Name*</label>
          <input id="storeName" type="text" name="storeName" value={formData.storeName} onChange={handleChange} onBlur={handleBlur} className={errors.storeName ? 'input-error' : ''} />
          {errors.storeName && <span className="error-message">{errors.storeName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="ownerName">Owner Name*</label>
          <input id="ownerName" type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} onBlur={handleBlur} className={errors.ownerName ? 'input-error' : ''} />
          {errors.ownerName && <span className="error-message">{errors.ownerName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone No.*</label>
          <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={errors.phone ? 'input-error' : ''} />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address*</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={errors.email ? 'input-error' : ''} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group full-width">
          <label htmlFor="location">Search Location*</label>
          {isLoaded && !loadError ? (
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={{ componentRestrictions: { country: 'in' } }}>
              <input id="location" type="text" placeholder="Start typing address..." defaultValue={formData.location} onBlur={handleBlur} className={errors.location ? 'input-error' : ''} />
            </Autocomplete>
          ) : <div>Loading Maps...</div>}
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>
        <div className="form-group full-width">
          <label htmlFor="address">Address*</label>
          <input id="address" type="text" name="address" value={formData.address} readOnly className={errors.address ? 'input-error' : ''} />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" name="state" value={formData.state} readOnly />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={formData.city} readOnly />
        </div>
        <div className="form-group">
          <label>PinCode</label>
          <input type="text" name="pincode" value={formData.pincode} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="landmark">Landmark</label>
          <input id="landmark" type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
        </div>
      </div>
    </div>
  );
};

export default UpdateVendor;