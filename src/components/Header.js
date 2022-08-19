import "../components/header.scss";

import { Link } from "react-router-dom";
import logo from "../assets/download.png";
import Cookies from "js-cookie";
// import { useState } from "react";

// import PriceRange from "./components/PriceRange";

const Header = ({ handleToken, userToken, searchBar, setSearchBar }) => {
  // const [sort, setSort] = useState(false);
  // const [rangeValues, setRangeValues] = useState([0, 10000]);

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <div>
        <input
          className="searchBar"
          type="search"
          placeholder="Recherche des articles"
          value={searchBar}
          onChange={(event) => {
            setSearchBar(event.target.value);
          }}
        ></input>
      </div>
      {!userToken ? (
        <>
          <div className="right-bloc-header">
            <Link to="/signup">
              <button className="log">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="log">Se connecter</button>
            </Link>
            <Link to="/publish">
              <button className="sell-articles">Vends tes articles</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <button
            className="disconnect"
            onClick={() => {
              Cookies.remove("token");
              handleToken();
            }}
          >
            Deconnexion
          </button>
          <Link to="/publish">
            <button className="sell-articles">Vends tes articles</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
