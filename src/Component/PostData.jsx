import React, { useState } from 'react';
import './PostData.css'; 


function PostDataToApi() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://chimpu.xyz/api/post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phonenumber: phoneNumber })
      });

      // Extracting data from headers
      const headersData = Object.fromEntries(response.headers.entries());

      // Printing data received in headers
      console.log('Data received in headers:', headersData);

      // Setting response data to state for rendering
      setResponseData(headersData);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Post Data to API</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>Error: {error}</p>}
      {responseData && (
        <div>
          <h2>Data received in headers:</h2>
          <ul>
            {Object.entries(responseData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostDataToApi;
