# UAVCoverage

## Uso

A biblioteca por ora só possui um ponto de entrada: a função `compute`. Tal função recebe um objeto com as seguintes propriedades:

``` javascript
{
  sensor: { width: <number>, height: <number> },          // in milimeters
  focalLength: <number>,                                  // in milimeters
  imageDimensions: { width: <number>, height: <number> }, // in pixels
  captureInterval: <number>,                              // in seconds
  shutterSpeed: <number>,                                 // 1/<x>
  groundAltitude: <number>                                // in meters
  gimbalPosition: { x: <number>, y: <number> }            // in degrees
}
```

Exemplo:

``` javascript
// examples/basic.js
var UAVCoverage = require("uavcoverage");

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
```

Rodando:

``` shell
$ node examples/basic.js
{ groundPixelSize: 1.3989508601010865,
  imageOverlapMeters: 52.33000570683163,
  imageOverlapPercent: 85.3252907834028,
  imageIntervalMeters: 9,
  footprint: { width: 61.33000570683163, height: 45.99750428012372 },
  motionBlurCentimeters: 1.2,
  motionBlurPixels: 0.857785669407494 }
```
