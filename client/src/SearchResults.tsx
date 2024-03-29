import React, { useEffect, useState } from "react";
import { Results } from "../../server/src/interfaces/interfaces.index";

const SearchResults = () => {
  const [query, setQuery] = useState<string | null>("");
  const [newQuery, setNewQuery] = useState<string | null>("");
  const [data, setData] = useState<Results | null>();

  const updateUrl = (newUrlQuery: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("search", newUrlQuery);
    window.history.replaceState(null, "", `?${String(searchParams)}`);
  };

  const fetchData = (fetchQuery: string) => {
    const apiUrl = `/api/items?q=${fetchQuery}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newQuery) {
      fetchData(newQuery);

      updateUrl(newQuery);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuery(String(e.target.value.trim().toLowerCase()));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const existingQuery = searchParams.get("search");

    setQuery(existingQuery);

    if (existingQuery) {
      fetchData(existingQuery);
    }
  }, []);

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
                placeholder='Nunca dejes de buscar'
                onChange={handleChange}
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
      <main className='main'>
        <section className='section'>
          <div className='section__breadcrumb-container'>
            {data &&
              data?.categories?.map((category, index) => {
                return <p key={index}>{category}</p>;
              })}
          </div>
          <article className='section__search-article'>
            {data &&
              data?.items?.map((item: any) => {
                return (
                  <a key={item.id} href={`/items/${item.id}`}>
                    <div className='search-article__result-card'>
                      <div className='result-card__img-container'>
                        <img src={item.picture} alt='' />
                      </div>
                      <div className='result-card__info-container'>
                        <div className='info-container__paragraph'>
                          <p>
                            {new Intl.NumberFormat("es-AR", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 0,
                            }).format(Math.floor(item.price))}{" "}
                          </p>
                          {item.free_shipping ? (
                            <img
                              src='https://i.ibb.co/47dvWL9/ic-shipping.png'
                              alt='truck icon'
                            />
                          ) : null}
                        </div>
                        <h3>{item.title}</h3>
                      </div>
                    </div>
                  </a>
                );
              })}
          </article>
        </section>
      </main>
    </>
  );
};

export default SearchResults;
