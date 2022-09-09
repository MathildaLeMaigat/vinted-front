import "./css-pages/home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";

// Import images
import imageHero from "../assets/hero.09bfd0f9.jpg";
import tag from "../assets/tear.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ data, setData, searchBar, setSearchBar }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [sort, setSort] = useState(false);
  // const [rangeValues, setRangeValues] = useState([0, 10000]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=15&page=${page}&title=${searchBar}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      };
      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [page, searchBar, setData]);

  return isLoading === true ? (
    <div className="loader-home">
      <Rings type="Puff" color="#2CB1BA" height={120} width={120} />
    </div>
  ) : (
    <div>
      <div className="hero">
        <img className="img1" src={imageHero} alt="hero" />
        <div>
          <img className="img2" src={tag} alt="hero1" />
          <div className="bloc-hero">
            <p>Prêts à faire du tri dans vos placards?</p>
            <Link to="/publish">
              <button>Vends maintenant !</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bloc-hero-hidden">
        <p>Prêts à faire du tri dans vos placards?</p>
        <Link to="/publish">
          <button>Vends maintenant !</button>
        </Link>
      </div>
      <p className="howManyOffers">
        Nous avons {data.count} offres à vous proposer !
      </p>
      {/*  */}
      <div className="home-searchBar">
        <input
          className="searchBar"
          type="text"
          placeholder="Recherche des articles"
          value={searchBar}
          onChange={(event) => {
            setSearchBar(event.target.value);
          }}
        />
        <FontAwesomeIcon icon="search" className="home-fa-icone" />
      </div>
      {/*  */}
      <div className="bloc-ad">
        {data.offers.map((offer, product_id) => {
          // console.log(offer._id);
          // console.log(data.count);
          return (
            <Link key={product_id} to={`/offer/${offer._id}`}>
              <div className="ads">
                <img src={offer.product_image.secure_url} alt="offer" />
                <div className="p">
                  <p className="priceOffer">{offer.product_price} €</p>
                  <p>{offer.product_name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>{" "}
      <div className="button-page">
        <button onClick={() => setPage(page - 1)}>← Page précédente</button>
        <button onClick={() => setPage(page + 1)}>Page suivante →</button>
      </div>
    </div>
  );
};

export default Home;
