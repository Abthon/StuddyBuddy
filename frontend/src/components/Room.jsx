import React, { useState } from "react";
import useCrud from "../hooks/useCrud";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const Room = ({dataCRUD}) => {
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <section className="room">
      <div className="room__head">
        <div className="room__info">
          <h2>Rooms</h2>
          <h3>{dataCRUD.length} {dataCRUD.length <=1 ? "Room" : "Rooms"} available</h3>
        </div>
        <div onClick={()=> setModalStatus(true)} className="room__create-room">
          <i className="material-icons">add</i>
          <span>Create Room</span>
        </div>
          <Modal open={modalStatus} setModalStatus={setModalStatus}/>
      </div>
      <div className="room__card-list">
        <h3>All Rooms</h3>
        {dataCRUD.length > 0 ? dataCRUD?.map((room, index) => (
          <Link key={room.id} to={`/server/${room.id}`} style={{textDecoration: "none", color: "inherit"}}>
            <div className="room__card">
              <div className="room__header">
                <div className="room__host-info">
                  <i className="material-icons">account_circle</i>
                  <span>Host</span>
                  <span className="room__host">{room.owner}</span>
                </div>
                <div className="room__status">
                  <span>{room.days_since_creation}</span>
                </div>
              </div>
              <div className="room__body">
                <span>{room.description}</span>
              </div>
              <hr />
              <div className="room__footer">
                <div className="room__people">
                  <i className="material-icons">group</i>
                  <span className="room__people">{room.member_count} Joined</span>
                </div>
                <div className="room__tag">
                  <span href="#">{room.name}</span>
                </div>
              </div>
            </div>
          </Link>
        )): null}
      </div>
    </section>
  );
}

export default Room;
