import React, { useEffect, useState } from "react";
import useCrud from "../hooks/useCrud";

function Header({setRooms}) {
  const [fetchData, dataCRUD, error, isLoading] = useCrud([])
  const [searchValue, setSearchValue] = useState("")

  const filterRooms = (e)=> {
    e.preventDefault()
    fetchData(`server/filter/?search=${searchValue}`)
    setSearchValue("")
  }

  useEffect(()=> {
    setRooms(dataCRUD);
  }, [dataCRUD])


  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__left">
          <i className="material-icons nav__logo">mark_unread_chat_alt</i>
          <h1 className="nav__title">StuddyBuddy</h1>
            <form className="nav__search" onSubmit={(e)=>filterRooms(e)}>
              <i onClick={(e)=> filterRooms(e)} className="material-icons" style={{cursor: "pointer"}}>search</i>
              <input type="search" placeholder="Search Rooms" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}/>
            </form>
        </div>
        <div className="nav__right">
          <i className="material-icons nav__avatar">account_circle</i>
          <div className="nav__account-info">
            <span className="nav__name">Abenezer</span>
            <span className="nav__username">@Abthon</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
