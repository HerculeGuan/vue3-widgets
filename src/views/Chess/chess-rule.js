let x, y, intX, intY, camp, pass;
const rules = {
  validateRule(chess, initChess, chessList) {
    // 初始化数据赋值
    initValue(chess, initChess);

    // 公共规则触发
    if (notMove() || outBoundary()) return false;

    forEachList(chessList);

    // if (chess.rule === "vehicle") {
    //   return lineRule();
    // } else {
    //   return true;
    // }
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
};

// 没有动
const notMove = () => x === intX && y === intY;

// 脱离边界
const outBoundary = () => x < 0 || x > 8 || y < 0 || y > 9;

// 遍历数组
const forEachList = (chessList) => {
  chessList.forEach((el, idx) => {
    pointOfFall(el, idx, chessList);
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

// 只允许走直线
const lineRule = () => !(x !== intX && y !== intY);

// // 车
// const vehicleRule = () => {
//   return lineRule;
// };

export default rules;
