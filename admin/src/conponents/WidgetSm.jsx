import React, { useEffect, useState } from 'react'
import './css/widgetSm.css'
import { userRequest } from '../../requestMethods'
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";


const WidgetSm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch { }
    };
    getUsers();
  }, []);


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <div className='widgetSmUserContainer'>
              <img
                src={
                  user.avatar ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
            </div>
            <Link to={"/users/" + user.id} className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </Link>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default WidgetSm
