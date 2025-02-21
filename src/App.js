import React, { useState } from "react";

function App() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const res = await fetch("https://fastapi-qtie.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: inputData.split(",") }) // Convert input to array
      });

      if (!res.ok) {
        throw new Error("Server error or invalid JSON");
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ status: "error", message: "Invalid JSON format or API error" });
    }
  };

  return (
    <div>
      <h2>FastAPI & React App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter comma-separated values"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default App;
