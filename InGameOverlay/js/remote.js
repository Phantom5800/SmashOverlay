const bc = new BroadcastChannel("overlay_channel=" + remote_control_password);

bc.onmessage = function(ev) {
    if (ev.data === "[REFRESH]") {
        bc.postMessage(buildUpdateMessage());
    } else if (ev.data === "[VERIFY_CONNECTION]") {
        bc.postMessage("[CONNECTED]");
    } else if (ev.data.includes("[UPDATE_OVERLAY]")) {
        var data = ev.data.split('\n');
        for (i in data) {
            parseMsg(data[i]);
        }
    }
}

function parseMsg(msg) {
    var msgParts = msg.split('=');
    console.log(msgParts);
    if (msgParts[0] === "p1char") {
        setCharacter($("#p1_name"), msgParts[1]);
    } else if (msgParts[0] === "p2char") {
        setCharacter($("#p2_name"), msgParts[1]);
    } else if (msgParts[0] === "p1name") {
        setName($("#p1_name"), msgParts[1]);
    } else if (msgParts[0] === "p2name") {
        setName($("#p2_name"), msgParts[1]);
    } else if (msgParts[0] === "p1score") {
        setName($("#p1_score"), msgParts[1]);
    } else if (msgParts[0] === "p2score") {
        setName($("#p2_score"), msgParts[1]);
    } else if (msgParts[0] === "round") {
        setRound(msgParts[1]);
    }
}

function buildUpdateMessage() {
    var message = "[DATA-UPDATE]";
    message += "\ntournament=" + getUrlParam("tournament", "");
    message += "\nmode=" + getUrlParam("mode", "ultimate");
    message += "\np1name=" + $("#p1_name").html();
    message += "\np2name=" + $("#p2_name").html();
    message += "\np1char=" + getCharacter(document.getElementById("p1_name"));
    message += "\np2char=" + getCharacter(document.getElementById("p2_name"));
    message += "\np1score=" + $("#p1_score").html();
    message += "\np2score=" + $("#p2_score").html();
    message += "\nround=" + $("#round").html();
    message += "\n[/DATA-UPDATE]"
    return message;
}
