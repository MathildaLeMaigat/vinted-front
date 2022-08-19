import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// import des pages
import Home from "./page/Home";
import Offer from "./page/Offer";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Header from "./components/Header";
import Publish from "./page/Publish";
import Payment from "./page/Payment";
import axios from "axios";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [data, setData] = useState(null);

  const [searchBar, setSearchBar] = useState("");
  // const [sort, setSort] = useState(false);
  // const [rangeValues, setRangeValues] = useState([0, 10000]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-api-serveur.herokuapp.com/offers?title=${searchBar}`
      );
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [searchBar]);

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
          data={data}
          setData={setData}
        />
        <Routes>
          <Route
            path="/"
            element={<Home searchBar={searchBar} setSearchBar={setSearchBar} />}
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
