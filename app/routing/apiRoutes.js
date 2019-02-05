module.exports = function(app) {
    // Display JSON of all possible friends
    app.get("/api/friends", function(req, res) {
        console.log("Time to handle get request");
        res.sendFile('friends.js', { root: './app/data' });
    });

  
    app.post("/api/friends", function(req, res) {
        //console.log("Time to handle post data of " + req.body.name);
        var bestMatch = matchApp(req.body);
        //console.log("Subroutine done and it said the bast match was " + bestMatch.name);
        res.json(bestMatch);
        //res.sendFile('survey.html', { root: './app/public' });
    });
  };

  function matchApp(seeker) {
      //instantiate a var to hold the best match
      var match;
    //need to read in the json data in friends.js
    var friends = require("../../app/data/friends");
    //check each friend to see how their survey responses differ from the seeker
    var bestLowestDiff = null;
    for(var i=0; i<friends.length; i++) {
        var currentFriend = friends[i];
        var seekerScores = seeker.scores;
        var candidateScores = currentFriend.scores;
        
        var totalDiff = 0;
        for (var j=0; j<seekerScores.length; j++) {
            totalDiff += Math.abs(seekerScores[j] - candidateScores[j]);
            //console.log("totalDiff is now " + totalDiff);
        }
        if(bestLowestDiff == null || totalDiff < bestLowestDiff) {
            bestLowestDiff = totalDiff;
            match = currentFriend;
        }
    }
   
    return match
  }