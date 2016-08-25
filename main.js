var mraa = require('mraa'); 
console.log('1MRAA Version: ' + mraa.getVersion()); //библиотека MRAA
var servoModule = require("jsupm_servo"); //библиотека jsupm_servo

var Math = require('mathjs');

var servo6 = new servoModule.ES08A(6); //6pin 
var angle6 = 150;
servo6.setAngle(angle6);
var servo5 = new servoModule.ES08A(5); //5pin
var angle5 = 180;
servo5.setAngle(angle5);
var servo3 = new servoModule.ES08A(3); //3pin
var angle3 = 180;
servo3.setAngle(angle3);

function getAngles(x, y) 
{  
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

//  console.log("right: " +gamma); 
//  console.log("left: "+q); 

  return [180-q, 90+gamma];  
}

function move(x, y) {
var anglesArray = getAngles(x, y);
servo3.setAngle(anglesArray[1]);
servo5.setAngle(anglesArray[0]);
}

function toStart() {
servo3.setAngle(180);
servo5.setAngle(180);
}

//console.log(getAngles(-10, 65));
//console.log(getAngles(0, 75));
//console.log(getAngles(0, 50));

function move0(){
    servo6.setAngle(160);
    move(-10, 65);
}

function move1(){
    servo6.setAngle(150);
    move(0, 75);
}
function move2(){
    move(0, 50);
    servo6.setAngle(160);
}
setTimeout(toStart, 1000);
setTimeout(move0, 2000);
setTimeout(move1, 3000);
setTimeout(move2, 4000);
setTimeout(toStart, 5000);
