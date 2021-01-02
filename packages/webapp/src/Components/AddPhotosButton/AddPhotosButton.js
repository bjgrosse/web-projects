import React, { useContext, useState, useEffect } from "react";

const AddPhotosButton = (props) => {
  return (
    <div>
      <label htmlFor="multi" tabIndex={0}>
        Add photos
      </label>
      <input
        accept="image/jpeg,image/png,image/gif"
        style={{ visibility: "hidden" }}
        type="file"
        id="multi"
        onChange={props.onChange}
        multiple
      />
    </div>
  );
};
export default AddPhotosButton;
