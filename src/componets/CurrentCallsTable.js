import React, { useState, useEffect } from 'react';

const CurrentCallsTable = () => {
  const [currentCalls, setCurrentCalls] = useState([]);

  useEffect(() => {
    // Fetch current calls from your API
    fetch('http://localhost:8000/api/current_calls/') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCurrentCalls(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {currentCalls.map((call) => (
            <tr key={call.id}>
              <td>{call.id}</td>
              <td>{call.description}</td>
              <td>{new Date(call.time_of_call).toLocaleString()}</td>
              <td>{call.priority}</td>
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
      `}</style>
    </div>
  );
};

export default CurrentCallsTable;