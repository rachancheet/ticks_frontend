export function checkifwon(board, cue) {
  // if tries < 2 {
  // 	return false
  // }
  //board logic
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    let a = lines[i][0];
    let b = lines[i][1];
    let c = lines[i][2];
    if (board[a] === board[b] && board[b] === board[c] && board[c] === cue) {
      return true;
    }
  }
  return false;
}

export function checkifdraw(board) {
  let count = 0;
  for (let i = 0; i < 9; i++) {
    if (board[i] == "") {
      count++;
    }
  }
  if (count < 1) {
    return true;
  }
  return false;
}

function recurse(board, turn) {
  console.log(board);
  let won = checkifwon(board, "X");
  //  let won = checkifwon(board, "X")
  if (won) {
    return -1;
  }
  if (checkifwon(board, "0")) {
    return 1;
  }
  if (checkifdraw(board)) {
    return 0;
  }
  if (turn) {
    let bestscore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") {
        let temp = board.slice(0);
        temp[i] = "0";
        console.log("looking at 0 on", i);
        let score = recurse(temp, false);
        console.log("score for 0 on ", i, " : ", score);
        if (score > bestscore) {
          bestscore = score;
        }
      }
    }
    return bestscore;
  } else {
    let bestscore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") {
        let temp = board.slice(0);
        temp[i] = "X";
        console.log("looking at X on", i);
        let score = recurse(temp, true);
        console.log("score for X on ", i, " : ", score);
        if (score < bestscore) {
          bestscore = score;
        }
      }
    }
    return bestscore;
  }
}

export function AI(board) {
  if (board[4] == "") {
    return 4;
  }
  let bestscore = -Infinity;
  let bestmove = null;
  for (let i = 0; i < 9; i++) {
    if (board[i] == "") {
      let temp = board.slice(0);
      temp[i] = "0";
      console.log("initial looking at 0 on", i);
      let score = recurse(temp, false);
      console.log("initial score for X on ", i, " : ", score);
      if (score > bestscore) {
        bestscore = score;
        bestmove = i;
      }
    }
  }
  return bestmove;
}
// let board = Array(9).fill("");
// board[0] = "X";
// // board[4] = "X";
// // board[8] = "";

// console.log(board);
// // console.log(checkifdraw(board, "X"));
// board[AI(board)] = "0";
// console.log(board);
// board[8] = "X";
// board[AI(board)] = "0";
// console.log(board);
// // console.log(AI(board));
// console.log(board);
// console.log(AI(board));
// console.log(board);
// console.log(AI(board));
// console.log(board);
// console.log(AI(board));
// console.log(board);
