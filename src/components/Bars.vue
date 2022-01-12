<template>
<div class="wrapper">

 <div class= "allBars"> 
  <div class="bar" v-for="(item, key) in data" v-bind:key="key" >
    <div v-if="key != ''">
      <!--<div id="individualBar" v-bind:style="[{height: 50*item.count + 'px'},{'background-color':item.color}]"> -->
      <div id="individualBar" v-bind:style="[{height: 400*(item.count/getA()) + 'px'},{'background-color':item.color}]">
        <span> {{item.count}} </span>
      </div>
       
      <div class="ansAlt"> 
        {{key}} 
      </div>
    </div>
  </div>
  </div>
  <div class= "participants"> 
     <span id="partiNum"> {{amountParticipants- getA()}}</span> <br> {{uiLabels.peopleWhoDidntAnswer}}
 </div>
    
</div>

</template>

<script>
export default {
  name: 'Bars',
  props: {
    data: Object,
    amountParticipants: Number,
    uiLabels: Object,
  },

data: function () {
    return {
      totalQanswered: 0,
      dataArray: [],
    }
},

methods: {
   getA: function(){
     this.totalQanswered = 0;
     this.dataArray = [];
     let keys = Object.keys(this.data);
     for (let i = 0; i < keys.length; i++) {
        if (this.dataArray.length < keys.length) {
          this.dataArray.push(this.data[keys[i]]);
          this.totalQanswered += this.dataArray[i].count;
        }
      }
     return this.totalQanswered
    }, 
}

}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media (max-width: 600px){

}

.ansAlt{
  color: black;
  font-weight: bolder;
  font-size: 1rem;
}

.allBars {
}

.bar {
  display: inline-block;
  width: 70px;
  vertical-align: bottom;
  margin: 7px;
  font-family:"Exo 2", sans-serif;
  color:white;
  
  text-shadow: 
      0 0 10px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa;
  animation-name: barAni;
  animation-duration: 1s;
  transform-origin: bottom;
}

#partiNum{
  font-size: 2rem;
}

.participants {
  background: linear-gradient(to right, #008fc8, hsl(202, 99%, 49%));
  font-family: "Outfit", sans-serif;
  border: solid 5px;
  border-radius: 20px;
  border-color: white;
  color: white;
  margin-bottom: 50px;
  /* margin-left: 200px; */
  /* position: right; */
  font-size: 20px;
  padding: 10px;
  padding-bottom: 20px;
  width: 100px;
  height: fit-content;
}
.wrapper{
  /* margin-right: 200px; */
  display:flex;
  grid-gap:40px;
  /*max-height:180px;*/

}


@keyframes barAni {
  0% {transform:scaleY(0%);}
  100% {transform:scaleY(100%);}
}

.bar span {
  position: relative;
  top: -1.2em;
  
}
#individualBar{
  border:solid 2px white;
}

</style>
