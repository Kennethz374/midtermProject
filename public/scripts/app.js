
// $(() => {

//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

const renderRestaurant = function(restaurants) {
  for (const restaurant of restaurants) {
    let value = createRestaurant(restaurant);
    $(".restaurantContainer").append(value);
  }
}

const createRestaurant = function(yelpInfo) {
  let $restaurant = $(` <div class="restaurant">
  <div class="resContext">
  <h4>${yelpInfo.name}</h1>
  <h1>Rating:${yelpInfo.rating}</h1>
  <h1>Price ${yelpInfo.price}</h1>
  <h1>Total reviews: ${yelpInfo.review_count}</h1>
  <h1>${yelpInfo.location.display_address}</h1>
  <h1>Close: ${yelpInfo.is_closed} </h1>
  </div>
  <div class="pictures">
  <img src= ${yelpInfo.image_url}>
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
