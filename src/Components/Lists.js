import { React, useState, useEffect } from "react";
import { app } from "../Firebase";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Added from "../imgs/red-heart.png";
import rating from "../imgs/rating.png";
import "./lists.css";

function Lists() {
  const [Database, setDatabase] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);

    const loadData = () => {
      getDocs(collection(db, "Wishlists"))
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data().item,
          }));
          setDatabase(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const GetData = async () => {
      const querySnapshot = await getDocs(collection(db, "Wishlists"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
      });
    };

    loadData();
    GetData();
  }, []);

  const handleDelete = (id) => {
    const db = getFirestore(app);

    deleteDoc(doc(db, "Wishlists", id.toString()))
      .then(() => {
        setDatabase((prevDatabase) =>
          prevDatabase.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="lists">
        <div className="lists-items">
          {Database &&
            Database.map((items) => {
              return (
                <div className="card" key={items.id}>
                  <div className="card-img-data">
                    <img src={items.image} className="card-img" />
                    <img
                      onClick={async () => {
                        const db = getFirestore(app);

                        const querySnapshot = await getDocs(
                          collection(db, "Wishlists")
                        );
                        querySnapshot.forEach((doc) => {
                          console.log(doc.id);
                          handleDelete(doc.id);
                        });
                      }}
                      src={Added}
                      className="add-list2"
                    />

                    <button className="view2">View product</button>
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
                        <p className="rating-text">5</p>
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
    </>
  );
}

export default Lists;
