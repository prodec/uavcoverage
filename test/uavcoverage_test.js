import UAVCoverage from "../src/uavcoverage";
import assert from "assert";
import qc from "quickcheck";
import { distance } from "../src/geometry";
import Vector from "../src/vector";

describe("UAVCoverage", () => {
  describe("camera settings", () => {
    it("increases or decreases coverage depending on the altitude", () => {
      let increasesProp = (v) => {
        let a = compute(defaultSettings({ altitude: v })),
            b = compute(defaultSettings({ altitude: v + 50 }));

        return a.groundPixelSize < b.groundPixelSize &&
          a.imageOverlapMeters < b.imageOverlapMeters &&
          a.footprint.width < b.footprint.width &&
          a.footprint.height < b.footprint.height &&
          a.imageInterval == b.imageInterval &&
          a.motionBlurPixels > b.motionBlurPixels &&
          a.imageOverlapMeters < b.imageOverlapMeters;
      };

      assert.equal(true, qc.forAll(increasesProp, rangedInt));
    });
  });

  it("covers line based on the calculated interval", () => {
    let lineString = {
      coordinates: [
        [-44.314404300729855, -20.135647010970875],
        [-44.313197306673, -20.13628916929075]
      ]
    };
    let covered = coverLine(defaultSettings(), lineString),
        images = covered.images,
        coveredLength = 0.0;

    for (let i = 0; i < images.length - 2; i++) {
      let v0 = new Vector(images[i].center.x, images[i].center.y),
          v1 = new Vector(images[i + 1].center.x, images[i + 1].center.y);

      coveredLength += distance(v0, v1);
    }

    assert.equal(17, (covered.images.length));
    assert(coveredLength <= covered.flightLength);
  });

  function defaultSettings(options = {}) {
    return {
      sensor: {
        width: options.sensorWidth || 36,
        height: options.sensorHeight || 24
      },
      focalLength: 24.0,
      imageDimensions: {
        width: options.imWidth || 4384,
        height: options.imHeight || 3288
      },
      groundAltitude: options.altitude || 100,
      speed: options.speed || 3.0,
      captureInterval: options.captureInterval || 3.0,
      shutterSpeed: options.shutterSpeed || 250,
      gimbalX: options.gimbalX || 0,
      gimbalY: options.gimbalY || 0
    };
  }

  let compute = UAVCoverage.compute;
  let coverLine = UAVCoverage.coverLine;

  function rangedInt() {
    if (qc.arbBool()) {
      return Math.floor(Math.random() * 150) + 1;
    } else {
      return Math.floor(Math.random() * 80) + 1;
    }
  }
});
