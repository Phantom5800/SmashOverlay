var orgConfig = {
  "amazon": {
      "Logo": "logos/amazon.png",
      "Stylesheet": "styles/base.css"
  },
  "microsoft": {
      "Logo": "logos/microsoft.png",
      "Stylesheet": "styles/base.css"
  },
  "hulu": {
      "Logo": "logos/hulu.png",
      "Stylesheet": "styles/hulu.css"
  },
  "mvd": {
      "Logo": "logos/mvd.png",
      "Stylesheet": "styles/mvd.css"
  }
}

var urlParams = {};
var characterMode = "ultimate";
// Page Load
var cssCount = document.styleSheets.length;
var ti = setInterval(function() {
  if (document.styleSheets.length > cssCount) {
    $('#page').css('visibility', 'visible')
    clearInterval(ti);
  }
}, 10);

function loadStylesheet(sheet) {
  var link_html = "<link rel=\"stylesheet\" " + "href=\"" + sheet + "\">"
  var link = $.parseHTML(link_html);
  $('head').append(link);
}

function getUrlParamCount() {
  return Object.keys(urlParams).length;
}

function getUrlVars() {
  if (getUrlParamCount() === 0) {
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      urlParams[key.toLowerCase()] = value;
    });
  }
  return urlParams;
}

function getUrlParam(parameter, defaultValue) {
  var urlParameter = defaultValue;
  if (parameter in urlParams) {
    urlParameter = urlParams[parameter];
  }
  return decodeURI(urlParameter);
}

function validateOrgParam(org) {
  org = org.toLowerCase();
  if (org in orgConfig) return org;
  return "microsoft";
}

function fillDataFromVars() {
  // initialize company info
  var company = validateOrgParam(getUrlParam("org", "MS"));
  $('#logo').attr('src', orgConfig[company]["Logo"]);
  
  $('#p1_score').html(getUrlParam("p1score", "0"));
  $('#p2_score').html(getUrlParam("p2score", "0"));
  $('#p1_name').html(getUrlParam("p1name", "P1"));
  $('#p2_name').html(getUrlParam("p2name", "P2"));
  $('#round').html(getUrlParam("round", "Friendlies"));
  
  var tournament_name = getUrlParam("tournament", "");
  if (tournament_name !== "") {
    setTournamentName(tournament_name);
  }
  
  if (getUrlParam("instructions", "on") === "off") {
    $('#instructions').hide();
  }

  characterMode = getUrlParam("mode", "ultimate");

  loadStylesheet(orgConfig[company]["Stylesheet"]);
}

function setDataFromJSON() {
  var company = data["org"].toLowerCase();
  $('#logo').attr('src', orgConfig[company]["Logo"]);
  loadStylesheet(orgConfig[company]["Stylesheet"]);

  $('#p1_score').html(data["p1Score"]);
  $('#p2_score').html(ata["p2Score"]);
  $('#p1_name').html(data["p1Name"]);
  $('#p2_name').html(data["p2Name"]);
  $('#round').html(data["round"]);
}

// page events
function incrementScore(element) {
  var value = parseInt(element.html());
  element.html((value + 1));
}

function decrementScore(element) {
  var value = parseInt(element.html());
  element.html((value - 1));
}

function changeName(element) {
  var result = prompt("Enter a new name for " + element.attr('id').substring(0, 2));
  if (result !== null && result !== "") {
    element.html(result);
  }
}

function convertUserInputToCharacter(input) {
  var lowcase = input.toLowerCase();
  var noWhitespace = lowcase.replace(/ /g, '_').replace(/-/g, '_');

  var remap = {
    "banjo":            "banjo_and_kazooie",
    "bayo":             "bayonetta",
    "jr":               "bowser_jr",
    "falcon":           "captain_falcon",
    "diddy":            "diddy_kong",
    "donkey_kong":      "dk",
    "doc":              "dr_mario",
    "ganon":            "ganondorf",
    "puff":             "jigglypuff",
    "d3":               "king_dedede",
    "dedede":           "king_dedede",
    "krool":            "king_k_rool",
    "k_rool":           "king_k_rool",
    "mac":              "little_mac",
    "megaman":          "mega_man",
    "g&w":              "mr_game_and_watch",
    "game_and_watch":   "mr_game_and_watch",
    "pacman":           "pac_man",
    "plant":            "piranha_plant",
    "pt":               "pokemon_trainer",
    "rosa":             "rosalina_and_luma",
    "rosalina":         "rosalina_and_luma",
    "tink":             "toon_link",
    "wii_fit":          "wii_fit_trainer",
    "yink":             "young_link",
    "zss":              "zero_suit_samus",
  };

  var result = noWhitespace;
  if (remap[noWhitespace]) {
    result = remap[noWhitespace];
  }

  return result;
}

