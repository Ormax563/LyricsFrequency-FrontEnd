import React from "react";

const Menu = () => {
  return (
    <div className="topnav">
        <a className="active" href="/">Top Artists</a>
        <a href="/dashboard">Search by artist</a>
        <a href="/github">Github repo</a>
    </div>
  );
}
export {
    Menu
  };
