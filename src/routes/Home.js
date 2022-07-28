import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      {data.offers.map((offer, product_id) => {
        // console.log(offer._id);
        return (
          <Link key={product_id} to={`/offer/${offer._id}`}>
            <h2>{offer.product_name}</h2>
            <img
              style={{ height: "150px" }}
              src={offer.product_image.secure_url}
              alt="offer"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
