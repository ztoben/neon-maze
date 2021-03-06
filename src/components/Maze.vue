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
    position: Array,
    displaySize: Number
  },
  computed: {
    mazeArr() {
      const arr = [];
      const [posX, posY] = this.position;

      const normalizedX = this.normalizePosition(posX);
      const normalizedY = this.normalizePosition(posY);

      for (let y = normalizedY; y < normalizedY + this.displaySize; y++) {
        for (let x = normalizedX; x < normalizedX + this.displaySize; x++) {
          const { bottom, left, right, top } = this.maze[y][x];

          arr.push({ bottom, left, right, top, x, y });
        }
      }

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

      if (x === this.size - 1 && y === this.size - 1) {
        style.backgroundColor = "white";
        style.border = "5px solid black";
      }

      return style;
    },
    getSelectedStyle: function({ bottom, left, right, top, x, y }) {
      const selected = this.position[0] === x && this.position[1] === y;

      return {
        backgroundColor: selected ? "white" : "black",
        width: this.displaySize === 9 ? "5vw" : "1vw",
        maxWidth: this.displaySize === 9 ? "35px" : "10px",
        height: this.displaySize === 9 ? "5vw" : "1vw",
        maxHeight: this.displaySize === 9 ? "35px" : "10px",
        borderRadius: "50%",
        marginBottom: top ? "1px" : 0,
        marginLeft: right ? "1px" : 0,
        marginRight: left ? "1px" : 0,
        marginTop: bottom ? "1px" : 0
      };
    },
    normalizePosition: function(pos) {
      if (pos < this.displaySize / 2) return 0;
      if (pos > this.size - this.displaySize / 2)
        return this.size - this.displaySize;

      return pos - Math.round(this.displaySize / 2) + 1;
    }
  }
};
</script>

<style scoped lang="scss">
$noOfColumns: var(--noOfColumns);
$wrapperWidth: calc(100vw - 10px);
$rowHeight: calc(#{$wrapperWidth} / #{$noOfColumns});

.grid {
  width: $wrapperWidth;
  display: grid;
  grid-template-columns: repeat($noOfColumns, 1fr);
  grid-auto-rows: $rowHeight;
  margin: 5px;
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
  $rowHeight: calc(#{$wrapperWidth} / #{$noOfColumns});

  .grid {
    width: $wrapperWidth;
    grid-auto-rows: $rowHeight;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
