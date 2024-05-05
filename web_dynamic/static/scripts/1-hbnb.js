#!/usr/bin/node

$(document).ready(function() {
    selectedData = [];
    defaultText = $("#amenities").text()
    $("input").on("click", function(e) {
        console.log(e.target.checked)
        const id = $(this).parent().attr("data-id")
        const name = $(this).parent().attr("data-name")
        if (e.target.checked) {
            selectedData.push(name);
        } else {
            selectedData = selectedData.filter(data => data !== name);
        }
        text = "";
        selectedData.forEach((data, idx) => {
            text += data
            if (idx !== selectedData.length - 1) {
                text += ", "
            }
        })
        $("#amenities").text(!text ? defaultText : text)
        console.log(selectedData)
    })
})