function changeCharacter(element) {
  var result = prompt("Enter character for " + element.attr('id').substring(0, 2));
  if (result !== null && result !== "") {
    var img_url = 'url(\"characters/' + characterMode + '/' + convertUserInputToCharacter(result) + ".png\")";
    element.css('background-image', img_url);
  }
}

function changeRound() {
  var result = prompt("Enter round title");
  if (result !== null && result !== "") {
    $('#round').html(result);
  }
}

function setTournamentName(name) {
  if (name !== null && name !== "") {
    $('#tournament_name').html(name);
    $('#tournament_name').css('visibility', 'visible');
  }
}

function swapSides() {
  var p1score = document.getElementById("p1_score");
  var p2score = document.getElementById("p2_score");
  var p1name = document.getElementById("p1_name");
  var p2name = document.getElementById("p2_name");

  [p1score.innerHTML, p2score.innerHTML] = [p2score.innerHTML, p1score.innerHTML];
  [p1name.innerHTML, p2name.innerHTML] = [p2name.innerHTML, p1name.innerHTML];
  [p1name.style.backgroundImage, p2name.style.backgroundImage] = [p2name.style.backgroundImage, p1name.style.backgroundImage]
}

function resetScores() {
  $('#p1_score').html(0);
  $('#p2_score').html(0);
}

$(document).ready(function() {
  getUrlVars();
  if (location.hostname === "" && getUrlParamCount() === 0) {
    setDataFromJSON();
  } else {
    fillDataFromVars();
  }

  $('#logo').click(function() {
    resetScores();
  });

  $('#logo').contextmenu(function() {
    swapSides();
    return false;
  });

  $('#p1_score').click(function() {
    incrementScore($(this));
  });

  $('#p2_score').click(function() {
    incrementScore($(this));
  });

  $('#p1_score').contextmenu(function() {
    decrementScore($(this));
    return false;
  });

  $('#p2_score').contextmenu(function() {
    decrementScore($(this));
    return false;
  });

  $('#p1_name').click(function() {
    changeName($(this));
  });

  $('#p2_name').click(function() {
    changeName($(this));
  });

  $('#p1_name').contextmenu(function() {
    changeCharacter($(this));
    return false;
  });

  $('#p2_name').contextmenu(function() {
    changeCharacter($(this));
    return false;
  });

  $('#round').click(function() {
    changeRound();
  });

  $('#instructions').click(function() {
    $(this).hide();
  });

  $(document).keypress(function(e) {
    /*
    var displayString = "";
    displayString += "e.ctrlKey: " + e.ctrlKey + "</br>";
    displayString += "e.altKey: " + e.altKey + "</br>";
    displayString += "e.code: " + e.code + "</br>";
    displayString += "e.keyCode: " + e.keyCode + "</br>";
    displayString += "e.charCode: " + e.charCode + "</br>";
    document.getElementById("instructions").innerHTML = displayString;
    */
    if (e.keyCode == 117) { // u
      resetScores();
    } else if (e.keyCode == 121) { // y
      swapSides();
    } else if (e.keyCode == 106) { // j
      incrementScore($("#p1_score"));
    } else if (e.keyCode == 107) { // k
      incrementScore($("#p2_score"));
    } else if (e.keyCode == 110) { // n
      decrementScore($("#p1_score"));
    } else if (e.keyCode == 109) { // m
      decrementScore($("#p2_score"));
    } else if (e.keyCode == 111) { // o
      changeName($("#p1_name"));
    } else if (e.keyCode == 112) { // p
      changeName($("#p2_name"));
    } else if (e.keyCode == 59) { // semicolon
      changeCharacter($("#p1_name"));
    } else if (e.keyCode == 39) { // single quote
      changeCharacter($("#p2_name"));
    } else if (e.keyCode == 44) { // comma
      changeRound();
    }
  });
});
