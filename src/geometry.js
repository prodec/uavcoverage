export function degreesToRadians(d) {
  return d * (Math.PI / 180.0);
}

export function radiansToDegrees(r) {
  return r * (180 / Math.PI);
}

let EARTH_RADIUS = 6378137; // in meters

export function distance(v0, v1) {
  let dx = degreesToRadians(v1.x) - degreesToRadians(v0.x),
      dy = degreesToRadians(v1.y) - degreesToRadians(v0.y),
      a  = Math.pow(Math.sin(dy / 2.0), 2) + Math.cos(degreesToRadians(v0.y)) *
        Math.cos(degreesToRadians(v1.y)) * Math.pow(Math.sin(dx / 2.0), 2),
      c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return c * EARTH_RADIUS;
}

export function bearing(v0, v1) {
  let y = Math.sin(v1.x - v0.x) * Math.cos(v1.y),
      x = Math.cos(v0.y) * Math.sin(v1.y) -
        Math.sin(v0.y) * Math.cos(v1.y) * Math.cos(v1.x - v0.x);

  return radiansToDegrees(Math.atan2(y, x));
}

let KM_PER_DEGREE = 111.320;
export function metersToDegrees(latitude, meters) {
  return (meters / 1000) / (KM_PER_DEGREE * Math.cos(latitude * (Math.PI / 180)));
}
