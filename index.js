/*
window.addEventListener('deviceorientation', function (event) {
    console.log(event.alpha + ':' + event.beta + ':' + event.gamma);
});
*/

/*
if (window.DeviceOrientationEvent) {

    console.log("Device is compatible");

    window.addEventListener("deviceorientation", function (event) {
        // alpha: rotation around z-axis
        var rotateDegrees = event.alpha;
        // gamma: left to right
        var leftToRight = event.gamma;
        // beta: front back motion
        var frontToBack = event.beta;

        handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
    }, true);
}

var handleOrientationEvent = function (frontToBack, leftToRight, rotateDegrees) {
    // do something amazing
    console.log(frontToBack + ':' + leftToRight + ':' + rotateDegrees);
};
*/
/*
window.addEventListener('devicemotion', function (event) {
    console.log(event.acceleration.x + 'm/s2');
});
*/

/*
window.addEventListener('ondeviceorientation', function (event) {
    console.log(event.beta + ":" + event.alpha + ":" + event.gamma);
}, true);
*/

let sensor = new Gyroscope();
sensor.start();

sensor.onreading = () => {
    console.log("Angular velocity around the X-axis " + sensor.x);
    console.log("Angular velocity around the Y-axis " + sensor.y);
    console.log("Angular velocity around the Z-axis " + sensor.z);
};

sensor.onerror = event => console.log(event.error.name, event.error.message);