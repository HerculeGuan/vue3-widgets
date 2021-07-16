let x, y, intX, intY, camp, pass, rule, list;
const rules = {
  validateRule(chess, initChess, chessList) {
    // 初始化数据赋值
    initValue(chess, initChess, chessList);

    // 公共规则触发
    if (notMove() || outBoundary()) return;
    switch (rule) {
      case "vehicle": // 车
        if (!vehicleRule()) return;
        break;
      case "general": // 将
        if (!generalRule()) return;
        break;
      case "bachelor": // 士
        if (!bachelorRule()) return;
        break;
      case "chancellor": // 相
        if (!chancellorRule()) return;
        break;
      case "soldier": // 兵
        console.log("soldier");
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
  let p = true;
  list.forEach((el) => {
    if (x === intX) {
      let maxY = y > intY ? y : intY;
      let minY = y > intY ? intY : y;
      if (el.x === x && el.y < maxY && el.y > minY) p = false;
    } else if (y === intY) {
      let maxX = x > intX ? x : intX;
      let minX = x > intX ? intX : x;
      if (el.y === y && el.x < maxX && el.x > minX) p = false;
    } else {
      p = false;
    }
  });
  return p;
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

// 将的规则
const generalRule = () => {
  inGeneralArea() && isCrossLine() && crossOneStep();
};

// 士的规则
const bachelorRule = () => {
  inGeneralArea() && crossbias(1);
};

// 相的规则
const chancellorRule = () => {
  inHalfArea() && crossbias(2);
};

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
const inGeneralArea = () => {
  if (camp === "red") {
    return x >= 3 && x <= 5 && y >= 7 && y <= 9;
  } else {
    return x >= 3 && x <= 5 && y >= 0 && y <= 2;
  }
}; // 在禁区
const inHalfArea = () => {
  if (camp === "red") {
    return x >= 0 && x <= 8 && y >= 5 && y <= 9;
  } else {
    return x >= 0 && x <= 8 && y >= 0 && y <= 4;
  }
}; // 在禁区
const crossOneStep = () => Math.abs(x - intX) <= 1 && Math.abs(y - intY) <= 1; // 只能走一步之内
const crossbias = (n) => Math.abs(x - intX) === n && Math.abs(y - intY) === n; // 只能走斜线n步
