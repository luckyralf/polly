<template>
  <div class="pie">
      {{this.percentageArray}}
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
      percentageArray: [],
      totalQanswered: 0,
      randomColor: '',
    };
  },
  created: function () {
    this.totalQanswered = Object.keys(this.$props.data).reduce((sum, key) => sum + parseFloat(this.$props.data[key] || 0),0);
      console.log(this.$props.data);
    //   console.log(this.totalQanswered);
    //   let percentageArray = [];
    for (const [key, value] of Object.entries(this.$props.data)) {
      // console.log(`${key}: ${value}`);
      //percentage funkar
        let percentage = (value / this.totalQanswered)*100;
        this.percentageArray[key] = percentage;
    }
    console.log(this.percentageArray);
    // return percentageArray;
    this.randomColor = '#'+Math.floor(Math.random() * 16777215).toString(16);
    console.log(this.randomColor)

    //this.randomcolor och this.percentageArray {a1: 50, a2: 50} funkar
    
  },

};
</script>

<style scoped>
.pie {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: conic-gradient(green 0% 50%, red 50% 100%);
}
</style>