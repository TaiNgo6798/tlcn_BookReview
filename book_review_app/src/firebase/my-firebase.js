import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAxsPNM6aufE4GYrx4Ia4C8GrzI4mAPX9g",
  authDomain: "reviewbook-1af0f.firebaseapp.com",
  databaseURL: "https://reviewbook-1af0f.firebaseio.com",
  projectId: "reviewbook-1af0f",
  storageBucket: "reviewbook-1af0f.appspot.com",
  messagingSenderId: "357029016894",
  appId: "1:357029016894:web:95d3d1711b442cbfc5286f",
  measurementId: "G-GP50EN1R49"
};
firebase.initializeApp(firebaseConfig);

// firebase.database().ref().child("Reviews").on('child_added',function(snapshot){
//   console.log(snapshot.key);
// })


const uploadStorage = async file => {
  var result = {};
  var dataStr = new Date().getTime();
  var name = file.name;
  var fileCompleteName = name + "_" + dataStr;
  var storageRef = firebase
    .storage()
    .ref()
    .child("Review Images");
  var reviewStorageRef = storageRef.child(fileCompleteName);
  await reviewStorageRef.put(file).then(function() {
    result.nameImage = fileCompleteName;
    reviewStorageRef.getDownloadURL().then(function(url) {
      result.url = url;
    });
  });
  return result;
};

export { uploadStorage };
