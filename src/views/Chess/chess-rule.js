let x, y, intX, intY, camp, pass, rule, list;
const rules = {
  validateRule(chess, initChess, chessList) {
    // 初始化数据赋值
    initValue(chess, initChess, chessList);

    // 公共规则触发
    if (notMove() || outBoundary()) return false;

    switch (rule) {
      case "vehicle":
        vehicleRule();
        break;
      case "gun":
        console.log("gun");
        break;
    }
    if (pass) pointOfFall();
    return pass;
  },
};

// 落点有子
const pointOfFall = () => {
  list.forEach((el, idx) => {
    if (el.x === x && el.y === y) {
      if (el.camp === camp) {
        // 自己的子
        pass = false;
      } else {
        // 吃子
        list.splice(idx, 1);
      }
    }
  });
};

// 车的规则
const vehicleRule = () => {
  list.forEach((el, idx) => {
    if (x === intX) {
      let maxY = y > intY ? y : intY;
      let minY = y > intY ? intY : y;
      if (el.x === x && el.y < maxY && el.y > minY) pass = false;
    } else if (y === intY) {
      let maxX = x > intX ? x : intX;
      let minX = x > intX ? intX : x;
      if (el.y === y && el.x < maxX && el.x > minX) pass = false;
    } else {
      pass = false;
    }
  });
};

// 炮的规则
// const gunRule = (el) => {
//   if (x === intX) {
//     let maxY = y > intY ? y : intY;
//     let minY = y > intY ? intY : y;
//     if (el.x === x && el.y < maxY && el.y > minY) pass = false;
//   } else if (y === intY) {
//     let maxX = x > intX ? x : intX;
//     let minX = x > intX ? intX : x;
//     if (el.y === y && el.x < maxX && el.x > minX) pass = false;
//   } else {
//     pass = false;
//   }
// };

export default rules;

// 初始化数据
const initValue = (chess, initChess, chessList) => {
  x = Math.round(chess.x);
  y = Math.round(chess.y);
  intX = Math.round(initChess.x);
  intY = Math.round(initChess.y);
  pass = true;
  camp = chess.camp;
  rule = chess.rule;
  list = chessList;
};

// 公共规则
const notMove = () => x === intX && y === intY; // 没有动
const outBoundary = () => x < 0 || x > 8 || y < 0 || y > 9; // 脱离边界
const isCrossLine = () => !(x !== intX && y !== intY); // 走直线
