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
import chessJSON from "./chess.json";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Chess",
  components: {
    SingleChess,
  },
  setup: () => {
    const { chessList } = reactive(chessJSON);
    let area = ref(null);
    let bout = ref("red");
    let isMove = ref(false);
    let currentMoveChessId = 0,
      areaTop = 0,
      areaLeft = 0;

    const onClickChess = (chess) => {
      if (isMove.value) {
        chess.x = Math.round(chess.x);
        chess.y = Math.round(chess.y);
        // 落子中
        isMove.value = false;
        reverseBout();
      } else {
        // 判断是否可以走
        if (chess.camp === bout.value) {
          moveChessToEnd(chess);
          isMove.value = true;
          currentMoveChessId = chess.id;
        } else {
          console.warn("对方的回合");
        }
      }
    };

    const onMousemove = (e) => {
      if (isMove.value) {
        chessList.forEach((v) => {
          if (v.id === currentMoveChessId) {
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
      outline: 1px solid blue;
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
