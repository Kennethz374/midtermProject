
const renderRestaurant = function(restaurants) {
  for (const restaurant of restaurants) {
    let value = createRestaurant(restaurant);
    $(".restaurantContainer").append(value);
  }
}

// missing the id="draggable" which means its not getting the styling from the scss

const createRestaurant = function(yelpInfo) {
  let $restaurant = $(`<div id="${yelpInfo.id}" class="restaurant" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
  <div class="resContext">
  <h5><span class="restaurant-name">${yelpInfo.name}</span><br>
  <span class="restaurant-rating">Rating:${yelpInfo.rating}</span><br>
  <span class="restaurant-price">Price ${yelpInfo.price}</span><br>
  <span class="restaurant-reviews">Total reviews: ${yelpInfo.review_count}</span><br>
  <span class="restaurant-address">${yelpInfo.location.display_address}</span>
  </h5>
  </div>
  <div class="pictures">
  <span class="restaurant-picture">
  <img draggable="false" src= ${yelpInfo.image_url} style="height:150px; width: 200px"></span>
  </div>

</div>`);
return $restaurant;
}

$(document).ready(function() {
  $("#searchBtn").click(()=>{
    let input = $(".inputContent").val()
    console.log("CONSOLE LOG", window.location);
    $.ajax({
      method: "POST",
      url:"/polls",
      data: JSON.stringify({ input }),
      contentType: "application/json",
      dataType: "json"
    }).done((data)=>{

      renderRestaurant(data)
    })
    $(".inputContent").val("");
    $(".restaurantContainer").empty();
  })



  $("#doneRankingButton").click((event) => {
    event.preventDefault()
    const check = $(".traverseResults")
    const names = check.find('.restaurant-name')
    const rating = check.find('.restaurant-rating')
    const price = check.find('.restaurant-price')
    const reviews = check.find('.restaurant-reviews')
    const address = check.find('.restaurant-address')
    const picture = check.find('.restaurant-picture')

    // console.log("picture", picture[0])

    let result = [];


    for (let par = 0; par < names.length; par++) {
      let x = [names[par].innerHTML, rating[par].innerHTML, price[par].innerHTML, reviews[par].innerHTML, address[par].innerHTML]

      console.log(x, "XXX")

      for (let index = 0; index < x.length; index++) {
        const element = x[index];

        const $input = $(`<input id="inputHidden" name='result[${par}][${index}]'>`)

        $input.val(element)
        $("#formInsert").append($input)
      }

    }

    $("#formInsert").submit()
  })




  // TEST -----------

  var dragged;
  let origin;

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {

  }, false);

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      origin = event.target.parentNode;

      event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";


  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();

  }, false);

  document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "#ADD8E6";
      }


  }, false);

  document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "";
      }

  }, false);

  document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();

      // move dragged elem to the selected drop target
      if ( event.target.className == "dropzone" ) {
        if (event.target.children.length > 0) {

          origin.prepend(event.target.children[0]);
        }
          event.target.style.background = "";
          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
      }

      else if ( event.target.className == "TESTING") {
        // var target = $(".restaurants");
        // var target = $( event.target );
        dragged.remove();
        // target.remove();
        // event.target.empty()
        event.target.style.background = "purple";
      }

  }, false);


})
