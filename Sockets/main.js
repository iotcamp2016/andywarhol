/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
The Web Sockets Node.js sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to use the socket.io NodeJS module to enable real time communication between clients and the development board via a web browser to toggle the state of the onboard LED.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing/updating MRAA & UPM Library on Intel IoT Platforms with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

OR
In Intel XDK IoT Edition under the Develop Tab (for Internet of Things Embedded Application)
Develop Tab
1. Connect to board via the IoT Device Drop down (Add Manual Connection or pick device in list)
2. Press the "Settings" button
3. Click the "Update libraries on board" option

Review README.md file for in-depth information about web sockets communication

*/

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var https = require('https');

var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output


var ledState = true; //Boolean to hold the state of Led
var cleanState = false;
var drawState = false;

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connectedUsersArray = [];
var userId;

app.get('/', function(req, res) {
    //Join all arguments together and normalize the resulting path.
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
});

//Allow use of files in client folder
app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

//Socket.io Event handlers
io.on('connection', function(socket) {
    console.log("\n Add new User: u"+connectedUsersArray.length);
    if(connectedUsersArray.length > 0) {
        var element = connectedUsersArray[connectedUsersArray.length-1];
        userId = 'u' + (parseInt(element.replace("u", ""))+1);
    }
    else {
        userId = "u0";
    }
    console.log('a user connected: '+userId);
    io.emit('user connect', userId);
    connectedUsersArray.push(userId);
    console.log('Number of Users Connected ' + connectedUsersArray.length);
    console.log('User(s) Connected: ' + connectedUsersArray);
    io.emit('connected users', connectedUsersArray);
    
    socket.on('user disconnect', function(msg) {
        console.log('remove: ' + msg);
        connectedUsersArray.splice(connectedUsersArray.lastIndexOf(msg), 1);
        io.emit('user disconnect', msg);
    });
    
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        console.log('message: ' + msg.value);
    });
    

    var erase = function()
    {
    setMove( [
    [-40,55, true],
    [40,55,true],
    [0,40, true],
    [-20,60, true],
    [20,60, true],
    [-40,65, true],
    [40,65, true],
    [0, 80, true],
    [-40,55,true],
    [-40,55,false]
    ]);
    }

    function one()
    {
    setMove( [
    [-5,65, false],
    [-5,65, true],
    [13,80, true],
    [0,40, true],
    [0,40, false],
    ]);
    }

    function two()
    {
    setMove( [
    [-5,85,false],
    [-5,85,true],
    [20,85, true],
    [20,75, true],
    [-5,75, true],
    [-5,55, true],
    [20,55, true],
    [20,55, false],
    [-40,55, false]
    ]);
    setDefault();

    }
    function three() 
    { 
    setMove([ 
    [-5,80, false], 
    [-5,80, true], 
    [10,80, true], 
    [-5,65, true], 
    [10,65, true], 
    [-5,50, true], 
    [-5,50, false], 
    [-40,55, false]
    ]); 
    }
    function four() 
    { 
    setMove([ 
    [10,65, false], 
    [10,65, true], 
    [-10,65, true], 
    [5,85, true], 
    [-3,45, true], 
    [-3,45, false], 
    [-40,55, false]
    ]); 
    }
    function five() 
    { 
    setMove([ 
    [13,80, false], 
    [13,80, true], 
    [-5,80, true], 
    [-5,65, true], 
    [10,65, true], 
    [10,50, true], 
    [-5,50, true], 
    [-5,50, false], 
    [-40,55, false]
    ]); 
    }
    function six() 
    { 
    setMove([ 
    [10,80, false], 
    [10,80, true], 
    [-5,65, true], 
    [-5,50, true], 
    [10,50, true], 
    [10,65, true], 
    [-5,65, true], 
    [-5,65, false], 
    [-40,55, false]
    ]); 
    }
    function seven() 
    { 
    setMove([ 
    [-5,80, false], 
    [-5,80, true], 
    [10,77, true],
    [-5,50, true], 
    [-5,50, false],
    [-40,55, false]
    ]); 
    }
    function eight() 
    { 
    setMove([ 
    [-5,65, false], 
    [-5,65, true], 
    [-5,80, true], 
    [10,83, true], 
    [10,65, true], 
    [-5,65, true],
    [-5,45, true], 
    [10,45, true], 
    [10,65, true], 
    [10,65, false], 
    [-40,55, false]
    ]); 
    }
    function nine() 
    { 
    setMove([ 
    [10,65, false], 
    [10,65, true], 
    [-5,65, true], 
    [-5,83, true], 
    [10,80, true], 
    [10,65, true],
    [-5,45, true], 
    [-5,45, false],
    [-40,55, false] 
    ]); 
    }

    function zero() 
    { 
    setMove([ 
    [-5,80, false], 
    [-5,80, true], 
    [10,77, true], 
    [10,45, true], 
    [-7,45, true], 
    [-5,80, true], 
    [-5,80, false], 
    [-40,55, false] 
    ]); 
    } 

    function move(args) {
    if (args[2])
    moveDown();
    else
    moveUp();
    var anglesArray = getAngles(args[0], args[1]);
    console.log(anglesArray);
    console.log(args);
    servo3.setAngle(anglesArray[1]);
    servo5.setAngle(anglesArray[0]);
    };

    function setMove(moves)
    {
    for (var i in moves) {
    move(moves[i]);
    sleep(800);
    }
    };

    function sleep(ms) {
    console.log("Sleep");
    ms += new Date().getTime();
    while (new Date() < ms){}
    } 

    function getAngles(x, y) { 
    var L1 = 35, L2 = 57, a=45, b=15, r=15; 
    var ab=Math.sqrt(y * y + (x - r) * (x - r)); 
    var alpha=Math.acos((L1 * L1 + ab * ab - L2 * L2) / (2 * ab * L1)); 
    var betha = (Math.atan((y / (x - r)))+Math.PI)%Math.PI; 
    var gamma=(betha-alpha) *180 / Math.PI; 

    var alpha0 = Math.PI - ((Math.atan(y/(x-r))+Math.PI)%Math.PI) - Math.acos((y*y+(x-r)*(x-r)+L2*L2-L1*L1)/(2*Math.sqrt(y*y+(x-r)*(x-r))*L2)) + Math.acos((L2*L2+b*b-a*a)/(2*L2*b)); 

    var x1 = x + b * Math.cos(alpha0); 
    var y1 = y - b * Math.sin(alpha0);

    var ab2=Math.sqrt(y1*y1+(x1 + r) * (x1 + r)); 
    var q1=((Math.atan(y1 / (x1 + r))+Math.PI)%Math.PI)*180 / Math.PI;
    var arg=(ab2 * ab2 + L1 * L1 - a * a) / (2 * L1 * ab2); 
    var q2=Math.acos(arg)*180 / Math.PI; 

    var q =180-(q1+q2); 
    if (q<0) q = 0;
    if (1>180) q = 180;
    if (gamma>90) gamma = 90;
    if (gamma<-90) gamma = -90;
    return [180-q, 90+gamma]; 
    };
    
    var handle = function(msgs) {
        if (msgs === {})
                return;
        if (msgs['ok'] && ((msgs['result'].length) !== 0)) {
            for (var i in msgs['result']) {
                text = msgs['result'][i]['message']['text'];
                if (text === undefined)
                    continue;
                for (var j in text) {
                    console.log(text[j]);
                    if(checkmsg(text[j])) {
                        if (text[j] === 'c') {
                            send("Drawing " + text[j], msgs['result'][i]['message']['chat']['id']);
                            draw(text[j]);
                        } else {
                            send("Cleaning", msgs['result'][i]['message']['chat']['id']);
                            socket.emit('clean', {value: 0, userId: userId});
                        }
                    }
                }
            }
        }
    }
    
    var makeRequest = function(method, path, responseIsNeeded) {
        try {
            var req = https.request({ 
                method: method,
                host: "api.telegram.org",
                path: path,
                port: 443
            }, function(res) {
                if (responseIsNeeded)
                    res.on('data', handle(chunk));
            });
            req.end();
//            console.log("Resp:" + response);
//            return response;
        } catch (e) {
            console.log("In request: " + e);
        }
    };
    
    var get = function() {
        var toffset=0;
        var timeout=29;
        try {
            makeRequest("POST", "/bot264797622:AAHheA7_2zAlqQ1atdLnpGDxLyRD9GcpA7E/getUpdates" +
                     "?offset=" + (toffset+1) + "&timeout=" + timeout, true);
//            console.log(new_msgs);
//            if (new_msgs === {})
//                return {};
//            if (new_msgs['ok'] && ((new_msgs['result'].length) !== 0))
//                    return new_msgs;
        } catch (e) {
            console.log("In get: " + e);
        }
        return;
    };

    var send = function(message, chat_id){
        var reply_to_message_id = 0;
        try {
            var req = new XMLHttpRequest();
            makeSendRequest("POST", "https://api.telegram.org/bot264797622:AAHheA7_2zAlqQ1atdLnpGDxLyRD9GcpA7E/sendMessage" +
                     "?chat_id=" + chat_id + "&text=" + message + (reply_to_message_id === 0 ? "" : ('&reply_to_message_id=' + reply_to_message_id)), false);
            req.send(null);
        } catch (e) {
            console.log("In send: " + e);
        }
        return message;
    };
    
    var checkmsg = function(char) {
        return char === 'c' || (char >= '0' && char <= '9');
    };
    
    Function.prototype.process= function( state ){
    var process= function( ){
        var args= arguments;
        var self= arguments.callee;
        setTimeout( function( ){
            self.handler.apply( self, args );
            }, 0 );
        }
        for( var i in state ) process[ i ]= state[ i ];
        process.handler= this;
        return process;
    };
    
    var draw = function(num) {
        console.log(num + " draw");
        drawState = true;
        switch(num) {
            case '0': zero(); break;
            case '1': one(); break;
            case '2': two(); break;
            case '3': three(); break;
            case '4': four(); break;
            case '5': five(); break;
            case '6': six(); break;
            case '7': seven(); break;
            case '8': eight(); break;
            case '9': nine(); break;
        }
        drawState = false;
    };
    
    draw = draw.process();
