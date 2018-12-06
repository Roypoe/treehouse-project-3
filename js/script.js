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

// Validation variables
const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // emailregex.com
let valText;
const valErrLett = "Card Numer must only contain digits";
const valErrNrLength1 = "Card Numer must contain at least 13 digits";
const valErrNrLength2 = "Card Numer must not contain more than 16 digits";
const valErrGen = "Card Numer must contain between 13 and 16 digits";
const valErrDigit = "No numbers are allowed";
const valErrGenName = "Please enter a valid name";

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
    // Show Message if Select Theme is selected
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
  // Get attribute 'name' from clicked element
  const nametest = $(this)[0].name;
  // Find time value for object with this type/name
  let obj = $activities.find(obj => obj.type == nametest).time;
  // Find indices for objects with same time value
  let react = findWithAttr($activities, "time", obj);

  // Set disabled and grey if checked except the clicked element
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
      // enable and black if unchecked
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
  // find all checked
  $actChecked = $(".activities input:checked");
  // Get amount
  const regex = /\d{3}/;
  sum = 0;

  // Calculate total
  for (let i = 0; i < $actChecked.length; i++) {
    sum += parseInt(regex.exec($actChecked[i].parentElement.innerHTML));
  }

  // Show, Hide amount if <> 0
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
$('#payment option[value="credit card"]').attr("selected", true);

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

// Validation and Messages
// Add field CSS and Message
let valCSS = (val, valText) => {
  $(val).addClass("checkBorder");
  $(val)
    .prev("label")
    .addClass("checkLabel");

  // If message exists add message, special case #cc-num
  // because of multiple credit card input fields
  if (val === "#cc-num") {
    $(`<p>${valText}</p>`)
      .addClass("checkMessage")
      .insertAfter($("#cvv").parent());
  } else if (valText !== "") {
    $(`<p>${valText}</p>`)
      .addClass("checkMessage")
      .insertAfter(val);
  }
  // If empty only color changes
};

// Remove field CSS and Message
let remCSS = val => {
  $(val).removeClass("checkBorder");
  $(val)
    .prev("label")
    .removeClass("checkLabel");

  if (val === "#cc-num") {
    $("#cvv")
      .parent()
      .next("p")
      .remove();
  } else {
    $(val)
      .next("p")
      .remove();
  }
};

// Name field validation
let valName = () => {
  remCSS("#name");
  if ($("#name").val() === "") {
    valCSS("#name", valErrGenName);
    // message if digits are used
  } else if (/[0-9]/gi.test($("#name").val())) {
    valCSS("#name", valErrDigit);
  }
};

// Mail field validation
function valMail() {
  remCSS("#mail");
  valText = "";
  if (!mailRegex.test($("#mail").val())) {
    valCSS("#mail", "");
  }
}

function valAct() {
  $(".activities legend").removeClass("checkLabel");
  if ($(".activities input:checked").length === 0) {
    $(".activities legend").addClass("checkLabel");
  }
}

function valCred() {
  // Set different regexes
  let testRegexes = [/^\d{13,16}$/, /^\d{5}$/, /^\d{3}$/];
  // Get all credit card fields
  let $testFields = $("#credit-card input");

  $testFields.each((index, element) => {
    // Set field id
    let temp = "#" + $testFields.eq(index).attr("id");
    // remove all styles
    remCSS(temp);
    // Only apply if credit card is payment option
    if ($("#credit-card").css("display") !== "none") {
      valText = "";
      // Check fields
      if (!testRegexes[index].test(element.value)) {
        // Conditional error messages for #cc-num
        if (temp === "#cc-num") {
          if (/[a-z]/gi.test(element.value)) {
            valText = valErrLett;
          } else if (/^\d{1,12}$/.test(element.value)) {
            valText = valErrNrLength1;
          } else if (/^\d{17,}/.test(element.value)) {
            valText = valErrNrLength2;
          } else {
            valText = valErrGen;
          }
        }
        // Apply styles and message if any
        valCSS(temp, valText);
      }
    }
  });
}

// Add Real-Time Validation as soon as focused once
$("#credit-card input").on("focus keypress keydown keyup", function() {
  valCred();
});

// Submit after checks
$("button").click(e => {
  valName();
  valMail();
  valAct();
  valCred();

  // Only submit if no error styles applied
  if (($(".checkLabel").length !== 0) | ($(".checkBorder").length !== 0)) {
    event.preventDefault();
  }
});
