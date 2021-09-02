var orgConfig = {
  "amazon": {
    "Logo": "logos/amazon.png",
    "Stylesheet": "styles/base.css"
  },
  "microsoft": {
    "Logo": "logos/microsoft.png",
    "Stylesheet": "styles/base.css"
  },
  "galint": {
    "Logo": "logos/GSL-LOGO.svg",
    "Stylesheet": "styles/galint.css"
  },
  "mvd": {
    "Logo": "logos/mvd.png",
    "Stylesheet": "styles/mvd.css"
  },
}

var characterNameMap = new Map();

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
  "min-min":          "minmin",
  "min_min":          "minmin",
  "mythra":           "pyra",
  "g&w":              "mr_game_and_watch",
  "game_and_watch":   "mr_game_and_watch",
  "pac":              "pac_man",
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

var streamdeck_hotkeys = false;
var use_stock_icons = false;
var urlParams = {};
var remote_control_password = "";
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

function loadJS(js_file) {
  var script = document.createElement("script");
  script.src = js_file;
  document.head.appendChild(script);
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
  return $("#org_select").val();
}

function fillDataFromVars() {
  // initialize company info
  var company = validateOrgParam(getUrlParam("org", $("#org_select").val()));
  $('#logo').attr('src', orgConfig[company]["Logo"]);
  $("#org_select").val(company);
  
  $('#p1_score').html(getUrlParam("p1score", "0"));
  $('#p2_score').html(getUrlParam("p2score", "0"));
  $('#p1_name').html(decodeURIComponent(getUrlParam("p1name", "P1")));
  $('#p2_name').html(decodeURIComponent(getUrlParam("p2name", "P2")));
  $('#round').html(decodeURIComponent(getUrlParam("round", "Friendlies")));
  
  var tournament_name = getUrlParam("tournament", $("#tournament_name_entry").val());
  if (tournament_name !== "") {
    var decoded_tournament_name = decodeURIComponent(tournament_name);
    setTournamentName(decoded_tournament_name);
    $("#tournament_name_entry").val(decoded_tournament_name);
  }

  var currentIconType = ($("#portrait_type").prop('selectedIndex') == 0) ? "" : "stock";
  if (getUrlParam("icon", currentIconType) === "stock") {
    use_stock_icons = true;
    $("#portrait_type").prop('selectedIndex', 1);
  }

  characterMode = getUrlParam("mode", $("#game_select").val());
  $("#game_select").val(characterMode); // set drop down values appropriately
  var character1 = getUrlParam("p1char", "");
  if (character1 !== "") {
    setCharacter($('#p1_name'), character1);
  }
  var character2 = getUrlParam("p2char", "");
  if (character2 !== "") {
    setCharacter($('#p2_name'), character2);
  }

  var webcamType = getUrlParam("webcam", $("#webcam_type").prop('selectedIndex'));
  if (webcamType == 1) {
    $('#webcam-1-1').css('visibility', 'visible');
    $("#webcam_type").prop('selectedIndex', 1);
  } else if (webcamType == 2) {
    $('#webcam-1-1').css('visibility', 'visible');
    $('#webcam-2-2').css('visibility', 'visible');
    $("#webcam_type").prop('selectedIndex', 2);
  }
  
  if (getUrlParam("instructions", "on") === "off") {
    $('#instructions').parent().hide();
  } else {
    // generate initial character lists if instructions are visible
    generateCharacterLists();
  }

  if (getUrlParam("streamdeck", "false") === "true") {
    streamdeck_hotkeys = true;
  }

  remote_control_password = getUrlParam("remote", "");
  if (remote_control_password !== "") {
    loadJS("js/remote.js");
  }

  loadStylesheet(orgConfig[company]["Stylesheet"]);
}

// page events
function setScore(element, value) {
  element.html(value);
}

function incrementScore(element) {
  var value = parseInt(element.html());
  element.html((value + 1));
}

function decrementScore(element) {
  var value = parseInt(element.html());
  element.html((value - 1));
}

function setName(element, name) {
  element.html(name);
}

function changeName(element) {
  var result = prompt("Enter a new name for " + element.attr('id').substring(0, 2));
  if (result !== null && result !== "") {
    setName(element, result);
  }
}

function convertUserInputToCharacter(input) {
  var lowcase = input.toLowerCase();
  var noWhitespace = lowcase.replace(/ /g, '_').replace(/-/g, '_');
  var result = noWhitespace;
  if (remap[noWhitespace]) {
    result = remap[noWhitespace];
  }

  return result;
}

function getCharacter(element) {
  return getComputedStyle(element).backgroundImage.split('/').slice(-1)[0].split('.')[0];
}

function setCharacter(element, characterName) {
  var base_path = 'characters/' + characterMode + '/';
  if (use_stock_icons) {
    base_path += 'stock/';
  }
  var img_url = 'url(\"' + base_path + characterName + ".png\")";
  element.css('background-image', img_url);
}

function changeCharacter(element) {
  var result = prompt("Enter character for " + element.attr('id').substring(0, 2));
  if (result !== null && result !== "") {
    setCharacter(element, convertUserInputToCharacter(result));
  }
}

