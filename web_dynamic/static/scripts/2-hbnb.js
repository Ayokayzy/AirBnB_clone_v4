#!/usr/bin/node

$(document).ready(function() {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    success: function() {
      $("#api_status").addClass("available")
      console.log("api success")
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
