var bc = new BroadcastChannel("overlay_channel=");

bc.onmessage = onMessage;
function onMessage(ev) {
    if (ev.data.includes("[DATA-UPDATE]")) {
        data = ev.data.split('\n');
        console.log(data);
    } else if (ev.data === "[CONNECTED]") {
        $("#connection_result").html("&#128994;");
    }
}

$(document).ready(function() {

    // update BroadcastChannel
    $("#connection_pw").change(function() {
        $("#connection_result").html("&#128308;");
        bc.close();
        bc = new BroadcastChannel("overlay_channel=" + $("#connection_pw").val());
        bc.onmessage = onMessage;
        console.log(bc.name);
    });

});

function verifyConnection() {
    $("#connection_result").html("&#128308;");
    bc.postMessage("[VERIFY_CONNECTION]");
}

function requestUpdate() {
    bc.postMessage("[REFRESH]");
}

function publishUpdate() {
    var msg = "[UPDATE_OVERLAY]";
    msg += "\np1char=snake";
    msg += "\np2char=pikachu";
    msg += "\np1name=MVD";
    msg += "\np2name=ESAM";
    msg += "\np1score=2";
    msg += "\np2score=1";
    msg += "\nround=Grand Finals";

    bc.postMessage(msg);
}

function parseUpdate() {

}
