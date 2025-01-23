import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import AccountOverview from './AccountOverview';
import './UserProfile.css'; // Ensure this file is imported
import api from '../../api';

const UserProfile = () => {

  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(function(){
    setLoading(true)
    api.get("user_info")
    .then(res => {
      console.log(res.data)
      setUserInfo(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  }, [])

  return (
    <div className="user-profile-container">
      <ProfileCard userInfo={userInfo} />
      <AccountOverview userInfo={userInfo} />
    </div>
  );
};

export default UserProfile;