//    var ledState = false;
    
    var cycle = function() {
        var text;
        while (!ledState) {
            var msgs = makeRead(); //Repair 
            handle(msgs)
//            do {
            sleep(5000);
//            } while (cleanState);
//            break;
        }
    };

    cycle = cycle.process();
    
    socket.on('toogle', function(msg) {
        myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
        msg.value = ledState;
        io.emit('toogle', msg);
        ledState = !ledState; //invert the ledState
        setDefault();
        draw('9');
//        cycle(); //Repair & Test
    });
    
    socket.on('clean', function(msg) {
        if (!cleanState) {
            cleanState = !cleanState; //invert the cleanState
            msg.value = cleanState;
            io.emit('clean', msg);
            erase();
            cleanState = !cleanState; //invert the cleanState
            msg.value = cleanState;
            io.emit('clean', msg);
        }
    });
});

function moveUp(){ angle6 = 125; servo6.setAngle(angle6);}

function moveDown(){ angle6 = 160; servo6.setAngle(angle6);}

function setDefault() {
    angle3=180;
    angle5=150;
    moveUp();
    servo3.setAngle(angle3);
    servo5.setAngle(angle5);
    };

var servoModule = require("jsupm_servo"); //библиотека jsupm_servo
var Math = require('mathjs');

var servo6 = new servoModule.ES08A(6); //6pin 
var servo5 = new servoModule.ES08A(5); //5pin
var servo3 = new servoModule.ES08A(3); //3pin
var angle6, angle5, angle3;

setDefault();

http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');
});