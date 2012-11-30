bubble.websocket = (function () {
    var ws;

    function createWebsocket() {
        ws = new WebSocket("ws://svn.moko365.com:8080/", "game-protocol");
    }

    function getWebSocket() {
        return ws;
    }

    return {
        createWebsocket: createWebsocket,
        getWebSocket: getWebSocket
    };
}) ();
