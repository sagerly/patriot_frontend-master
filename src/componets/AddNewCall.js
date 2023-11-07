import React, { useState } from 'react';

const AddNewCall = () => {
  const [isNewCallPopupVisible, setNewCallPopupVisible] = useState(true); // Form pops up immediately
  const [callType, setCallType] = useState('');
  const [description, setDescription] = useState('');
  const [assignedOfficers, setAssignedOfficers] = useState([]);

  const closeNewCallPopup = () => {
    setNewCallPopupVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your API endpoint and adjust the body as needed for your backend
    fetch('http://localhost:8000/api/current_calls/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        call_type: callType,
        description: description,
        assigned_officers: assignedOfficers,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      closeNewCallPopup();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      {isNewCallPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closeNewCallPopup} className="close-button">
              X
            </button>
            <h2>Add New Call:</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Call Type"
                value={callType}
                onChange={(e) => setCallType(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <select
                multiple
                value={assignedOfficers}
                onChange={(e) => setAssignedOfficers([...e.target.selectedOptions].map(o => o.value))}
              >
                {/* Options should be generated based on available officers. Example: */}
                <option value="1">Officer 1</option>
                <option value="2">Officer 2</option>
                {/* ... other options ... */}
              </select>
              <button type="submit">Create Call</button>
            </form>
          </div>
        </div>
      )}
      {/* ... existing styles ... */}
    </div>
  );
};

export default AddNewCall;
