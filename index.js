/*
window.addEventListener('deviceorientation', function (event) {
    console.log(event.alpha + ':' + event.beta + ':' + event.gamma);
});
*/
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