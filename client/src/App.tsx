import React, { useState } from "react";

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
      <header className='header'>
        <nav className='header__nav'>
          <a href='/'>
            <div className='nav__brand'>
              <img
                src='https://i.ibb.co/pvtZW0Z/Logo-ML.png'
                alt='Mercado Libre logo'
              />
            </div>
          </a>
          <div className='nav__search'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                name='query'
                onChange={handleChange}
                placeholder='Nunca dejes de buscar'
              />
              <button type='submit'>
                <img
                  src='https://i.ibb.co/WyVgHZj/ic-Search.png'
                  alt='search icon'
                />
              </button>
            </form>
          </div>
        </nav>
      </header>
      <main className='main'></main>
    </>
  );
}

export default App;
