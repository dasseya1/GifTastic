$(document).ready(function(){

// Initial array of topics
    var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "bird", "goldfish", "turtle", "chicken"];

    // displaytopicInfo function re-renders the HTML to display the appropriate content
    function displaytopicInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ topic + "&limit=10&api_key=dc6zaTOxFJmzC";
    
    // Creating an AJAX call for the specific topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      //API Call results
      var results = response.data;

      //Clear previous images if there are any.
     $(".animals").empty();

      for (var i = 0; i < results.length; i++) {

      // Creating a div to hold the topic
      var topicDiv = $("<div class='topic'>");

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + results[i].rating);

      // Displaying the rating
      topicDiv.append(pOne);


      // Retrieving the URL for the image
      var imgURL = results[i].images.fixed_height_still.url;
      var still_url = imgURL.substring(0, imgURL.length - 4 ).concat("_s.gif")
      
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);
          image.attr("data-state", "still");
          image.attr("data-animate", results[i].images.fixed_height.url);
          image.attr("data-still", results[i].images.fixed_height_still.url);

      // Appending the image
      topicDiv.append(image);

      // Putting the entire topic above the previous topics
      $(".animals").prepend(topicDiv);
    }
    imgPlacement();
    setImgClick();
  });
  
}

    // Function for displaying topic data
    function renderButtons() {

      // Deleting the images prior to adding new ones
      $(".animalbuttons").empty();

      // Looping through the array of topics
      for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of topic to our button
        a.addClass("topic");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $(".animalbuttons").append(a);
      }
        styleButton();
    }

    // This function handles events where a topic button is clicked
    $("#addAnimal").on("click", function(event) {
      event.preventDefault();
      
      // This line grabs the input from the textbox
      var topic = $("#animal-input").val().trim();

      // Adding topic from the textbox to our array
      topics.push(topic);

      // Calling renderButtons which handles the processing of our topic array
      renderButtons();
    
    });

    // Adding a click event listener to all elements with a class of "topic"
    $(document).on("click","button.topic", displaytopicInfo);
    

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    
    //This function changes the url for a still gif to the corresponding animated gif
    function setImgClick () {
      $('img').on("click", function(event) {
        event.preventDefault();
        
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          var animate_url = $(this).attr("data-animate")
          $(this).attr("src", animate_url);
          $(this).attr("data-state", "animate");
        } else {
          var still_url = $(this).attr("data-still")
          $(this).attr("src", still_url);
          $(this).attr("data-state", "still");
        }
      });
    }
    
    //This function is for styling the buttons
    function styleButton (){
      $('button').css('background-color',"#4CAF50")
                 .css('margin-right',"2%")
                 .css('padding',"6px 10px");
    }  
    
    //This function is for styling the buttons
    function imgPlacement(){
      $('.topic').css('clear',"right")
                 .css('display',"inline-block")
                 .css('margin-right',"2%");
    }
    
    //Style for the animal form
    $('#animal-form').css('float',"right")
                     .css('margin-right',"20%")
                     .css('background-color',"#000")
                     .css('padding',"20px 15px")
                     .css('border-radius',"5px");
                     
    //Set the background and text colors
    $('body').css('background-color',"#800080")
             .css('color',"white");
      
});
