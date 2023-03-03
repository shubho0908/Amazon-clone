import { React, useEffect, useState } from "react";
import "./deals.css";
import Add from "../imgs/heart.png";
import Added from "../imgs/red-heart.png";
import rating from "../imgs/rating.png";
import { useSelector } from "react-redux";
import { app } from "../Firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore(app);

function Deals() {
  const [AllProducts, setAllProducts] = useState([]);
  const [AddedIds, setAddedIds] = useState([]);
  const [Database, setDatabase] = useState([]);

  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);

  useEffect(() => {
    const GetProducts = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const new_data = await data.json();
      setAllProducts(new_data);
      // Add a review number property to each item object
      const productsWithReviewNumber = new_data.map((item) => ({
        ...item,
        reviewNumber: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
      }));
      setAllProducts(productsWithReviewNumber);
    };

    const loadData = async () => {
      const querySnapshot = await getDocs(collection(db, "Wishlists"));
      const data = querySnapshot.docs.filter(doc => doc.data().item).map(doc => doc.data().item);

      setDatabase(data);
    };

    loadData();
    GetProducts();
  }, []);

  useEffect(() => {
    // Update the added ids whenever the list items change
    const ids = ListItems.map((item) => item.id);
    setAddedIds(ids);
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  const AddData = async (item) => {
    try {
      const docRef = await addDoc(collection(db, "Wishlists"), {
        item,
      });
      const data = { ...item, id: docRef.id };
      setDatabase([...Database, data]);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="Deals">
      <p className="deals-head">Hot Deals 🔥</p>
      <div className="deal-items">
        {AllProducts &&
          AllProducts.map((items) => {
            return (
              <div className="card" key={items.id}>
                <div className="card-img-data">
                  <img src={items.image} className="card-img" />
                  <img
                    onClick={() => {
                      if (!isAdded(items.id)) {
                        AddData(items);
                      } else {
                      }
                    }}
                    src={

                      Database.find((data) => data.image === items.image)
                        ? Added
                        : Add
                    }
                    className="add-list"
                  />

                  <button className="view">View product</button>
                </div>
                <div className="card-data">
                  <p className="card-title">
                    {items.title.length >= 32
                      ? items.title.slice(0, 32) + ".."
                      : items.title}
                  </p>
                  <div className="category-rating">
                    <p className="card-category">{items.category}</p>
                    <div className="rating">
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <img src={rating} className="rating-img" />
                      <p className="rating-text">
                        {"5 " + "(" + items.reviewNumber + " reviews)"}
                      </p>
                    </div>
                  </div>
                  <div className="card-price">
                    <p className="discount">${items.price}</p>
                    <p className="mrp">${Math.round(items.price * 1.66)}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

    </div>
    
  );
}

export default Deals;
