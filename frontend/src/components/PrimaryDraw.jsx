import React from "react";
import useCrud from "../hooks/useCrud";
import { useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import { MEDIA_URL } from "../config";
import "../static/PrimaryDraw.css";


function PrimaryDraw({roomData}) {
  const { ServerId } = useParams();
  return (
    <section className="primaryDraw">
        {roomData ? (
          roomData.map((item, index) => (
            ServerId == item.id? (
            <Link key={item.id} to={`/server/${item.id}`}>
                <div className="indicator">
                    <ul className="serverContainer">
                        <li className="serverItem">
                          <img className="serverIcon" src={MEDIA_URL + item.icon}></img>
                        </li>
                    </ul>
                </div>
            </Link>
            ): (
                <Link key={item.id} to={`/server/${item.id}`}>
                    <ul className="serverContainer inactive">
                        <li key={item.id} className="serverItem">
                          <img className="serverIcon" src={MEDIA_URL + item.icon}></img>
                        </li>
                    </ul>
                </Link>
            )
          ))
        ) : (
          <h3>Loading...</h3>
        )}
    </section>
  );
}

export default PrimaryDraw;
