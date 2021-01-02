import { types, flow, applySnapshot, getParentOfType } from "mobx-state-tree";
import updateWithData from "@web/common/utilities/updateWithData";
import db from "Database";
import PhotoModel from "./PhotoModel";
import arrayMove from "array-move";

export const AlbumModel = types
  .model("AlbumModel", {
    id: types.string,
    displayIndex: 0,
    photos: types.array(PhotoModel),
    isNew: false,
  })
  .actions((self) => {
    function afterCreate() {}

    const load = flow(function* () {
      updateModel(yield db.getAlbum(self.id, self.updateModel));
    });

    const updateModel = (data) => {
      updateWithData(self, data);
    };

    const addFromFiles = flow(function* (files) {
      let newPhotos = [];
      let index = self.photos.length - 1;
      for (var file of files) {
        index++;
        let photo = PhotoModel.create({ displayIndex: index });
        newPhotos.push(photo);
        self.photos.push(photo);
        photo.loadFromFile(file);
      }
      //   if (self.isNew) {
      db.saveAlbum(self);
      //   } else {
      //     db.addPhotosToAlbum(self.id, newPhotos);
      //   }
    });

    const movePhoto = (oldIndex, newIndex) => {
      self.photos = arrayMove(self.photos, oldIndex, newIndex);
      let index = -1;
      for (const item of self.photos) {
        index++;
        item.setDisplayIndex(index);
      }
    };
    const setDisplayIndex = (index) => {
      self.displayIndex = index;
      db.saveAlbum(self);
    };

    const addPhoto = flow(function* (photo) {});

    return {
      afterCreate,
      addFromFiles,
      load,
      updateModel,
      setDisplayIndex,
      movePhoto,
    };
  });

export default AlbumModel;
