characterList = [
];

function getImageUrl(character, colorIdx) {
    var color = colorIdx > 1 ? colorIdx : "";
    return "https://www.smashbros.com/assets_v2/img/fighter/" + character + "/main" + color + ".png";
}

function fillColorSelect(selectField) {
    for (var i = 1; i < 9; ++i) {
        selectField.add(new Option(i));
    }
}

function parseResponseIntoTable(data) {
    var lines = data.split("\n");

    var version = parseInt(lines[0].split(",")[1]);
    if (version !== 3) return;

    var characterTable = new Array();
    for (var i = 4; i < lines.length; ++i) {
        var characterPair = lines[i].split(",");
        if (characterPair.length == 2) {
            characterTable.push(characterPair);
        }
    }
    return characterTable;
}

function fillCharacterListFromDac(dacFile) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            characterList = parseResponseIntoTable(this.response);
        }
    }
    request.open("GET", dacFile);
    request.send();
}

function fillCharacterList(selectField) {
    selectField.add(new Option("--", ""));
    selectField.add(new Option("Mario", "mario"));
    selectField.add(new Option("Donkey Kong", "donkey_kong"));
    selectField.add(new Option("Link", "link"));
    selectField.add(new Option("Samus", "samus"));
    selectField.add(new Option("Dark Samus", "dark_samus"));
    selectField.add(new Option("Yoshi", "yoshi"));
    selectField.add(new Option("Kirby", "kirby"));
    selectField.add(new Option("Fox", "fox"));
    selectField.add(new Option("Pikachu", "pikachu"));
    selectField.add(new Option("Luigi", "luigi"));
    selectField.add(new Option("Ness", "ness"));
    selectField.add(new Option("Captain Falcon", "captain_falcon"));
    selectField.add(new Option("Jigglypuff", "jigglypuff"));
    selectField.add(new Option("Peach", "peach"));
    selectField.add(new Option("Daisy", "daisy"));
    selectField.add(new Option("Bowser", "bowser"));
    selectField.add(new Option("Ice Climbers", "ice_climbers"));
    selectField.add(new Option("Sheik", "sheik"));
    selectField.add(new Option("Zelda", "zelda"));
    selectField.add(new Option("Dr. Mario", "dr_mario"));
    selectField.add(new Option("Pichu", "pichu"));
    selectField.add(new Option("Falco", "falco"));
    selectField.add(new Option("Marth", "marth"));
    selectField.add(new Option("Lucina", "lucina"));
    selectField.add(new Option("Young Link", "young_link"));
    selectField.add(new Option("Ganondorf", "ganondorf"));
    selectField.add(new Option("Mewtwo", "mewtwo"));
    selectField.add(new Option("Roy", "roy"));
    selectField.add(new Option("Chrom", "chrom"));
    selectField.add(new Option("Mr. Game & Watch", "mr_game_and_watch"));
    selectField.add(new Option("Meta Knight", "meta_knight"));
    selectField.add(new Option("Pit", "pit"));
    selectField.add(new Option("Dark Pit", "dark_pit"));
    selectField.add(new Option("Zero Suit Samus", "zero_suit_samus"));
    selectField.add(new Option("Wario", "wario"));
    selectField.add(new Option("Snake", "snake"));
    selectField.add(new Option("Ike", "ike"));
    selectField.add(new Option("Pokemon Trainer", "pokemon_trainer"));
    selectField.add(new Option("Diddy Kong", "diddy_kong"));
    selectField.add(new Option("Lucas", "lucas"));
    selectField.add(new Option("Sonic", "sonic"));
    selectField.add(new Option("King Dedede", "king_dedede"));
    selectField.add(new Option("Olimar", "olimar"));
    selectField.add(new Option("Lucario", "lucario"));
    selectField.add(new Option("R.O.B.", "rob"));
    selectField.add(new Option("Toon Link", "toon_link"));
    selectField.add(new Option("Wolf", "wolf"));
    selectField.add(new Option("Villager", "villager"));
    selectField.add(new Option("Mega Man", "mega_man"));
    selectField.add(new Option("Wii Fit Trainer", "wii_fit_trainer"));
    selectField.add(new Option("Rosalina & Luma", "rosalina_and_luma"));
    selectField.add(new Option("Little Mac", "little_mac"));
    selectField.add(new Option("Greninja", "greninja"));
    selectField.add(new Option("Palutena", "palutena"));
    selectField.add(new Option("Pac-Man", "pac_man"));
    selectField.add(new Option("Robin", "robin"));
    selectField.add(new Option("Shulk", "shulk"));
    selectField.add(new Option("Bowser Jr.", "bowser_jr"));
    selectField.add(new Option("Duck Hunt", "duck_hunt"));
    selectField.add(new Option("Ryu", "ryu"));
    selectField.add(new Option("Ken", "ken"));
    selectField.add(new Option("Cloud", "cloud"));
    selectField.add(new Option("Corrin", "corrin"));
    selectField.add(new Option("Bayonetta", "bayonetta"));
    selectField.add(new Option("Inkling", "inkling"));
    selectField.add(new Option("Ridley", "ridley"));
    selectField.add(new Option("Simon", "simon"));
    selectField.add(new Option("Richter", "richter"));
    selectField.add(new Option("King K Rool", "king_k_rool"));
    selectField.add(new Option("Isabelle", "isabelle"));
    selectField.add(new Option("Incineroar", "incineroar"));
    selectField.add(new Option("Piranha Plant", "piranha_plant"));
    selectField.add(new Option("Joker", "joker"));
    selectField.add(new Option("Hero", "dq_hero"));
    selectField.add(new Option("Banjo and Kazooie", "banjo_and_kazooie"));
    selectField.add(new Option("Terry", "terry"));
    selectField.add(new Option("Byleth", "byleth"));
}
