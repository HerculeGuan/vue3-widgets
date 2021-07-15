<template>
  <!-- 9*10棋盘 -->
  <div class="chess" @mousemove="onMousemove">
    <div class="chess-board">
      <div class="action-area" ref="area">
        <SingleChess
          @click="onClickChess(chess)"
          v-for="chess in chessList"
          :key="chess.id"
          :data="chess"
          :bout="bout"
        />
      </div>
    </div>
    <div class="chess-panel">
      <span>回合:{{ bout }}</span>
      <span>isMove:{{ isMove }}</span>
    </div>
  </div>
</template>

<script>
import SingleChess from "../../components/SingleChess.vue";
import chessRule from "./chess-rule";
import chessJSON from "./chess.json";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Chess",
  components: {
    SingleChess,
  },
  setup: () => {
    const { validateRule } = chessRule;
    const { chessList } = reactive(chessJSON);
    let area = ref(null);
    let bout = ref("red"); // 隶属阵营
    let isMove = ref(false); // 是否正在移动
    let initChess = null; // 移动之前的棋子对象
    let areaTop = 0, // 移动区域离边界的距离
      areaLeft = 0;

    // 点击棋子
    const onClickChess = (chess) => {
      if (isMove.value) {
        moveToStop(chess);
      } else {
        stopToMove(chess);
      }
    };

    const moveToStop = (chess) => {
      let validMove = validateRule(chess, initChess, chessList);
      // 移动中
      if (validMove) {
        //移动有效
        chess.x = Math.round(chess.x);
        chess.y = Math.round(chess.y);
        isMove.value = false;
        reverseBout();
      } else {
        chess.x = initChess.x;
        chess.y = initChess.y;
        isMove.value = false;
      }
    };

    const stopToMove = (chess) => {
      // 判断是否可以走
      if (chess.camp === bout.value) {
        // 先记录移动之前的位置
        initChess = JSON.parse(JSON.stringify(chess));
        moveChessToEnd(chess);
        isMove.value = true;
      } else {
        console.warn("对方的回合");
      }
    };

    const onMousemove = (e) => {
      if (isMove.value) {
        chessList.forEach((v) => {
          if (v.id === initChess.id) {
            v.x = (e.clientX - areaLeft) / 50;
            v.y = (e.clientY - areaTop) / 50;
          }
        });
      }
    };

    const reverseBout = () => {
      bout.value = bout.value === "red" ? "black" : "red";
    };

    const moveChessToEnd = (chess) => {
      chessList.forEach((el, i) => {
        if (el.id === chess.id) {
          chessList.splice(i, 1);
        }
      });
      chessList.push(chess);
    };

    onMounted(() => {
      let { top, left } = area.value.getBoundingClientRect();
      areaLeft = left;
      areaTop = top;
    });

    return {
      chessList,
      bout,
      isMove,
      area,
      onClickChess,
      onMousemove,
    };
  },
};
</script>

<style lang="scss" scoped>
.chess {
  height: 100vh;
  user-select: none;
  display: flex;
  justify-content: center;
  &-board {
    width: 466px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../assets/chess.png") center no-repeat;
    background-size: cover;
    .action-area {
      position: relative;
      width: 400px;
      height: 450px;
    }
  }
  &-panel {
    margin-top: 50px;
    margin-left: 100px;
    display: flex;
    flex-direction: column;
    width: 200px;
  }
}
</style>