function setRound(round) {
  $('#round').html(round);
}

function changeRound() {
  var result = prompt("Enter round title");
  if (result !== null && result !== "") {
    setRound(result);
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

function getBaseUri() {
  var baseUri = "";
  if (location.hostname === "") { // local file
    baseUri = window.location.protocol + "/" + window.location.host + "/" + window.location.pathname.split('.')[0] + ".html";
  } else { // hosted site
    baseUri = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split('/')[1];
  }
  return baseUri;
}

function generateUri() {
  var org_select = document.getElementById("org_select");
  var game_select = document.getElementById("game_select");
  var tournament_name = document.getElementById("tournament_name_entry");
  var webcam_type = document.getElementById("webcam_type")
  var show_instructions = document.getElementById("show_instructions");
  var streamdeck = document.getElementById("streamdeck");
  var p1_name = document.getElementById("p1_name_entry");
  var p2_name = document.getElementById("p2_name_entry");
  var p1_char = document.getElementById("p1_char_entry");
  var p2_char = document.getElementById("p2_char_entry");
  var round = document.getElementById("round_name");
  var generated_uri = document.getElementById("generated_uri");
  var portrait_type = document.getElementById("portrait_type");
  var remote_pw = document.getElementById("remote_pw");

  // get base uri
  var baseUri = getBaseUri();

  // basic settings
  var generated_string = baseUri + "?org=" + org_select.value + "&mode=" + game_select.value;
  if (tournament_name.value.length > 0) {
    generated_string += "&tournament=" + encodeURIComponent(tournament_name.value);
  }
  if (round.value.length > 0) {
    generated_string += "&round=" + encodeURIComponent(round.value);
  }
  if (webcam_type.selectedIndex > 0) {
    generated_string += "&webcam=" + webcam_type.selectedIndex;
  }
  if (show_instructions.checked == false) {
    generated_string += "&instructions=off";
  }
  if (streamdeck.checked) {
    generated_string += "&streamdeck=true";
  }
  if (portrait_type.value === "Stock Icon") {
    generated_string += "&icon=stock";
  }
  if (remote_pw.value.length > 0) {
    generated_string += "&remote=" + encodeURIComponent(remote_pw.value);
  }

  // default fields
  function createArg(argName, valueStr) {
    if (valueStr.replace(/\s/g, '').length > 0 && valueStr != "P1" && valueStr != "P2") {
      return "&" + argName + "=" + encodeURIComponent(valueStr);
    }
    return "";
  }

  generated_string += createArg("p1name", p1_name.value);
  generated_string += createArg("p2name", p2_name.value);
  generated_string += createArg("p1char", p1_char.value);
  generated_string += createArg("p2char", p2_char.value);

  // update uri
  generated_uri.value = generated_string;

  // save current configs
  localStorage.setItem("org_select", $("#org_select").val());
  localStorage.setItem("game_select", $("#game_select").val());
  localStorage.setItem("portrait_type", $("#portrait_type").prop('selectedIndex'));
  localStorage.setItem("tournament_name_entry", $("#tournament_name_entry").val());
  localStorage.setItem("webcam_type", $("#webcam_type").prop('selectedIndex'));
}

function generateCharacterLists() {
  var game = document.getElementById("game_select").value;
  var p1_char_list = document.getElementById("p1_char_entry");
  var p2_char_list = document.getElementById("p2_char_entry");

  // clear existing list
  $("#p1_char_entry").find("option").remove();
  $("#p2_char_entry").find("option").remove();

  // add all characters
  $("#p1_char_entry").append(new Option("               ", ""));
  $("#p2_char_entry").append(new Option("               ", ""));

  for (var character in characterNameMap.get(game)) {
    var characterName = characterNameMap.get(game)[character];
    $("#p1_char_entry").append(new Option(characterName, characterName));
    $("#p2_char_entry").append(new Option(characterName, characterName));
  }

  p1_char_list.selectedIndex = 0;
  p2_char_list.selectedIndex = 0;

  generateUri();
}

function resetScores() {
  $('#p1_score').html(0);
  $('#p2_score').html(0);
}

$(document).ready(function() {
  // grab localstorage data first
  function getLocalStorageValue(key, defaultValue) {
    var val = localStorage.getItem(key);
    if (val) {
      return val;
    }
    return defaultValue;
  }

  $("#org_select").val(getLocalStorageValue("org_select", "amazon"));
  $("#game_select").val(getLocalStorageValue("game_select", "ultimate"));
  $("#portrait_type").prop('selectedIndex', getLocalStorageValue("portrait_type", 0));
  $("#tournament_name_entry").val(getLocalStorageValue("tournament_name_entry", ""));
  $("#webcam_type").prop('selectedIndex', getLocalStorageValue("webcam_type", 0));

  // get url data
  getUrlVars();
  fillDataFromVars();

  // setup callbacks
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
    $(this).parent().hide();
  });

  $(document).keypress(function(e) {
    if (streamdeck_hotkeys) {
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
    }
  });
});
