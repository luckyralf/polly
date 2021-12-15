<template>
  <div class="thePie" :style="{ background: getPie() }"></div>
  <br />
  <div
    class="legends"
    v-for="(item, key) in data"
    v-bind:key="key"
    v-bind:style="{ color: item.color }"
  >
    {{ key }}
  </div>
</template>

<script>
export default {
  name: "Pie",
  props: {
    data: Object,
  },
  data: function () {
    return {
      totalQanswered: 0,
      dataArray: [],
    };
  },
  // data ser ut som : { "a1": { "count": 1, "color": "red" }, "a2": { "count": 1, "color": "blue" } }
  // vill ha data: [{"a1": { "count": 1, "color": "red" }}, {"a2": { "count": 1, "color": "blue"}}]
  // data["a1"] = {"count": 1, "color": "red" }
  methods: {
    getPie: function () {
      let keys = Object.keys(this.data);
      // console.log(keys)
      for (let i = 0; i < keys.length; i++) {
        if (this.dataArray.length < keys.length) {
          this.dataArray.push(this.data[keys[i]]);
          this.totalQanswered += this.dataArray[i].count;
        }
      }
      // console.log("totaltsvarade", this.totalQanswered);
      // console.log("dataArrayen är: ", this.dataArray);
      let sum = 0;
      let styles = this.dataArray.map(
        (piePart) =>
          `${piePart.color} 0 ${(sum +=
            (piePart.count / this.totalQanswered) * 100)}%`
      );
      this.totalQanswered = 0;
      this.dataArray = [];
      // console.log(styles)
      return "conic-gradient(" + styles.join(",") + ")";
    },
  },
  // computed: {
  //   pieStyle() {
  //     let keys = Object.keys(this.data);
  //     for (let i = 0; i < keys.length; i++) {
  //       this.dataArray.push(this.data[keys[i]]);
  //       this.totalQanswered += this.dataArray[i].count;
  //     }
  //     let sum = 0;
  //     let styles = this.dataArray.map(
  //       (piePart) => `${piePart.color} 0 ${(sum += piePart.count/this.totalQanswered*100)}`
  //     );
  //     return { background: 'conic-gradient('+ styles.join(",") +')' };
  //   },
  // },
};
</script>

<style scoped>
.legends {
  display: inline;
  padding: 5px;
}

.thePie {
  height: 200px;
  width: 200px;
  border: 2px solid white;
  border-radius: 50%;
  animation: show 1s ease-in-out;
  /* background: conic-gradient(red 0 50%,blue 0 100%); */
}
@keyframes show {
  0% {
    transform: scale(0) rotate(270deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>