var socket = io();
var userId = "user";


$('form').submit(function() {
    socket.emit('chat message', {value: $('#m').val(), userId: userId});
    $('#m').val('');
    return false;
});

$("#toogle-link").on('click', function(e){
    socket.emit('toogle', {value: 0, userId: userId});
});

socket.on('toogle', function(msg) {
    if(msg.value === false) {
        $('#messages').prepend($('<li>Toogle: OFF<span> - '+msg.userId+'</span></li>'));
        $("#toogle-container").removeClass("on");
        $("#toogle-container").addClass("off");
        $("#toogle-container span").text("OFF");
    }
    else if(msg.value === true) {
        $('#messages').prepend($('<li>Toogle: ON<span> - '+msg.userId+'</span></li>'));
        $("#toogle-container").removeClass("off");
        $("#toogle-container").addClass("on");
        $("#toogle-container span").text("ON");        
    }
});

$("#clean-link").on('click', function(e){
    socket.emit('clean', {value: 0, userId: userId});
});

socket.on('clean', function(msg) {
    if(msg.value === false) {
        $('#messages').prepend($('<li>Clean: OFF<span> - '+msg.userId+'</span></li>'));
        $("#clean-container").removeClass("on");
        $("#clean-container").addClass("off");
        $("#clean-container span").text("OFF");
    }
    else if(msg.value === true) {
        $('#messages').prepend($('<li>Clean: ON<span> - '+msg.userId+'</span></li>'));
        $("#clean-container").removeClass("off");
        $("#clean-container").addClass("on");
        $("#clean-container span").text("ON");        
    }
});

socket.on('chat message', function(msg) {
    $('#messages').prepend($('<li>'+msg.value+'<span> - '+msg.userId+'</span></li>'));
});

socket.on('connected users', function(msg) {
    $('#user-container').html("");
    for(var i = 0; i < msg.length; i++) {
        //console.log(msg[i]+" )msg[i] == userId( "+userId);
        if(msg[i] == userId)
            $('#user-container').append($("<div id='" + msg[i] + "' class='my-circle'><span>"+msg[i]+"</span></div>"));
        else
            $('#user-container').append($("<div id='" + msg[i] + "' class='user-circle'><span>"+msg[i]+"</span></div>"));
    }
});

socket.on('user connect', function(msg) {
    if(userId === "user"){
        console.log("Client side userId: "+msg);
        userId = msg;
    }
});

socket.on('user disconnect', function(msg) {
    console.log("user disconnect: " + msg);
    var element = '#'+msg;
    console.log(element)
    $(element).remove();
});

window.onunload = function(e) {
    socket.emit("user disconnect", userId);
}