<template>
  <div v-bind:class="thePie" :style="{ background: getPie() }"></div>
  <br />
  <div class="boxesAndLegends">
    <div
      class="legends"
      v-for="(item, key) in data"
      v-bind:key="key"
    >
      <div class="colorBox" v-bind:style="{ 'background-color': item.color }"></div>
      {{ key }}
    </div>
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
      thePie: "thePie",
    };
  },
  watch: {
    data: function () {
      this.thePie = "";
      setTimeout(() => {
        this.thePie = "thePie";
      }, 5);
    },
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
};
</script>

<style scoped>
.boxesAndLegends {
  display: flex;
}

.legends {
  display: flex;
  padding: 5px;
  font-family:"Exo 2", sans-serif;
  color: white;
  text-shadow: 
      0 0 10px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa;
}

.colorBox {
  margin-right: 5px;
  height: 17px;
  width: 17px;
  border: 1px solid white;
}

.thePie {
  height: 200px;
  width: 200px;
  border: 2px solid white;
  border-radius: 50%;
  animation-name: pieAni;
  animation-duration: 1s;
}
@keyframes pieAni {
  0% {
    transform: scale(0) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>