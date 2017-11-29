function openChat() {
    var border = document.getElementById("chat-frame");
    border.className = "";
    var img = document.getElementById("chat-button");
    img.className = "hide";
}

function closeChat() {
    var border = document.getElementById("chat-frame");
    border.className = "hide";
    var img = document.getElementById("chat-button");
    img.className = "";
}