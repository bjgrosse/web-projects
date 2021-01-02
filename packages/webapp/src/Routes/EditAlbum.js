import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react";
import AddPhotosButton from "Components/AddPhotosButton";
import AppContext from "AppContext";
import { Box, useSafeHandler, LoadingContainer } from "@web/common/ui";

const Photo = observer(({ photo }) => {
  return (
    <Box>
      <LoadingContainer isLoading={photo.isLoading}>
        <img src={photo.src} />
      </LoadingContainer>
    </Box>
  );
});

const EditAlbum = observer(({ id }) => {
  const context = useContext(AppContext);
  const [album, setAlbum] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setAlbum(context.appState.createNewAlbum());
    } else {
      context.appState.getAlbum(id).then((album) => setAlbum(album));
    }
  }, []);

  useEffect(() => {
    if (album) {
      setIsLoading(false);
    }
  }, [album]);

  const handleFileChange = useSafeHandler("warn", (e) => {
    let files = Array.from(e.target.files);
    const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];

    files = files.filter((x) => acceptedTypes.includes(x.type));
    album.addFromFiles(files);
  });
  return (
    <Box>
      <LoadingContainer isLoading={isLoading}>
        {album && album.photos.map((x) => <Photo photo={x} />)}
        <AddPhotosButton onChange={handleFileChange} />
      </LoadingContainer>
    </Box>
  );
});
export default EditAlbum;
