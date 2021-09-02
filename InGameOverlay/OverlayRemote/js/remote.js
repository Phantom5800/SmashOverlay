var bc = new BroadcastChannel("overlay_channel");

bc.onmessage = onMessage;
function onMessage(ev) {
    if (ev.data.includes("[DATA-UPDATE]")) {
        data = ev.data.split('\n');
        console.log(data);
    }
}

$(document).ready(function() {

});

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
