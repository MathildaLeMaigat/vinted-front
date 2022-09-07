import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

// import des pages
import Home from "./page/Home";
import Offer from "./page/Offer";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Header from "./components/Header";
import Publish from "./page/Publish";
import Payment from "./page/Payment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [data, setData] = useState(null);

  const [searchBar, setSearchBar] = useState("");
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchBar}&priceMin=${
          fetchRangeValues[0]
        }&priceMax=${fetchRangeValues[1]}&sort=${
          sortPrice ? "price-desc" : "price-asc"
        }`
      );
      setData(response.data);
      // console.log(response.data);
    };
    fetchData();
  }, [searchBar, fetchRangeValues, sortPrice]);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header
          handleToken={handleToken}
          userToken={userToken}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          setFetchRangeValues={setFetchRangeValues}
          fetchRangeValues={fetchRangeValues}
          sortPrice={sortPrice}
          setSortPrice={setSortPrice}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchBar={searchBar}
                setSearchBar={setSearchBar}
                data={data}
                setData={setData}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<SignUp handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish token={userToken} />} />
          <Route path="/payment" element={<Payment token={userToken} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
