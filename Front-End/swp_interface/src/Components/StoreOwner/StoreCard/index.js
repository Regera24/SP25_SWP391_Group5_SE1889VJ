import React from "react";
import './style.scss';
import { Link } from "react-router-dom";

const StoreCard = ({urlStore, storeName, storeStatus, urlImg}) => {
  return (
    <div className="wrapper">
      <div className="product-img">
        <img
          src={urlImg}
          alt="Product"
          height="100%"
          width="100%"
        />
      </div>
      <Link to={urlStore} className="product-link">
        <div className="product-info">
          <div className="product-text">
            <h1>{storeName}</h1>
            <h2>{storeStatus}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoreCard;