import React from "react";
import "./AccountOverview.css";

const AccountOverview = ({ userInfo }) => {
  return (
    <div className="account-overview">
      <h2>Account Overview</h2>
      <div className="detail">
      <div>
        <p><b>Name:</b> {`${userInfo.first_name} ${userInfo.last_name}`}</p>
        <p><b>Email:</b> {userInfo.email}</p>
        <p><b>Phone:</b> {userInfo.phone}</p>
      </div>
      <div>
        <p><b>Address:</b> {userInfo.address}</p>
        <p><b>City: </b>{userInfo.city}</p>
        <p><b>Member Since: </b> {userInfo.username}</p>
      </div>
      </div>
    </div>
  );
};

export default AccountOverview;
