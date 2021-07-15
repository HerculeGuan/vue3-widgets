let x = 0,
  y = 0,
  intX = 0,
  intY = 0;
const rules = {
  validateRule(chess, initChess, chessList) {
    initValue(chess, initChess);

    // 公共规则
    if (notMove() || outBoundary()) return false;

    if (chess.rule === "vehicle") {
      return lineRule();
    } else {
      return true;
    }
  },
};

const initValue = (chess, initChess) => {
  x = Math.round(chess.x);
  y = Math.round(chess.y);
  intX = Math.round(initChess.x);
  intY = Math.round(initChess.y);
};

// 没有动
const notMove = () => x === intX && y === intY;

// 脱离边界
const outBoundary = () => x < 0 || x > 8 || y < 0 || y > 9;

// 只允许走直线
const lineRule = () => !(x !== intX && y !== intY);

// // 车
// const vehicleRule = () => {
//   return lineRule;
// };

export default rules;
