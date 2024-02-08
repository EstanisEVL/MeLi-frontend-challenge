import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.location.href = `/items?search=${query}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(String(e.target.value.trim().toLowerCase()));
  };

  return (
    <>
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
      <main></main>
    </>
  );
}

export default App;
