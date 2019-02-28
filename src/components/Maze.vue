<template>
  <div ref="grid" class="grid">
    <div
      v-for="(mazeCell, idx) in mazeArr"
      :key="idx"
      :style="getStyle(mazeCell)"
    >
      <div :style="getSelectedStyle(mazeCell)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Maze",
  props: {
    maze: Array,
    size: Number,
    position: Array
  },
  computed: {
    mazeArr() {
      const arr = [];

      this.maze.forEach(row => {
        row.forEach(({ bottom, left, right, top, x, y }) => {
          arr.push({ bottom, left, right, top, x, y });
        });
      });

      return arr;
    }
  },
  methods: {
    getStyle: function({ bottom, left, right, top, x, y }) {
      const style = {
        marginBottom: bottom ? "1px" : 0,
        marginLeft: left ? "1px" : 0,
        marginRight: right ? "1px" : 0,
        marginTop: top ? "1px" : 0
      };

      if (x === 0 && y === 0) style.marginTop = 0;
      if (x === this.size - 1 && y === this.size - 1) style.marginBottom = 0;

      return style;
    },
    getSelectedStyle: function({ x, y }) {
      return {
        backgroundColor:
          this.position[0] === x && this.position[1] === y ? "white" : "black",
        width: "50%",
        height: "50%"
      };
    }
  }
};
</script>

<style scoped lang="scss">
$wrapperWidth: 100vw;
$rowHeight: calc(#{$wrapperWidth} / var(--noOfColumns));

.grid {
  width: $wrapperWidth;
  display: grid;
  grid-template-columns: repeat(var(--noOfColumns), 1fr);
  grid-auto-rows: $rowHeight;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  outline: none;
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  );

  & > div {
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1vw;
  }
}

@media (min-width: 600px) {
  $wrapperWidth: 600px;
  $rowHeight: calc(#{$wrapperWidth} / var(--noOfColumns));

  .grid {
    width: $wrapperWidth;
    grid-auto-rows: $rowHeight;
  }
}
</style>
