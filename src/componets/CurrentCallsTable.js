import React, { useState, useEffect } from 'react';

const CurrentCallsTable = () => {
  const [currentCalls, setCurrentCalls] = useState([]);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = () => {
    fetch('http://localhost:8000/api/current_calls/') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCurrentCalls(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const deleteCall = (callId) => {
    fetch(`http://localhost:8000/api/current_calls/${callId}/`, { // Replace with your API endpoint
      method: 'DELETE',
    })
    .then((response) => {
      if (response.ok) {
        // Call was successfully deleted from the backend, now remove it from the state
        setCurrentCalls(currentCalls.filter((call) => call.id !== callId));
      } else {
        // Handle any errors here
        console.error('Failed to delete the call');
      }
    })
    .catch((error) => console.error('Error deleting call:', error));
  };

  return (
    <div className="container">
      <h1>Current Calls</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Time of Call</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCalls.map((call) => (
            <tr key={call.id}>
              <td>{call.id}</td>
              <td>{call.description}</td>
              <td>{new Date(call.time_of_call).toLocaleString()}</td>
              <td>{call.priority}</td>
              <td>
                <button onClick={() => deleteCall(call.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          margin: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        button {
          background-color: #f44336; /* Red */
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </div>
  );
};

export default CurrentCallsTable;
