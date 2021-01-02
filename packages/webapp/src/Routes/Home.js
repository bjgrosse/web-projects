import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import AppContext from "AppContext";
import AlbumListItem from "Components/AlbumListItem";
import { Box } from "@web/common/ui";
import AddAlbumButton from "Components/AddAlbumButton";

const SortableItem = SortableElement(({ value, isInEditMode }) => (
  <AlbumListItem album={value} isInEditMode={isInEditMode} />
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
const Home = (props) => {
  const context = useContext(AppContext);
  const albums = context.appState.albums;

  if (albums.length === 0) {
    return <AddAlbumButton />;
  }

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    context.appState.moveAlbum(oldIndex, newIndex);
  };

  const enterEditMode = () => {
    context.appState.setIsInEditMode(true);
  };

  const { isInEditMode } = context.appState;
  console.log({ orders: context.appState.albums.map((x) => x.id) });
  return (
    <div>
      <SortableList
        axis="xy"
        pressDelay={300}
        items={context.appState.albums}
        isInEditMode={isInEditMode}
        onSortEnd={handleSortEnd}
        helperClass="DraggingHelper"
      />
      {!isInEditMode && (
        <Box absolute right topRight onClick={enterEditMode}>
          Edit
        </Box>
      )}
    </div>
  );
};
Home.whyDidYouRender = true;
export default observer(Home);
