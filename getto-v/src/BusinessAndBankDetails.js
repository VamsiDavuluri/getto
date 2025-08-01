// src/BusinessAndBankDetails.js
import React from 'react';
import './BusinessAndBankDetails.css';

const BusinessAndBankDetails = ({ details, handleChange, errors, handleBlur }) => {
  return (
    <div className="details-container">
      <div className="details-section">
        <h3>Business Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label>GST*</label>
            <input type="text" name="gst" value={details.gst} onChange={handleChange} onBlur={handleBlur} className={errors.gst ? 'input-error' : ''} />
            {errors.gst && <span className="error-message">{errors.gst}</span>}
          </div>
          <div className="form-group">
            <label>PAN*</label>
            <input type="text" name="pan" value={details.pan} onChange={handleChange} onBlur={handleBlur} className={errors.pan ? 'input-error' : ''} />
            {errors.pan && <span className="error-message">{errors.pan}</span>}
          </div>
          <div className="form-group">
            <label>Commission %*</label>
            <input type="number" name="commission" value={details.commission} onChange={handleChange} onBlur={handleBlur} className={errors.commission ? 'input-error' : ''} />
            {errors.commission && <span className="error-message">{errors.commission}</span>}
          </div>
        </div>
      </div>
      <div className="details-section">
        <h3>Bank Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Bank Name*</label>
            <input type="text" name="bankName" value={details.bankName} onChange={handleChange} onBlur={handleBlur} className={errors.bankName ? 'input-error' : ''} />
            {errors.bankName && <span className="error-message">{errors.bankName}</span>}
          </div>
          <div className="form-group">
            <label>Account Type*</label>
            <select name="accountType" value={details.accountType} onChange={handleChange} onBlur={handleBlur} className={errors.accountType ? 'input-error' : ''}>
              <option value="" disabled>Select Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
            {errors.accountType && <span className="error-message">{errors.accountType}</span>}
          </div>
          <div className="form-group">
            <label>Account Holder Name*</label>
            <input type="text" name="accountHolderName" value={details.accountHolderName} onChange={handleChange} onBlur={handleBlur} className={errors.accountHolderName ? 'input-error' : ''} />
            {errors.accountHolderName && <span className="error-message">{errors.accountHolderName}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Account Number*</label>
            <input type="text" name="accountNumber" value={details.accountNumber} onChange={handleChange} onBlur={handleBlur} className={errors.accountNumber ? 'input-error' : ''} />
            {errors.accountNumber && <span className="error-message">{errors.accountNumber}</span>}
          </div>
          <div className="form-group">
            <label>Re-enter Account Number*</label>
            <input type="text" name="accountNumberConfirm" value={details.accountNumberConfirm} onChange={handleChange} onBlur={handleBlur} className={errors.accountNumberConfirm ? 'input-error' : ''} />
            {errors.accountNumberConfirm && <span className="error-message">{errors.accountNumberConfirm}</span>}
          </div>
          <div className="form-group">
            <label>IFSC Code*</label>
            <input type="text" name="ifscCode" value={details.ifscCode} onChange={handleChange} onBlur={handleBlur} className={errors.ifscCode ? 'input-error' : ''} />
            {errors.ifscCode && <span className="error-message">{errors.ifscCode}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAndBankDetails;