import React, { useState } from 'react';

const CivilianSearch = () => {
  const [firstNameQuery, setFirstNameQuery] = useState('');
  const [lastNameQuery, setLastNameQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null); // Changed to null since we expect an object
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSearch = () => {
    // Include both first and last name in the search query
    const queryParams = new URLSearchParams({
      first_name: firstNameQuery,
      last_name: lastNameQuery,
    }).toString();

    fetch(`/search-civilian/?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data.civilian_data); // Expecting an object, not an array
        setPopupVisible(true); // Show the popup with the results
      })
      .catch((error) => {
        console.error(error);
        setSearchResult(null); // Reset search result on error
        setPopupVisible(false); // Hide popup on error
      });
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={firstNameQuery}
        onChange={(e) => setFirstNameQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by last name"
        value={lastNameQuery}
        onChange={(e) => setLastNameQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {isPopupVisible && searchResult && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closePopup} className="close-button">
              X
            </button>
            <h2>Search Results:</h2>
            <div>
              <p>
                {searchResult.first_name} {searchResult.last_name} - Date of Birth: {searchResult.date_of_birth}
              </p>
              <div>
                <h3>Citations:</h3>
                <ul>{searchResult.citations.map((c, index) => <li key={index}>{c}</li>)}</ul>
              </div>
              <div>
                <h3>Arrests:</h3>
                <ul>{searchResult.arrests.map((a, index) => <li key={index}>{a}</li>)}</ul>
              </div>
              <div>
                <h3>Warrants:</h3>
                <ul>{searchResult.warrants.map((w, index) => <li key={index}>{w}</li>)}</ul>
              </div>
              <div>
                <h3>Vehicles:</h3>
                <ul>{searchResult.vehicles.map((v, index) => (
                  <li key={index}>{v.make} {v.model} - {v.license_plate}</li>
                ))}</ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && !searchResult && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={closePopup} className="close-button">
              X
            </button>
            <h2>No results found.</h2>
          </div>
        </div>
      )}

      {/* Add your existing style here */}
    </div>
  );
};

export default CivilianSearch;
