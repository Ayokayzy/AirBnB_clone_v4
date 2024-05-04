#!/usr/bin/node

$(document).ready(function() {
    selectedData = [];
    $("input").on("click", function(e) {
        if (e.target.checked) {
            selectedData.push(e.target.value);
        } else {
            selectedData = selectedData.filter(data => data === e.tatget.value)
        }
    })
})
