var firebase = require("firebase");
Fire = {};
var config = {
            apiKey: "AIzaSyCfBs6XfzW-OTpqOOAgX_ipqRQAoz9Zwzs",
            authDomain: "bookit-80365.firebaseapp.com",
            databaseURL: "https://bookit-80365.firebaseio.com",
            storageBucket: "bookit-80365.appspot.com",
            messagingSenderId: "480418348927"
        };
Fire.init = function(){
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    
  firebase.initializeApp(config);  
  var database = firebase.database();
   var starCountRef = firebase.database().ref('posts');
  function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
      author: "sd",
      uid: 34343,
      body: "sdfsdf",
      title: "5345",
      starCount: 4,
      
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
  }
  // writeNewPost(3,"34#","434","3434","434'");
 
 
Fire.save = function (param) {
   var newPostRef = starCountRef.push();
  newPostRef.set({
    id:343,
    speed:param,
    timestamp: new Date().getTime()
  });
}

} 
module.exports = Fire;
