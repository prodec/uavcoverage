var UAVCoverage = require("../dist/uavcoverage");

var phantomSensor  = { width: 6.17, height: 4.55 },
    phantomFocalLn = 5.0,
    phantomImageSz = { width: 4384, height: 3288 };

var settings = {
  sensor: phantomSensor,
  focalLength: phantomFocalLn,
  imageDimensions: phantomImageSz,
  speed: 3.0,
  captureInterval: 3.0,
  shutterSpeed: 250,
  gimbalPosition: { x: 0, y: 0 },
  groundAltitude: 100.0
};

console.log(UAVCoverage.compute(settings));
