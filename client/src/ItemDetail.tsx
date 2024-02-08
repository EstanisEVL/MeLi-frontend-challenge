import { useEffect, useState } from "react";

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

  // ARMAR BREADCRUMB CON CATEGORIAS DEL ITEM

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
          <div className='section__breadcrumb-container'>
            {/* {data &&
              data?.categories?.map((category, index) => {
                return <p key={index}>{category}</p>;
              })} */}
          </div>
          <article>
            {item ? (
              <div>
                <div>
                  <img src={item.picture} alt={item.item.title} />
                </div>
                <div>
                  <p>
                    <span>
                      {String(item.condition).toLowerCase() === "new"
                        ? "Nuevo"
                        : "Usado"}
                    </span>{" "}
                    - {item.sold_quantity} vendidos
                  </p>
                  <h1>{item.item.title}</h1>
                  <p>
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 0,
                    }).format(Math.floor(item.item.price.amount))}{" "}
                    <span>{item.item.price.decimals}</span>
                  </p>
                  <div>
                    <button>Comprar</button>
                  </div>
                </div>
                <div>
                  <h3>Descripción del producto</h3>
                  <p>{item.description}</p>
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
