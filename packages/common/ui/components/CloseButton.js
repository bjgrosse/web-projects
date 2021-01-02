import React, { useContext, useState, useEffect } from "react";
import { IconButton } from "theme-ui";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
const CloseButton = ({ topRight, sx, ...props }) => {
  let styles;
  if (topRight) {
    styles = { position: "absolute", top: 0, right: 0 };
  }

  sx = { ...styles, ...sx };
  return (
    <IconButton {...props} sx={sx}>
      <CloseIcon />
    </IconButton>
  );
};
export default CloseButton;
