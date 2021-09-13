if (window.DeviceOrientationEvent) {
    console.log("Device Orientation is supported");

    window.addEventListener('deviceorientation', (eventData) => {
        this.setState({
            alpha: eventData.alpha,
            beta: eventData.beta,
            gamma: eventData.gamma
        });
    }, false);
} else {
    console.log("Device Orientation is not supported");
}

