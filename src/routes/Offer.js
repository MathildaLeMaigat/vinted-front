import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div className="bloc-offer">
      <div className="left-bloc">
        {" "}
        <img
          style={{ height: "150px" }}
          src={data.product_image.secure_url}
          alt="img"
        />
      </div>
      <div className="right-bloc">
        <h2>{data.product_name}</h2>
        {data.product_details.map((detail, index) => {
          const keyName = Object.keys(detail);
          // console.log(keyName[0]);
          return (
            <div key={index}>
              <span>{keyName[0]}</span>
              <span> {detail[keyName[0]]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offer;
