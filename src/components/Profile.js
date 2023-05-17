import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const history = useHistory();
  const [profileData, setProfileData] = useState({});
  const getToken = localStorage.getItem("accessToken");
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setProfileData(response.data.data);
    } catch (error) {
      alert(error.response.data.errors[0].message);
    }
  };
  const logoutHandler = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <>
      <ul className="profile_details">
        <li>
          <strong>{profileData.name}</strong>
        </li>
        <li>
          <span>{profileData.email}</span>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </>
  );
};

export default Profile;
