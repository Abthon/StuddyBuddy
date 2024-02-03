import React, { useEffect } from "react";
import "../static/Members.css";
import useCrud from "../hooks/useCrud";
import { useParams } from "react-router-dom";
import { MEDIA_URL } from "../config";

function Members() {
  const [fetchData, dataCRUD] = useCrud([]);
  const [searchVal, setSearchVal] = React.useState("");
  const { ServerId } = useParams();
  const handleInput = (e) => {
    setSearchVal(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  useEffect(() => {
    fetchData(`server/select?server_id=${ServerId}&with_member=true`);
  }, []);

  useEffect(() => {
    console.log(dataCRUD, "Members data");
  }, [dataCRUD]);

  return (
    <div className="members">
      <div className="input-wrap">
        <i className="material-icons">search</i>
        <label for="product-search" id="input-label">
          Search Members
        </label>
        <input
          onChange={handleInput}
          value={searchVal}
          type="text"
          name="product-search"
          id="product-search"
          placeholder="Search Members"
        />
        <i onClick={handleClearBtn} className="material-icons">close</i>
      </div>

      <span className="memberCount">Members</span>
      {dataCRUD[0]?.member.map((user, index) => {
        return (
          <div className="memberItem">
            <img
              className="senderAvatar"
              src={`${MEDIA_URL}${user.profile_image}`}
              alt=""
            />
            <span>{user.username}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Members;
