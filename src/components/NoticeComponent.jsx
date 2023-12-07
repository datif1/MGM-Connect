import React from "react";
import "../Sass/NoticeComponent.scss";
import NoticeStatus from "./common/NoticeUpdate";

export default function HomeComponent({ currentUser }) {
  return (
    <div className="home-component">
      <NoticeStatus currentUser={currentUser} />
    </div>
  );
}