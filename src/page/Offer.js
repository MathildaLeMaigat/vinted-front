import "./css-pages/offer.scss";
import { Rings } from "react-loader-spinner";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const price = data.product_price;
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

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

  return isLoading ? (
    <div className="loader-home">
      <Rings type="Puff" color="#2CB1BA" height={120} width={120} />
    </div>
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
              console.log(detail);
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
              <button
                onClick={() => {
                  navigate("/payment", {
                    state: {
                      productName: data.product_name,
                      totalPrice: total,
                      protectionFees: protectionFees,
                      shippingFees: shippingFees,
                      price: data.product_price,
                    },
                  });
                }}
              >
                Acheter
              </button>
            </div>
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
