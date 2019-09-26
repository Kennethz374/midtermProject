

const optionsQueryBuilder = function (arrayOptions) { // need to move this into the dataHelpers
  let queryInput = `INSERT INTO options(name, rating, price, total_reviews, address) VALUES`
 for (let i in arrayOptions) {
  queryInput +=  ` (`

   console.log(i);
   for (let n in arrayOptions[i]){
     console.log(arrayOptions[i][n]);
     queryInput += `'` + arrayOptions[i][n] + `', `
   }
   queryInput = queryInput.substring(0, queryInput.length - 2)
   queryInput += `),`
 }
 queryInput = queryInput.substring(0, queryInput.length - 1)

 return queryInput
}


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
  <img draggable="false" src= ${yelpInfo.image_url} style="height:150px; width: 200px">
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
      console.log(data);

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

    let result = [];

    for (let par = 0; par < names.length; par++) {
      let x = [names[par].innerHTML, rating[par].innerHTML, price[par].innerHTML, reviews[par].innerHTML, address[par].innerHTML]
      result.push(x)
    }

    const insertQuery = optionsQueryBuilder(result)

    console.log(insertQuery)


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
      console.log("HELLLOOO")


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
          // console.log(origin)
          // console.log(event.target.children)
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






//example restaurant data
  // {"id":"I0r8kMimYW2BY6lINcZRFA","alias":"kishimoto-japanese-kitchen-vancouver",
  // "name":"Kishimoto Japanese Kitchen",
  // "image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/IdqxNBNpSxwTjk4K7gcCqg/o.jpg",
  // "is_closed":false,
  // "url":"https://www.yelp.com/biz/kishimoto-japanese-kitchen-vancouver?adjust_creative=dEpGDkbqGu15S62Upt6sjA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dEpGDkbqGu15S62Upt6sjA",
  // "review_count":438,
  // "categories":[{"alias":"japanese","title":"Japanese"},
  // {"alias":"sushi","title":"Sushi Bars"}],"rating":4.5,
  // "coordinates":{"latitude":49.2665099,"longitude":-123.06935},"transactions":[],
  // "price":"$$","location":{"address1":"2054 Commercial Drive","address2":null,"address3":"",
  // "city":"Vancouver","zip_code":"V5N 4A9","country":"CA","state":"BC",
  // "display_address":["2054 Commercial Drive","Vancouver, BC V5N 4A9","Canada"]},
  // "phone":"+16042555550","display_phone":"+1 604-255-5550","distance":3418.6600056840443}

})
