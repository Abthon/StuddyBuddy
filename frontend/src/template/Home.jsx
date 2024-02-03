import { useEffect, useState } from "react";
import useCrud from "../hooks/useCrud";
import "../static/Home.css"; 
import Header from "../components/Header";
import BrowseRoom from "../components/BrowseRoom";
import Room from "../components/Room";
import {useParams} from "react-router-dom";

const Home = () => {
  const [fetchData, dataCRUD, error, isLoading] = useCrud([])
  const [rooms, setRooms] = useState([])
  const {ServerName}= useParams()

  useEffect(()=>{
    if(!ServerName){
      fetchData("server/select?with_member=true");
    }
  }, [])


  useEffect(()=>{
    fetchData(`server/select?with_member=true&category=${ServerName}`)
  },[ServerName])

  useEffect(()=> {
    setRooms(dataCRUD);
  }, [dataCRUD])
  
  return (
    <div>
      <Header setRooms={setRooms}/>
      <main className="body">
        <BrowseRoom/>
        <Room dataCRUD={rooms}/>
        {/* Recent Activity component */}
        <section className="recent-activity">
          <div className="recent-activity__heading">
            <h2>Recent Activity</h2>
          </div>
          <div className="recent-activity__body">No Recent activities</div>
        </section>
      </main>
    </div>
  );
}

export default Home;
