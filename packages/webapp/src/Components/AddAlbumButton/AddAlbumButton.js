import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
const AddAlbumButton = (props) => {
  return <Link to="/edit">Add new album</Link>;
};

export default AddAlbumButton;
