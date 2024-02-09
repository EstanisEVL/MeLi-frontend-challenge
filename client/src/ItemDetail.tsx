import React, { useEffect, useState } from "react";

const ItemDetail = () => {
  const [newQuery, setNewQuery] = useState<string | null>("");
  const [item, setItem] = useState<any>(null);

  const fetchItemDetails = (id: string) => {
    const apiUrl = `/api/items/${id}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.location.href = `/items?search=${newQuery}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewQuery(String(e.target.value.trim().toLowerCase()));
  };

  useEffect(() => {
    const itemId: string = window.location.pathname.split("/items/")[1];

    fetchItemDetails(itemId);
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
      <main className='main'>
        <section className='section'>
          <article className='section__item-article'>
            {item ? (
              <div className='item-article__detail-container'>
                <div className='detail-container__first-div'>
                  <div className='first-div__img-container'>
                    <img src={item.picture} alt={item.item.title} />
                  </div>
                  <div className='first-div__description-container'>
                    <h3>Descripción del producto</h3>
                    <p>{item.description}</p>
                  </div>
                </div>

                <div className='detail-container__second-div'>
                  <div className='second-div__text-container'>
                    <p>
                      <span>
                        {String(item.condition).toLowerCase() === "new"
                          ? "Nuevo"
                          : "Usado"}
                      </span>{" "}
                      - {item.sold_quantity} vendidos
                    </p>
                    <h1>{item.item.title}</h1>
                  </div>
                  <div className='second-div__price-container'>
                    <div className='price-container__amount-paragraph'>
                      <p>
                        {new Intl.NumberFormat("es-AR", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 0,
                        }).format(Math.floor(item.item.price.amount))}{" "}
                      </p>
                    </div>
                    <div className='price-container__decimals-paragraph'>
                      <p>
                        {item.item.price.decimals !== 0
                          ? item.item.price.decimals
                          : "00"}
                      </p>
                    </div>
                  </div>
                  <div className='second-div__button-container'>
                    <button>Comprar</button>
                  </div>
                </div>
              </div>
            ) : null}
          </article>
        </section>
      </main>
    </>
  );
};

export default ItemDetail;
