<template>
  <div id="app" :style="cssProps">
    <h1>Neon Maze</h1>
    <span class="input-container">
      <label>
        Size:
        <input v-model="size" type="number" min="10" max="100" />
      </label>
      <button @click="buildNewMaze">New Maze</button>
    </span>
    <Maze :maze="maze" :size="parseInt(size)" :position="position" />
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
      const [x, y] = context.position;
      const position = [x, y];

      if (key === "ArrowDown") {
        if (!context.maze[y][x].bottom) position[1] += 1;
      }
      if (key === "ArrowUp") {
        if (!context.maze[y][x].top) position[1] -= 1;
      }
      if (key === "ArrowRight") {
        if (!context.maze[y][x].right) position[0] += 1;
      }
      if (key === "ArrowLeft") {
        if (!context.maze[y][x].left) position[0] -= 1;
      }

      context.position = position;
    });
  },
  computed: {
    maze() {
      return generateMaze(this.size);
    },
    cssProps() {
      return {
        "--noOfColumns": this.size
      };
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
