var initialTime;
var count;
var timer;
var sum;
var randomNum;
var startCell;
var endCell;
var result;
var cellClickCount;
function startGame() {
  sum = 0;
  result = 0;
  initialTime = 12;
  count = initialTime;
  cellClickCount = 0;
  startCell = 1;
  endCell = 12;
  round = 0;
  randomNum = Math.floor(Math.random() * 50) + 1;
  generateRandomNum(startCell, endCell);
  document.getElementById("number-block").innerHTML = randomNum;
  timer = setInterval(starttimer, 1000);
}

function generateRandomNum(startCell, endCell) {
  for (var i = startCell; i <= endCell; i++) {
    var newRandomNum = Math.floor(Math.random() * 9) + 1;
    document.getElementById("cell" + i).innerHTML = newRandomNum;
  }
}

function displayRandomNum() {
  randomNum = Math.floor(Math.random() * 50) + 1;
  document.getElementById("number-block").innerHTML = randomNum;
}

function starttimer() {
  if (count == 0) {
    clearInterval(timer);
    count = initialTime < 4 ? initialTime : initialTime--;
    sum = 0;
    if (endCell == 36) {
      document.getElementById("score-label").innerHTML = result;
      document.getElementById("result-container").style.visibility = "visible";
    } else {
      round++;
      endCell += 6;
      clearCells();
      displayRandomNum();
      generateRandomNum(startCell, endCell);
      document.getElementById("sum-block").innerHTML = sum;
      timer = setInterval(starttimer, 1000);
    }
  }
  count--;
  document.getElementById("timer").innerHTML = count;
}

function sumUp(cellId) {
  var cell = document.getElementById("cell" + cellId);
  var numString = cell.innerHTML;
  var num = Number(numString);
  if (cell.getAttribute("set") == 1) {
    if (sum > 0) sum -= num;
    cellClickCount--;
    cell.setAttribute("set", 0);
    cell.style.backgroundColor = "#fff5fd";
  } else {
    sum += num;
    cell.setAttribute("set", 1);
    cell.style.backgroundColor = "#0a81ab";
    cellClickCount++;
  }
  document.getElementById("sum-block").innerHTML = sum;
  if (sum > randomNum) {
    endCell += 6;
  } else if (sum == randomNum) {
    if (endCell > 12) {
      endCell -= 6;
    }
    result += cellClickCount;
    document.getElementById("score").innerHTML = result;
    document.getElementById("timer").innerHTML = count;
  } else {
    return;
  }
  count = initialTime < 4 ? initialTime : initialTime--;
  document.getElementById("timer").innerHTML = count;
  clearCells();
  displayRandomNum();
  generateRandomNum(startCell, endCell);
  clearInterval(timer);
  timer = setInterval(starttimer, 1000);
  document.getElementById("sum-block").innerHTML = sum;
}

function clearCells() {
  for (var i = 1; i <= 36; i++) {
    var cell = document.getElementById("cell" + i);
    cell.innerHTML = "";
    cell.setAttribute("set", 0);
    cell.style.backgroundColor = "#fff5fd";
    cellClickCount = 0;
    sum = 0;
  }
}

function replayGame() {
  document.getElementById("result-container").style.visibility = "hidden";
  clearCells();
  startGame();
}
function closeGame() {
  document.getElementById("result-container").style.visibility = "hidden";
}
