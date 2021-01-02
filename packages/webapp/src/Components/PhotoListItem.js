import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { LoadingContainer, Box, CloseButton } from "@web/common/ui";
import { AspectRatio } from "theme-ui";

const PhotoListItem = observer(({ photo, isInEditMode }) => {
  const [isDragging, setDragging] = useState(false);

  return (
    // <AspectRatio AspectRatio={4 / 3}>
    <Box
      fullWidth
      relative
      sx={{
        overflow: "hidden",
        flexBasis: ["100%", "50%", "33%"],
      }}
    >
      <Box
        fullWidth
        sx={{
          paddingTop: "75%",
        }}
      >
        <Box absolute full>
          <img style={{ width: "100%", height: "auto" }} src={photo.url} />
        </Box>
        {isInEditMode && (
          <CloseButton
            topRight
            color="primary.dark"
            sx={{ top: "-5px", right: "-5px", bg: "whiteAlpha.60" }}
          />
        )}
      </Box>
    </Box>
    // </AspectRatio>
  );
});

export default PhotoListItem;
