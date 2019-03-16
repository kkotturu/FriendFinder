// require path so we can parse directory structures
let path = require('path');

// pull in the friends letiable data file
let friends = require('../data/friends.js');

module.exports = function (app) {

	// if user goes to /api/friends, send them the letiable data as json
	app.get("/api/friends", function (req, res) {
		res.json(friends);
	});

	// handle the post request from the survey form
	app.post("/api/friends", function (req, res) {

		console.log("I'm in the API.post function")

		// begin by setting up the array hoding the user's answers
		let surveyResults = req.body.scores;
		console.log(surveyResults);
		// convert the values in surveyResults to integers
		for (let i = 0; i < surveyResults.length; i++) {
			surveyResults[i] = parseInt(surveyResults[i]);
		}

		let bestDifference = 999999; // start with a high dummy value
		let bestMatch = 0; // assume the first place is the best match

		for (i = 0; i < friends.length; i++) {

			// define a temp value that calculates difference between user selection and
			// the current i-th place being compared against and use the
			// difference function to calculate the difference
			let tempDifference = difference(surveyResults, friends[i].scores);

			// console log the difference between user choices and place being compared
			console.log("The difference between", surveyResults, "and", friends[i].name, friends[i].scores, "=", tempDifference);

			// the comparison shows that the current place has a lower difference 
			if (tempDifference < bestDifference) {
				bestDifference = tempDifference;
				bestMatch = i;
			}
		}

		// function to calculate the difference between two arrays
		function difference(array1, array2) {

			console.log("This is array 1: " + array1)
			console.log("This is array 2: " + array2)

			// countDifference holds the tally of the difference between array values
			let countDifference = 0;

			for (let i = 0; i < array1.length; i++) {
				countDifference += Math.abs(array1[i] - array2[i]);
			}

			// return the difference between the two arrays reflecting the deviation
			return countDifference;
		}

		console.log(friends)

		// send the bestMatch back to the html page in response to the post
		res.send(friends[bestMatch]);
		console.log(friends)
	});
};