import "../components/header.scss";

import { Link } from "react-router-dom";
import logo from "../assets/download.png";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import PriceRange from "./PriceRange";
// import { useState } from "react";

// import PriceRange from "./components/PriceRange";

const Header = ({
  handleToken,
  userToken,
  searchBar,
  setSearchBar,
  sortPrice,
  setSortPrice,
  fetchRangeValues,
  setFetchRangeValues,
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  // console.log("loc", location);
  // console.log(userToken);
  return (
    <div className="header">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="search-container">
        <input
          className="searchBar"
          type="text"
          placeholder="Recherche des articles"
          value={searchBar}
          onChange={(event) => {
            setSearchBar(event.target.value);
          }}
        />

        <FontAwesomeIcon icon="search" className="fa-icone" />
        {location.pathname === "/" ? (
          <div className="trie">
            <span style={{ marginRight: 15 }}>Trier par prix : </span>

            <button
              className="trie-button"
              onClick={() => {
                setSortPrice(!sortPrice);
              }}
            >
              <span>{sortPrice ? "⇣" : "⇡"}</span>
            </button>
            <span style={{ marginLeft: 15, marginRight: 15 }}>
              Prix entre :
            </span>
            <PriceRange setFetchRangeValues={setFetchRangeValues} />
          </div>
        ) : null}
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
          <Link to="/publish">
            <button className="sell-articles">Vends tes articles</button>
          </Link>{" "}
          <button
            className="disconnect"
            onClick={() => {
              Cookies.remove("token");
              handleToken();
            }}
          >
            Deconnexion
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
