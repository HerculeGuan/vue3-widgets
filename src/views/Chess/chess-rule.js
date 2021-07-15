let x = 0,
  y = 0,
  intX = 0,
  intY = 0;

const rules = {
  validateRule(chess, initChess) {
    x = Math.round(chess.x);
    y = Math.round(chess.y);
    intX = Math.round(initChess.x);
    intY = Math.round(initChess.y);

    console.log(x, y, intX, intY);
    if (chess.rule === "vehicle") {
      return notMove() && lineRule();
    }
  },
};

// 没有动
const notMove = () => !(x === intX && y === intY);
// 只允许走直线
const lineRule = () => !(x !== intX && y !== intY);

// 车
const vehicleRule = () => {
  return lineRule;
};

export default rules;
