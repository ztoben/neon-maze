<template>
  <div id="app">
    <h1>Neon Maze</h1>
    <span class="input-container">
      <label>
        Size:
        <input v-model="size" type="number" min="10" max="100" />
      </label>
      <button @click="buildNewMaze">New Maze</button>
    </span>
    <div v-hammer:swipe="handleMove">
      <Maze :maze="maze" :size="parseInt(size)" :position="position" />
    </div>
    <p>Created by <a href="https://github.com/ztoben">ztoben</a>.</p>
  </div>
</template>

<script>
import Maze from "./components/Maze.vue";
import generateMaze from "generate-maze";

export default {
  name: "app",
  components: {
    Maze
  },
  data: function() {
    return {
      size: 25,
      position: [0, 0]
    };
  },
  mounted: function() {
    const context = this;

    window.addEventListener("keydown", function({ key }) {
      if (key === "ArrowDown") {
        context.move("down");
      }
      if (key === "ArrowUp") {
        context.move("up");
      }
      if (key === "ArrowRight") {
        context.move("right");
      }
      if (key === "ArrowLeft") {
        context.move("left");
      }
    });
  },
  computed: {
    maze() {
      return generateMaze(this.size);
    }
  },
  watch: {
    maze: function() {
      this.position = [0, 0];
    }
  },
  methods: {
    buildNewMaze() {
      this.size += 1;
      this.size -= 1;
    },
    move(direction) {
      const [x, y] = this.position;
      const position = [x, y];

      switch (direction) {
        case "down":
          if (!this.maze[y][x].bottom) position[1] += 1;
          break;
        case "up":
          if (!this.maze[y][x].top) position[1] -= 1;
          break;
        case "right":
          if (!this.maze[y][x].right) position[0] += 1;
          break;
        case "left":
          if (!this.maze[y][x].left) position[0] -= 1;
          break;
      }

      this.position = position;
    },
    handleMove({ direction }) {
      const DIRECTION_LEFT = 2;
      const DIRECTION_RIGHT = 4;
      const DIRECTION_UP = 8;
      const DIRECTION_DOWN = 16;

      if (direction === DIRECTION_LEFT) this.move("left");
      if (direction === DIRECTION_RIGHT) this.move("right");
      if (direction === DIRECTION_UP) this.move("up");
      if (direction === DIRECTION_DOWN) this.move("down");
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  .input-container {
    max-width: 500px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;

    & > * {
      margin: 5px;
    }
  }
}
</style>
