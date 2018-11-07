import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDujaaPXAWWkkPVl773HB6mUHEZFd7a8no",
  authDomain: "my-website-8af43.firebaseapp.com",
  databaseURL: "https://my-website-8af43.firebaseio.com",
  projectId: "my-website-8af43",
  storageBucket: "my-website-8af43.appspot.com",
  messagingSenderId: "308390776707"
};

firebase.initializeApp(config)

export default firebase