function removeTailUnit(valueWithUnit, unitName) {
  const regexp = new RegExp(unitName + '(.*?)', 'g');
  return Number(valueWithUnit.replace(regexp, ''));
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
      getCssPropertyValue(magDom, '--mag-width'),
      'px'
    );
    const magDomHeight = removeTailUnit(
      getCssPropertyValue(magDom, '--mag-height'),
      'px'
    );
    magDom.style.transform = `translate3d(${
      magX - magDomHeight / 2
    }px, ${magY - magDomWidth / 2}px, 0px) rotate(30deg)`;
  }
  marquee();
}

function setMousePosition(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  magX = lerp(magX, mouseX, 0.2);
  magY = lerp(magY, mouseY, 0.2);
}
function lerp(start, end, delta) {
  return (1 - delta) * start + delta * end;
}

document.addEventListener('mousemove', setMousePosition, false);


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let magX = mouseX;
let magY = mouseY;

niceRolling();