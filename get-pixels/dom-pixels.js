"use strict";

var path = require("path");
var ndarray = require("ndarray");
var GifReader = require("omggif").GifReader;
var pack = require("ndarray-pack");
var through = require("through");

function defaultImage(url, cb) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    var pixels = context.getImageData(0, 0, img.width, img.height);
    cb(
      null,
      ndarray(
        new Uint8Array(pixels.data),
        [img.width, img.height, 4],
        [4, 4 * img.width, 1],
        0
      )
    );
  };
  img.onerror = function (err) {
    cb(err);
  };
  img.src = url;
}

//Animated gif loading
function handleGif(data, cb) {
  var reader;
  try {
    reader = new GifReader(data);
  } catch (err) {
    cb(err);
    return;
  }
  if (reader.numFrames() > 0) {
    var nshape = [reader.numFrames(), reader.height, reader.width, 4];
    var ndata = new Uint8Array(nshape[0] * nshape[1] * nshape[2] * nshape[3]);
    var result = ndarray(ndata, nshape);
    try {
      for (var i = 0; i < reader.numFrames(); ++i) {
        reader.decodeAndBlitFrameRGBA(
          i,
          ndata.subarray(result.index(i, 0, 0, 0), result.index(i + 1, 0, 0, 0))
        );
      }
    } catch (err) {
      cb(err);
      return;
    }
    cb(null, result.transpose(0, 2, 1));
  } else {
    var nshape = [reader.height, reader.width, 4];
    var ndata = new Uint8Array(nshape[0] * nshape[1] * nshape[2]);
    var result = ndarray(ndata, nshape);
    try {
      reader.decodeAndBlitFrameRGBA(0, ndata);
    } catch (err) {
      cb(err);
      return;
    }
    cb(null, result.transpose(1, 0));
  }
}

function httpGif(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";
  if (xhr.overrideMimeType) {
    xhr.overrideMimeType("application/binary");
  }
  xhr.onerror = function (err) {
    cb(err);
  };
  xhr.onload = function () {
    if (xhr.readyState !== 4) {
      return;
    }
    var data = new Uint8Array(xhr.response);
    handleGif(data, cb);
    return;
  };
  xhr.send();
}

function dataGif(url, cb) {
  return fetch(url)
    .then(function (response) {
      return response.arrayBuffer();
    })
    .then(function (arrayBuffer) {
      return handleGif(new Uint8Array(arrayBuffer), cb);
    })
    .catch(function (err) {
      cb(err);
    });
}

module.exports = function getPixels(url, type, cb) {
  if (!cb) {
    cb = type;
    type = "";
  }
  var ext = path.extname(url);
  switch (type || ext.toUpperCase()) {
    case ".GIF":
      httpGif(url, cb);
      break;
    default:
      if (Buffer.isBuffer(url)) {
        url = "data:" + type + ";base64," + url.toString("base64");
      }
      if (url.indexOf("data:image/gif;") === 0) {
        dataGif(url, cb);
      } else {
        defaultImage(url, cb);
      }
  }
};
