import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon/piplup");
        if (!resp.ok) {
          throw new Error(`HTTP request failed: ${resp.status}`);
        }
        const data = await resp.json();
        console.log(data);
        setData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return `Error: ${error}`;
  }

  if (isLoading) {
    return "loading...";
  }

  return (
    <>
      <h1>{data.species.name}</h1>
      <p>
        {data.species.name} is a {data.types[0].type.name} type
      </p>
    </>
  );
}

export default App;
