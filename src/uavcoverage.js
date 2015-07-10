import Vector from "./vector";
import { degreesToRadians, radiansToDegrees, distance, bearing, metersToDegrees } from "./geometry";

/**
 * @typedef Dimensions
 * @type {object}
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef GimbalPosition
 * @type {object}
 * @property {number} x - degrees in the x axis
 * @property {number} y - degrees in the y axis
 */

/**
 * @typedef UAVSettings
 * @type {object}
 * @property {Dimensions} sensor - width and height of the camera sensor, in mm.
 * @property {number} focalLength - focalLength of the lens, in mm.
 * @property {Dimensions} imageDimensions - the image size output of the camera.
 * @property {number} captureInterval - the interval between each photo, in seconds.
 * @property {number} shutterSpeed - the x value in 1/x.
 * @property {number} groundAltitude - the altitude relative to the ground, in meters.
 * @property {GimbalPosition} gimbalPosition - the gimbal adjustment.
 */

/**
 * @typedef CoverageInfo
 * @type {object}
 * @property {number} groundPixelSize - ground covered by each px, in cm.
 * @property {number} imageOverlapMeters - overlap between images, in meters.
 * @property {number} imageOverlapPercent - overlap between images, in percent.
 * @property {number} imageIntervalMeters - ground covered between each image, in meters.
 * @property {Dimensions} footprint - image footprint in meters.
 * @property {number} motionBlurCentimeters - motion blur in centimeters.
 * @property {number} motionBlurPixels - motion blur in pixels.
 */

let UAVCoverage = {
  /**
   * Computes output characteristics for images taken with the
   * specified settings.
   *
   * @param {UAVSettings} settings - The settings to use
   * @return {CoverageInfo}
   */
  compute(settings) {
    return {
      groundPixelSize: groundPixelSize(settings),
      imageOverlapMeters: imageOverlapMeters(settings),
      imageOverlapPercent: imageOverlapPercent(settings),
      imageIntervalMeters: imageIntervalMeters(settings),
      footprint: footprint(settings),
      motionBlurCentimeters: motionBlurCentimeters(settings),
      motionBlurPixels: motionBlurPixels(settings)
    };
  },

  coverLine(settings, lineString) {
    let config     = UAVCoverage.compute(settings),
        lineLength = lineStringLength(lineString),
        vectors    = coordinatesToVertices(lineString["coordinates"]),
        pairs      = pairWise(vectors),
        imageCount = Math.floor(lineLength / config.imageIntervalMeters),
        images     = pairs.reduce(coverArea(config), []);

    return { config: lineLength, images: images };
  },

  coverRectangle(settings, rectangle) {
    let config = UAVCoverage.compute(settings),
        lineLength = rectangleAsLineString(rectangle);

    let coverage = {};

    return coverage;
  }
};

function captureInterval(settings) {
  let ci = settings.captureInterval;

  if (ci <= 0) {
    return 10;
  } else {
    return ci;
  }
}

function shutterSpeed(settings) {
  let ss = settings.shutterSpeed;

  if (ss <= 0) {
    return 1000;
  } else {
    return ss;
  }
}

function sensorDiagonal(settings) {
  let { width: sw, height: sh } = settings.sensor;

  return Math.sqrt(sw * sw + sh * sh);
}

function diagonalDegrees(settings) {
  let x = Math.atan(sensorDiagonal(settings) / (2 * settings.focalLength));

  return 180 * 2 * (x / Math.PI);
}

function diagonalPixels(settings) {
  let { width: px, height: py } = settings.imageDimensions;

  return Math.sqrt(px * px + py * py);
}

function diagonalMeters(settings) {
  let tan = Math.tan(Math.PI * diagonalDegrees(settings) / (2 * 180));

  return settings.groundAltitude * tan;
}

function imageIntervalMeters(settings) {
  return settings.speed * captureInterval(settings);
}

function angularResolution(settings) {
  return diagonalDegrees(settings) / diagonalPixels(settings);
}

function groundPixelSize(settings) {
  return 100 * (diagonalMeters(settings) / diagonalPixels(settings));
}

function motionBlurCentimeters(settings) {
  return 100 * settings.speed / shutterSpeed(settings);
}

function motionBlurPixels(settings) {
  return motionBlurCentimeters(settings) / groundPixelSize(settings);
}

function imageOverlapMeters(settings) {
  let yMeters = footprint(settings).width,
      interval = imageIntervalMeters(settings);

  return yMeters - interval;
}

function imageOverlapPercent(settings) {
  let o = imageOverlapMeters(settings),
      gh = footprint(settings).width;

  if (o <= 0) {
    return 0.0;
  } else {
    return 100 * o / gh;
  }
}

function footprint(settings) {
  let { width: px, height: py } = settings.imageDimensions;
  let dm = diagonalMeters(settings),
      dpx = diagonalPixels(settings),
      width = px * dm / dpx,
      height = py * dm/ dpx;

  return { width: width, height: height };
}

function lineStringLength(lineString) {
  let vs = coordinatesToVertices(lineString["coordinates"]),
      pairs = pairWise(vs);

  return pairs.reduce(((d, p) => d + distance(p[0], p[1])), 0);
}

function rectangleAsLineString(rectangle) {

}

function pairWise(xs) {
  let pairs = [];

  if (xs.length > 1) {
    for (let i = 0; i < xs.length - 1; i++) {
      pairs.push([xs[i], xs[i + 1]]);
    }
  }

  return pairs;
}

function coordinatesToVertices(vs) {
  return vs.map(c => new Vector(c[0], c[1]));
}

function coverArea(config) {
  return (images, vs) => {
    let [v0, v1] = vs,
        dist     = distance(v0, v1),
        accDist  = 0.0,
        b        = bearing(v0, v1),
        dir      = v1.subtract(v0);

    while ((accDist + config.imageIntervalMeters) < dist) {
      // TODO: Offsets in terms of Proj4
      let a = dir.multiplyScalar(metersToDegrees(v0.y, accDist));
      let v = v0.add(a);

      images.push({ center: { x: v.x, y: v.y }, bearing: b });

      accDist += config.imageIntervalMeters;
    }

    return images;
  };
}

export default UAVCoverage;
