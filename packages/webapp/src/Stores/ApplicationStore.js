import { types, flow, applySnapshot, getParentOfType } from "mobx-state-tree";
import GetTheme from "Theme/Theme";
import db from "Database";
import AlbumModel from "./Models/AlbumModel";

// import localDb from "LocalDatabase";
import arrayMove from "array-move";

const GetUseDarkTheme = function () {
  const setting = window.localStorage.getItem("useDarkTheme");

  if (setting === null) {
    return !window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return setting === "1";
};

const UserModel = types.model("UserModel", {
  displayName: types.maybe(types.string),
  email: types.maybe(types.string),
  preferredColors: types.maybe(types.array(types.string)),
  isAdmin: false,
});

const ApplicationStore = types
  .model("ApplicationStore", {
    user: types.maybe(UserModel),
    albums: types.array(AlbumModel),
    useDarkTheme: GetUseDarkTheme(),
    isInEditMode: false,
    isLoading: false,
  })

  .actions((self) => {
    function afterCreate() {}

    const createNewAlbum = () => {
      return AlbumModel.create({
        id: db.getNewId(),
        displayIndex: self.albums.length,
        isNew: true,
      });
    };

    const updateUser = (userData) => {
      const isInitial = !self.user;
      self.user = UserModel.create(userData);

      if (isInitial) {
        self.loadAlbums();
      }
    };

    const setUser = flow(function* (user) {
      if (!user) {
        self.user = undefined;
        self.albums = [];
      } else {
        const record = yield db.getUser(user.uid, self.updateUser);
        self.updateUser({ ...user, ...record });
      }
    });

    const getAlbum = flow(function* (id) {
      let album = AlbumModel.create({
        id: id,
      });

      yield album.load();

      return album;
    });
    const setUseDarkTheme = (value) => {
      self.useDarkTheme = value;
      window.localStorage.setItem("useDarkTheme", value ? "1" : "0");
    };

    const moveAlbum = (oldIndex, newIndex) => {
      self.albums = arrayMove(self.albums, oldIndex, newIndex);
      let index = -1;
      for (const album of self.albums) {
        index++;
        //album.setDisplayIndex(index);
      }
    };
    const loadAlbums = flow(function* () {
      self.isLoading = true;
      updateAlbums(yield db.getAlbums(self.updateAlbums));
      self.isLoading = false;
    });

    const updateAlbums = (data) => {
      self.albums = data.map((x) => AlbumModel.create(x));
    };

    const setIsLoading = (value) => (self.isLoading = value);

    const setIsInEditMode = (value) => (self.isInEditMode = value);
    return {
      afterCreate,
      setUser,
      updateUser,
      setUseDarkTheme,
      setIsLoading,
      createNewAlbum,
      getAlbum,
      loadAlbums,
      updateAlbums,
      moveAlbum,
      setIsInEditMode,
    };
  })
  .views((self) => ({
    get Theme() {
      return GetTheme(self.useDarkTheme);
    },

    get isAuthenticated() {
      return self.user !== undefined;
    },
  }));

export default ApplicationStore;
