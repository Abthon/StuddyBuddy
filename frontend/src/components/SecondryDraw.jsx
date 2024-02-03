import React from "react";
import { useEffect } from "react";
import "../static/SecondryDraw.css";
import useCrud from "../hooks/useCrud";
import { useParams, Link } from "react-router-dom";
import { MEDIA_URL } from "../config";

function SecondryDraw({roomData}) {
    const {ServerId} = useParams();
    const [fetchData, dataCRUD] = useCrud([]);
    const user_id = localStorage.getItem("user_id");

    useEffect(()=> {
      fetchData(`user/select?user_id=${user_id}`)
    }, [])

    useEffect(()=> {
      console.log(roomData, "this is the secondary draw data");
    }, [ServerId])

    useEffect(()=> {
      console.log(dataCRUD, "this is the user data")
    }, [dataCRUD])

  return (
    <section className="secondryDraw">
      <span className="channelHeader">
        {roomData.length > 0 ? <h3>{roomData[ServerId-1].name}</h3> : null}
        <i className="material-icons">keyboard_arrow_down</i>
      </span>
      <ul className="channelContainer">
        {roomData ? (
          roomData.filter(server => server.id == ServerId).map((item) =>
            Array.from(item.channels).map((channel) => (
              <Link key={channel.id} to={`/server/${ServerId}/${channel.id}/`} style={{textDecoration:"none", color:"inherit"}}>
                <ul className="channelItem">
                  <span className="channelDetail">
                    <i className="material-icons">tag</i>
                    <li className="channelName">{channel.name}</li>
                  </span>
                  <i className="material-icons">chevron_right</i>
                </ul>
              </Link>
            ))
          )
        ) : (
          <h3>Loading...</h3>
        )}
      </ul>
      <div className="avatar">
        <div className="avatar-detail">
          <img className="senderAvatar" src={`${MEDIA_URL}${dataCRUD.profile_image}`} alt="" />
          <div className="avatar-detail-wrapper">
            <span className="avatar-name">{dataCRUD.first_name}{" "}{dataCRUD.last_name}</span>
            <span className="avatar-username">@{dataCRUD.username}</span>
          </div>
        </div>
        <Link to="/profile" style={{color: "inherit"}}><i className="material-icons settings">settings</i></Link>
      </div>
    </section>
  );
}

export default SecondryDraw;
