import React, { useEffect, useState } from "react";
import PrimaryDraw from "./PrimaryDraw";
import SecondryDraw from "./SecondryDraw";
import MainChatArea from "./MainChatArea";
import Members from "./Members";
import "../static/Server.css";
import useCrud from "../hooks/useCrud";
import { useParams } from "react-router-dom";

function Server() {
  const [fetchData, dataCRUD, error, isLoading] = useCrud([]);
  const { ServerId, ChannelId } = useParams();

  useEffect(() => {
    fetchData(`server/select/`);
  }, []);

  useEffect(() => {
    fetchData(`server/select/`);
  }, [ServerId, ChannelId]);

  return (
    <div className="server">
      <PrimaryDraw  roomData={dataCRUD} />
      <SecondryDraw roomData={dataCRUD} />
      <MainChatArea roomData={dataCRUD} />
      <Members/>
    </div>
  );
}

export default Server;
