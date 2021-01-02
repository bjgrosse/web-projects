import React, { useContext, useState, useEffect } from "react";

import { observer } from "mobx-react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { useParams } from "react-router-dom";
import { Box, LoadingContainer, useSafeHandler } from "@web/common/ui";
import PhotoListItem from "Components/PhotoListItem";
import AddPhotosButton from "Components/AddPhotosButton";
import AppContext from "AppContext";

const SortableItem = SortableElement(({ value, isInEditMode }) => (
  <PhotoListItem photo={value} isInEditMode={isInEditMode} />
));

const SortableList = SortableContainer(
  observer(({ items, isInEditMode }) => {
    return (
      <Box flex wrap>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value}`}
            index={index}
            value={value}
            isInEditMode={isInEditMode}
          />
        ))}
      </Box>
    );
  })
);
const Album = observer(() => {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const enterEditMode = () => {
    context.appState.setIsInEditMode(true);
  };

  const { isInEditMode } = context.appState;

  useEffect(() => {
    if (!id) {
      context.appState.createNewAlbum();
      setIsLoading(false);
    } else {
      context.appState
        .getAlbum(id)
        .then((album) => {
          setAlbum(album);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    album.movePhoto(oldIndex, newIndex);
  };

  const handleFileChange = useSafeHandler("warn", (e) => {
    let files = Array.from(e.target.files);
    const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];

    files = files.filter((x) => acceptedTypes.includes(x.type));
    album.addFromFiles(files);
  });

  // If we're adding a new album
  if (isInEditMode) {
    return (
      <LoadingContainer isLoading={isLoading}>
        {!isLoading && (
          <div>
            <SortableList
              axis="xy"
              pressDelay={300}
              items={album.photos}
              isInEditMode={isInEditMode}
              onSortEnd={handleSortEnd}
              helperClass="DraggingHelper"
            />

            <AddPhotosButton onChange={handleFileChange} />

            {!isInEditMode && (
              <Box absolute right topRight onClick={enterEditMode}>
                Edit
              </Box>
            )}
          </div>
        )}
      </LoadingContainer>
    );
  } else {
    return (
      <div>
        album{" "}
        {!isInEditMode && (
          <Box absolute right topRight onClick={enterEditMode}>
            Edit
          </Box>
        )}
      </div>
    );
  }
});

export default Album;
