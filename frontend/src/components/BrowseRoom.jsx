import React from "react";
import { useEffect } from "react";
import useCrud from "../hooks/useCrud";
import { MEDIA_URL } from "../config";
import { Link } from "react-router-dom";

const BrowseRoom = () => {
  const [fetchData, dataCRUD, error, isLoading ] = useCrud([]);
  useEffect(() => {
    fetchData("category/select/");
  }, []);

  useEffect(() => {
    console.log(dataCRUD);
  }, [dataCRUD]);

  return (
    <section className="browse-room">
      <h2>Browse room</h2>
      <ul className="room__list">
        {dataCRUD ? (
          dataCRUD.map((item) => (
            <Link
              key={item.id}
              to={`/explore/${item.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="room__item">
                <img src={MEDIA_URL + item.icon}></img>
                <span>{item.name}</span>
              </li>
            </Link>
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </ul>
      <div className="room__detail">
        <span>Load More </span>
        <i className="material-icons">expand_more</i>
      </div>
    </section>
  );
};

export default BrowseRoom;
