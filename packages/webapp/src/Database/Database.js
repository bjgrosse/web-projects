import firebase from "firebase";
import Deferred from "@web/common/utilities/Deferred";
import sortBy from "lodash/sortBy";
const getCurrentUserId = () => firebase.auth().currentUser.uid;

function retrieveAndListen(ref, listenForChanges, prepRecord) {
  let handle = new Deferred();

  ref.onSnapshot(
    (snapshot) => {
      let singleDoc = snapshot.data !== undefined;

      let result;

      if (singleDoc) {
        result = {
          ...snapshot.data(),
          ...{ id: snapshot.id },
        };

        if (prepRecord) {
          result = prepRecord(result);
        }
      } else {
        result = snapshot.docs.map((doc) => ({
          ...doc.data(),
          ...{ id: doc.id },
        }));
        if (prepRecord) {
          result = result.map((r) => prepRecord(r));
        }
      }

      // If this is our initial response
      // then resolve the promise that is waiting
      if (handle) {
        handle.resolve(result);
        handle = null;

        // Otherwise, call the change listener
      } else {
        if (listenForChanges) listenForChanges(result);
      }
    },
    (error) => {
      if (handle) {
        handle.reject(error);
        handle = null;
      } else {
        throw error;
      }
    }
  );

  return handle.promise;
}

async function getAllRecords(collection, listenForChanges) {
  const ref = firebase.firestore().collection(collection);

  return retrieveAndListen(ref, listenForChanges);
}

async function getRecord(collection, id, listenForChanges) {
  let ref = await firebase.firestore().collection(collection).doc(id);
  return retrieveAndListen(ref, listenForChanges);
}

async function saveRecord(collection, id, data) {
  console.log(`saving ${collection} : ${id}`, data);
  return firebase.firestore().collection(collection).doc(id).update(data);
}

function getNewId(collection) {
  return firebase.firestore().collection(collection).doc().id;
}

function convertAlbumToLocal(data) {
  return {
    ...data,
    photos: sortBy(Object.values(data.photos), "displayIndex"),
  };
}

function savePhoto(id, albumId, data) {
  const patch = { [`photos.${id}`]: data };
  return firebase
    .firestore()
    .collection("users")
    .doc(getCurrentUserId())
    .collection("albums")
    .doc(albumId)
    .update(patch, { merge: true });
}

export default {
  getCurrentUserId: getCurrentUserId,
  getCurrentUser: () => firebase.auth().currentUser,
  saveFCMToken: (token) => {
    console.log("saving fcm token");
    return firebase.functions().httpsCallable("saveFcmToken")({
      userId: getCurrentUserId(),
      token: token,
    });
  },
  getUser: (id, listenForChanges) => getRecord("users", id, listenForChanges),
  saveUser: (data) => saveRecord("users", getCurrentUserId(), data),
  getNewId: () => getNewId("nothing"),
  getAlbum: (id, listenForChanges) => {
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(getCurrentUserId())
      .collection("albums")
      .doc(id);

    return retrieveAndListen(ref, listenForChanges, convertAlbumToLocal);
  },
  getAlbums: (listenForChanges) => {
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(getCurrentUserId())
      .collection("albums")
      .orderBy("displayIndex", "asc");

    return retrieveAndListen(ref, listenForChanges, convertAlbumToLocal);
  },
  addPhotosToAlbum: (id, photos) => {
    let data = photos.reduce(
      (map, photo) => ({
        ...map,
        [`photos.${photo.id}`]: { id: photo.id, url: photo.url || null },
      }),
      {}
    );

    console.log(data);
    return firebase
      .firestore()
      .collection("users")
      .doc(getCurrentUserId())
      .collection("albums")
      .doc(id)
      .update(data, { merge: true });
  },
  savePhoto,
  uploadPhotoFromFile: (albumId, photoId, file, onProgress) => {
    const task = firebase
      .storage()
      .ref()
      .child(`${albumId}/${photoId}`)
      .put(file);
    const handle = new Deferred();

    task.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        if (onProgress)
          onProgress(snapshot.bytesTransferred / snapshot.totalBytes);
      },
      function (error) {
        handle.reject(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
          savePhoto(photoId, albumId, { id: photoId, url: downloadUrl });
          handle.resolve(downloadUrl);
        });
      }
    );

    return handle.promise;
  },
  saveAlbum: ({ id, displayIndex, photos }) => {
    let data = { displayIndex: displayIndex };
    data.photos = photos.reduce(
      (map, photo) => ({
        ...map,
        [photo.id]: { id: photo.id, url: photo.url || null },
      }),
      {}
    );

    console.log(data);
    return firebase
      .firestore()
      .collection("users")
      .doc(getCurrentUserId())
      .collection("albums")
      .doc(id)
      .set(data, { merge: true });
  },
};
