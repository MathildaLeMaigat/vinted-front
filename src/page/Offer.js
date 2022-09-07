import "./css-pages/offer.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchOffer = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchOffer();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [id]);

  return isLoading === true ? (
    <div>Loading...</div>
  ) : (
    <div className="main-bloc-offer">
      <div className="bloc-offer">
        <div className="left-bloc">
          <img src={data.product_image.secure_url} alt="img" />
        </div>

        <div className="right-bloc">
          <div className="top-part-right">
            <p className="price-offer">{data.product_price} €</p>
            {data.product_details.map((detail, index) => {
              const keyName = Object.keys(detail);
              console.log(keyName[0]);
              return (
                <div key={index} className="offer-list">
                  <span>{keyName[0]}</span>
                  <span>{detail[keyName[0]]}</span>
                </div>
              );
            })}
          </div>

          <div className="bottom-part-right">
            <div>
              <p className="name">{data.product_name}</p>
              <p className="description">{data.product_description}</p>
            </div>
            <div className="pay-button">
              <Link
                to="/payment"
                state={{ title: data.product_name, price: data.product_price }}
              >
                <button>Acheter</button>
              </Link>
            </div>
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
