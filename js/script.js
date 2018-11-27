// Test if scripts work
const test = document.querySelector("header");
const testText = document.createElement("div");
// End test - delete after finishing project

// Color Arrays
const $colPuns = {
  cornflowerblue: "Cornflower Blue (JS Puns shirt only)",
  darkslategrey: "Dark Slate Grey (JS Puns shirt only)",
  gold: "Gold (JS Puns shirt only)"
};

const $colIlov = {
  tomato: "Tomato (I &#9829; JS shirt only)",
  steelblue: "Steel Blue (I &#9829; JS shirt only)",
  dimgrey: "Dim Grey (I &#9829; JS shirt only)"
};

// Amount variable
let sum;
let $actChecked = $(".activities input:checked");

// Activities object
const $activities = [
  { type: "all", price: "200" },
  { type: "js-frameworks", time: "Tuesday 9am-12pm", price: "100" },
  { type: "js-libs", time: "Tuesday 1pm-4pm", price: "100" },
  { type: "express", time: "Tuesday 9am-12pm", price: "100" },
  { type: "node", time: "Tuesday 1pm-4pm", price: "100" },
  { type: "build-tools", time: "Wednesday 9am-12pm", price: "100" },
  { type: "npm", time: "Wednesday 1pm-4pm", price: "100" }
];

const $themeMessage = $(
  `<div class="theme_message">Please select a T-shirt theme</div>`
);

// Helper functions
// Find indices in $activities object
function findWithAttr(array, attr, value) {
  let react = [];
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      react.push(i);
    }
  }
  return react;
}

// Set initial page behavior
$(window).on("load", () => {
  $("#name").focus();
  $("#other-title").hide();
  $("#colors-js-puns").hide();
  $themeMessage.insertAfter("#colors-js-puns");
});

// Display and Hide the Job Role Text field
$("#title").change(() => {
  if ($("#title").val() === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

// Display and Hide T-Shirt Options - Remove instead of hide because of Safari issues with hidden options
$("#design").change(() => {
  // Hide all options
  $("#color option").remove();

  // Set what options will be displayed depending on the design choice
  if ($("#design").val() === "js puns") {
    $themeMessage.hide();
    $("#colors-js-puns").show();
    for (let key in $colPuns) {
      $("#color").append(
        `<option value="` + key + `">` + $colPuns[key] + `</option>`
      );
    }
  } else if ($("#design").val() === "heart js") {
    $themeMessage.hide();
    $("#colors-js-puns").show();
    for (let key in $colIlov) {
      $("#color").append(
        `<option value="` + key + `">` + $colIlov[key] + `</option>`
      );
    }
    // Show all if Select Theme is selected
  } else {
    $("#colors-js-puns").hide();
    $themeMessage.fadeIn(500);
  }

  //Show first Element as Default selected
  $("#color option")
    .eq(0)
    .attr("selected", true);
});

// Activate and deactivate Activities
$(".activities input").on("click", function() {
  const nametest = $(this)[0].name;
  let obj = $activities.find(obj => obj.type == nametest).time;
  let react = findWithAttr($activities, "time", obj);

  for (let i = 0; i < react.length; i++) {
    let index = react[i];
    if ($(this)[0].checked) {
      $(".activities label")
        .eq(index)
        .css("color", "grey");
      $(".activities input")
        .eq(index)
        .attr("disabled", true);
      $(this)[0].removeAttribute("disabled");
      $(this)[0].parentElement.style.color = "black";
    } else {
      $(".activities input")
        .eq(index)
        .attr("disabled", false);
      $(".activities label")
        .eq(index)
        .css("color", "black");
    }
  }
});

// Calculate total
$(".activities input").on("click", function() {
  $actChecked = $(".activities input:checked");
  const regex = /\d{3}/;

  sum = 0;

  console.log(sum);

  for (let i = 0; i < $actChecked.length; i++) {
    sum += parseInt(regex.exec($actChecked[i].parentElement.innerHTML));
  }

  let $total = $(`<div class="total">$ ${sum}</div>`);

  if (sum > 0) {
    $(".total").remove();
    $total.insertAfter(".activities");
  } else {
    $(".total").remove();
  }
});

// Remove Select Payment Method and default select credit card
$('#payment option[value="select_method"]').remove();
$('#color option[value="credit card"]').attr("selected", true);

// Hide elements, show elements depending on the payment option
$("#payment").change(() => {
  // Hide all divs
  $("#payment")
    .nextAll()
    .hide();
  // Make all options unselected
  $("#payment option").attr("selected", false);

  // Set what options will be displayed depending on the design choice
  if ($("#payment").val() === "credit card") {
    $("#credit-card").show();
    $('#payment option[value="credit card"]').attr("selected", true);
  } else if ($("#payment").val() === "paypal") {
    $("#credit-card")
      .nextAll()
      .eq(0)
      .show();
    $('#payment option[value="paypal"]').attr("selected", true);
  } else if ($("#payment").val() === "bitcoin") {
    $("#credit-card")
      .nextAll()
      .eq(1)
      .show();
    $('#payment option[value="bitcoin"]').attr("selected", true);
  }
});
