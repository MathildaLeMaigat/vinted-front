import "./css-pages/home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imageHero from "../assets/hero.09bfd0f9.jpg";
import tag from "../assets/tear.svg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, []);

  return isLoading === true ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="hero">
        <img className="img1" src={imageHero} alt="hero" />
        <img className="img2" src={tag} alt="hero1" />
        <article className="bloc-hero">
          <p>Prêts à faire du tri dans vos placards?</p>
          <button>Vends maintenant</button>
        </article>
      </div>
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
      </div>
    </div>
  );
};

export default Home;
