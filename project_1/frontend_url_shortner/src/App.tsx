import axios from "axios";
import { useState } from "react";

const App = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenUrl = async () => {
    if (!longUrl) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/shorten",
        { longUrl },
        { headers: { "Content-Type": "application/json" } }
      );

      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>Enter your URL:</p>

      <input
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="border bg-gray-800 text-white p-2 m-2 w-1/2"
        placeholder="https://example.com"
      />

      <button onClick={shortenUrl} className="border p-2 m-1">
        Submit
      </button>

      {shortUrl && (
        <div className="mt-4">
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
