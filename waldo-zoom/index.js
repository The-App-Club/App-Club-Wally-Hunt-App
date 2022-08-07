function removeTailUnit(valueWithUnit, unitName) {
  const regexp = new RegExp(unitName + "(.*?)", "g");
  return Number(valueWithUnit.replace(regexp, ""));
}

function getCssPropertyValue(targetDom, targetCssPropertyName) {
  return window
    .getComputedStyle(targetDom)
    .getPropertyValue(targetCssPropertyName);
}

function niceRolling() {
  function marquee() {
    requestAnimationFrame(marquee);
    const magDom = document.querySelector(`.mag`);
    const magDomWidth = removeTailUnit(
      getCssPropertyValue(magDom, "--mag-width"),
      "px"
    );
    const magDomHeight = removeTailUnit(
      getCssPropertyValue(magDom, "--mag-height"),
      "px"
    );
    magDom.style.transform = `translate3d(${magX - magDomHeight / 2}px, ${
      magY - magDomWidth / 2
    }px, 0px) rotate(30deg)`;
  }
  marquee();
}

function convertObjectToJson(targetObject) {
  return JSON.stringify(targetObject);
}

function convertJsonToObject(targetJson) {
  return JSON.parse(targetJson);
}

function disconnectObserve(targetObject) {
  return convertJsonToObject(convertObjectToJson(targetObject));
}

function clamp(n, min, max) {
  if (n > max) {
    return max;
  } else if (n < min) {
    return min;
  } else {
    return n;
  }
}

function setMousePosition(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  magX = lerp(magX, mouseX, 0.2);
  magY = lerp(magY, mouseY, 0.2);
  const magDom = document.querySelector(`.mag`);
  const magDomWidth = removeTailUnit(
    getCssPropertyValue(magDom, "--mag-width"),
    "px"
  );
  const magDomHeight = removeTailUnit(
    getCssPropertyValue(magDom, "--mag-height"),
    "px"
  );

  const revealerOffsetLeft = magX - wallpaperDomLeft;
  const revealerOffsetTop = magY - wallpaperDomTop;
  const xPercent = (revealerOffsetLeft / wallpaperDomWidth) * 100;
  const yPercent = (revealerOffsetTop / wallpaperDomHeight) * 100;
  if (0 > xPercent || 100 < xPercent) {
    return;
  }
  if (0 > yPercent || 100 < yPercent) {
    return;
  }
  revealerDom.style.clipPath = `circle(${magDomWidth / 2}px at ${xPercent}% ${yPercent}%)`;
  revealerDom.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
}

function lerp(start, end, delta) {
  return (1 - delta) * start + delta * end;
}

document.addEventListener("mousemove", setMousePosition, false);

const wallpaperDom = document.querySelector(".wallpaper");
const revealerDom = document.querySelector(".revealer");
const { x, y } = disconnectObserve(wallpaperDom.getBoundingClientRect());
const wallpaperDomTop = y;
const wallpaperDomLeft = x;

const magDomWidth = removeTailUnit(
  getCssPropertyValue(document.body, "--mag-width"),
  "px"
);
const magDomHeight = removeTailUnit(
  getCssPropertyValue(document.body, "--mag-height"),
  "px"
);

const wallpaperDomWidth = removeTailUnit(
  getCssPropertyValue(document.body, "--preview-area-width"),
  "px"
);
const wallpaperDomHeight = removeTailUnit(
  getCssPropertyValue(document.body, "--preview-area-height"),
  "px"
);
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let magX = mouseX;
let magY = mouseY;

niceRolling();
