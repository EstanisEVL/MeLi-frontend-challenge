import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/items?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(String(e.target.value.trim().toLowerCase()));
  };

  return (
    <header>
      <nav>
        <div>
          <img src='' alt='Mercado Libre logo' />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='query'
              onChange={handleChange}
              placeholder='Nunca dejes de buscar'
            />
            <button type='submit'>Buscar</button>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default App;
