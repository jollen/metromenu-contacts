var bubble = {
};

window.addEventListener("load", function() {

Modernizr.load([
    {
        load : [
            "sizzle.js",
            "dom.js",
            "game.js",
            "websocket.js"
        ],
        complete : function() {
            bubble.game.initialize();
        }
    }
]);

}, false);
