const workspaceDom = document.querySelector(".workspace");
const workspaceWidth = window.innerWidth;
const workspaceHeight = window.innerHeight;
workspaceDom.style.width = `${workspaceWidth}px`;
workspaceDom.style.height = `${workspaceHeight}px`;

const atariInfo = { webURL: "./images/dan-45wx80h-right-red.svg" };

const dataInfoList = [
  { webURL: "./images/dan-45wx80h-left-blue.svg" },
  { webURL: "./images/dan-45wx80h-left-light-blue.svg" },
  { webURL: "./images/dan-45wx80h-right-blue.svg" },
  { webURL: "./images/dan-45wx80h-right-light-blue.svg" },
];

const dataCount = dataInfoList.length;
const itemWidth = 45;
const itemHeight = 80;
const rowCount = Math.floor(workspaceHeight / itemHeight);
const colCount = Math.floor(workspaceWidth / itemWidth);

function randomRangeNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const atariRow = randomRangeNumber(0, rowCount);
const atariCol = randomRangeNumber(0, colCount);

for (let i = 0; i <= rowCount; i++) {
  for (let j = 0; j <= colCount; j++) {
    if (i === atariRow && j === atariCol) {
      const { webURL } = { ...atariInfo };
      const divDom = document.createElement("div");
      divDom.style.top = `${itemHeight * i}px`;
      divDom.style.left = `${itemWidth * j}px`;
      divDom.style.width = `${itemWidth}px`;
      divDom.style.height = `${itemHeight}px`;
      divDom.style.backgroundImage = `url(${webURL})`;
      divDom.classList.add("dan");
      workspaceDom.appendChild(divDom);
    } else {
      // const {webURL} = {...dataInfoList[(Math.abs(i) + Math.abs(j)) % dataCount]}
      // const {webURL} = {...dataInfoList[Math.min(Math.abs(i), Math.abs(j)) % dataCount]}
      const { webURL } = {
        ...dataInfoList[Math.max(Math.abs(i), Math.abs(j)) % dataCount],
      };
      const divDom = document.createElement("div");
      divDom.style.top = `${itemHeight * i}px`;
      divDom.style.left = `${itemWidth * j}px`;
      divDom.style.width = `${itemWidth}px`;
      divDom.style.height = `${itemHeight}px`;
      divDom.style.backgroundImage = `url(${webURL})`;
      divDom.classList.add("dan");
      workspaceDom.appendChild(divDom);
    }
  }
}
