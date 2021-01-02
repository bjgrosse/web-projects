import { types, flow, applySnapshot, getParentOfType } from "mobx-state-tree";
import updateWithData from "@web/common/utilities/updateWithData";
import db from "Database";
import AlbumModel from "./AlbumModel";
import arrayMove from "array-move";

const PhotoModel = types
  .model("PhotoModel", {
    id: types.maybe(types.string),
    isLoading: false,
    binaryData: types.maybe(types.string),
    error: types.maybe(types.string),
    progress: types.maybe(types.number),
    url: types.maybeNull(types.string),
    displayIndex: 0,
    isUploading: false,
  })
  .actions((self) => {
    function afterCreate() {
      if (!self.id) {
        self.id = db.getNewId();
      } else {
        self.isLoading = true;

        // localDb.photos.get(self.id).then(record => {
        //   if (record) {
        //     self.updateModel({
        //       isLoading: false,
        //       binaryData: "data:image/jpeg;base64," + btoa(record.data)
        //     });
        //   }
        // });
      }
    }

    const getAlbum = () => getParentOfType(self, AlbumModel);

    const loadFromFile = flow(function* (file) {
      const { id: albumId } = getAlbum();
      self.isUploading = true;

      const onProgress = (progress) => (self.uploadProgress = progress);

      try {
        const downloadUrl = yield db.uploadPhotoFromFile(
          albumId,
          self.id,
          file,
          onProgress
        );

        self.updateModel({
          isLoading: false,
          isUploading: false,
          url: downloadUrl,
          failed: false,
          uploadProgress: 1,
        });
      } catch (error) {
        self.updateModel({
          isLoading: false,
          isUploading: false,
          failed: true,
          uploadProgress: 0,
          error: error.message,
        });
      }
    });

    const updateModel = (data) => {
      updateWithData(self, data);
    };

    const setDisplayIndex = (index) => {
      const { id: albumId } = getAlbum();
      self.displayIndex = index;
      db.savePhoto(self.id, albumId, {
        id: self.id,
        url: self.url || null,
        displayIndex: index,
      });
    };

    return { afterCreate, loadFromFile, updateModel, setDisplayIndex };
  })
  .views((self) => ({
    get src() {
      if (self.binaryData) {
        return self.binaryData;
      } else if (self.isUploaded) {
        //TODO return live URL
      }
    },
  }));

export default PhotoModel;
