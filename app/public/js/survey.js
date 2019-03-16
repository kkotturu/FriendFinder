// Capture the form inputs 
$("#submit").on("click", function () {
	event.preventDefault();

	// Form validation
	function validateForm() {
		var isValid = true;
		$('.form-control').each(function () {
			if ($(this).val() === '')
				isValid = false;
		});

		return isValid;
	}

	// If all required fields are filled
	if (validateForm() == true) {
		// Create an object for the user's data
		var userData = {
			scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val()]
		}

		console.log(userData)

		// Grab the URL of the website
		var currentURL = window.location.origin;

		// AJAX post the data to the friends API. 

		$.ajax({
			method: "POST",
			url: currentURL + "/api/friends",
			data: userData,
			success: function (data) {
				console.log(data);
				$("#resultsModal").modal();
				$("#matchName").text(data.name);
				$('#matchImg').attr("src", data.photo);
			},
			complete: function () {

				// Show the modal with the best match 
				console.log("Complete")


			}
		});
		// Grab the result from the AJAX post so that the best match's name and photo are displayed.


	}
	else {
		alert("Please fill out all fields before submitting!");
	}

	return false;
});

$('#resultsModal').on('hidden.bs.modal', function () {
	window.location.reload(true);
})

