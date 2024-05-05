#!/usr/bin/node

$(document).ready(function() {
  $.ajax({
    method: "POST",
    url: "http://172.22.78.253:5001/api/v1/places_search/",
    data: JSON.stringify({}),
    dataType: "json",
    contentType: "application/json"
  })
    .done(function(places) {
      let placeHTML = "";
      console.log(places)
      places.forEach(place =>
        placeHTML += ` <article>
          <div class="title_box">
            <h2>${ place?.name }</h2>
            <div class="price_by_night">$${ place?.price_by_night }</div>
          </div>
          <div class="information">
            <div class="max_guest">${ place?.max_guest } Guest${ place?.max_guest != 1 && "s" }</div>
            <div class="number_rooms">${ place?.number_rooms } Bedroom${place.number_rooms != 1 && "s" }</div>
            <div class="number_bathrooms">${ place?.number_bathrooms } Bathroom${ place?.number_bathrooms != 1 && "s" }</div>
          </div>
          <div class="user">
            <b>Owner:</b> ${ place.user?.first_name || place.user?.email } ${ place.user?.last_name }
          </div>
          <div class="description">
            ${ place?.description || "safe" }
          </div>
        </article>`)
      $(".places").html(placeHTML)
    });

  $.ajax({
    url: "http://172.22.78.253:5001/api/v1/status/",
    success: function() {
      $("#api_status").addClass("available")
    },
    error: function() {
      $("#api_status").removeClass("available")
    }
  })

  selectedData = [];
  defaultText = $("#amenities").text()
  $("input").on("click", function(e) {
    const id = $(this).parent().attr("data-id")
    const name = $(this).parent().attr("data-name")
    if (e.target.checked) {
      selectedData.push(name);
    } else {
      selectedData = selectedData.filter(data => data !== name);
    }
    let text = "";
    selectedData.forEach((data, idx) => {
      text += data
      if (idx !== selectedData.length - 1)
        text += ", "
    })
    $("#amenities").text(!text ? defaultText : text)
  })
})
