import React, { useState } from "react";
import axios from "axios";

function App() {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlsArray = urls.split(",").map((url) => url.trim());
    try {
      const response = await axios.get("http://localhost:3000/numbers", {
        params: { url: urlsArray },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Number Management Service</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URLs (comma-separated):
          <input
            type="text"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Data</button>
      </form>

      <div>
        <h2>Results:</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;