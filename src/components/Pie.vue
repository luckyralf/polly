<template>
  <div class="thePie" :style="{background: getStyle()}"></div>
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
    getStyle: function () {
    let keys = Object.keys(this.data);
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      if (this.dataArray.length<keys.length){
      this.dataArray.push(this.data[keys[i]]);
      this.totalQanswered += this.dataArray[i].count
      }
    }
    console.log("totaltsvarade", this.totalQanswered);
    console.log("dataArrayen är: ", this.dataArray);
    let sum = 0;
    let styles = this.dataArray.map(
        (piePart) => `${piePart.color} 0 ${(sum += piePart.count/this.totalQanswered*100)}%`
      );
    this.totalQanswered = 0;
    this.dataArray = [];
    console.log(styles)
    return 'conic-gradient('+ styles.join(",") +')';
  },
  }
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
.thePie {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  /* background: conic-gradient(red 0 50%,blue 0 100%); */
}
</style>