import "./css-pages/home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import images
import imageHero from "../assets/hero.09bfd0f9.jpg";
import tag from "../assets/tear.svg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=15&page=${page}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [page]);

  return isLoading === true ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="hero">
        <img className="img1" src={imageHero} alt="hero" />
        <div>
          <img className="img2" src={tag} alt="hero1" />
          <span className="bloc-hero">
            <p>Prêts à faire du tri dans vos placards?</p>
            <button>Vends maintenant</button>
          </span>
        </div>
      </div>{" "}
      <p className="howManyOffers">
        Nous avons {data.count} offres à vous proposer !
      </p>
      <div className="bloc-ad">
        {data.offers.map((offer, product_id) => {
          // console.log(offer._id);
          return (
            <Link key={product_id} to={`/offer/${offer._id}`}>
              <div className="ads">
                <img src={offer.product_image.secure_url} alt="offer" />
                <div className="p">
                  <p>{offer.product_price} €</p>
                  <p>{offer.product_name}</p>
                </div>
              </div>
            </Link>
          );
        })}
        <div className="button-page">
          <button onClick={() => setPage(page - 1)}>Page précédente</button>
          <button onClick={() => setPage(page + 1)}>Page suivante</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
