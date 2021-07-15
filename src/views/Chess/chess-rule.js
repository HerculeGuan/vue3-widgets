let x, y, intX, intY, camp, pass, rule;
const rules = {
  validateRule(chess, initChess, chessList) {
    // 初始化数据赋值
    initValue(chess, initChess);

    // 公共规则触发
    if (notMove() || outBoundary()) return false;

    // 一次遍历操作
    forEachList(chessList);

    return pass;
  },
};

const initValue = (chess, initChess) => {
  x = Math.round(chess.x);
  y = Math.round(chess.y);
  intX = Math.round(initChess.x);
  intY = Math.round(initChess.y);
  pass = true;
  camp = chess.camp;
  rule = chess.rule;
};

// 没有动
const notMove = () => x === intX && y === intY;

// 脱离边界
const outBoundary = () => x < 0 || x > 8 || y < 0 || y > 9;

// 遍历数组
const forEachList = (chessList) => {
  chessList.forEach((el, idx) => {
    if (rule === "vehicle") {
      vehicleRule(el);
    }
    if (pass) pointOfFall(el, idx, chessList);
  });
};

// 落点有子
const pointOfFall = (el, idx, chessList) => {
  if (el.x === x && el.y === y) {
    if (el.camp === camp) {
      // 自己的子
      pass = false;
    } else {
      // 吃子
      chessList.splice(idx, 1);
    }
  }
};

// 走直线
const isCrossLine = () => !(x !== intX && y !== intY);

// 车
const vehicleRule = (el) => {
  if (!isCrossLine()) {
    pass = false;
    return;
  }

  if (x === intX) {
    let maxY = y > intY ? y : intY;
    let minY = y > intY ? intY : y;
    if (el.x === x && el.y < maxY && el.y > minY) pass = false;
  } else if (y === intY) {
    let maxX = x > intX ? x : intX;
    let minX = x > intX ? intX : x;
    if (el.y === y && el.x < maxX && el.x > minX) pass = false;
  }
};

export default rules;
