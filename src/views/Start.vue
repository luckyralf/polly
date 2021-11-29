<template>
<div class = "header">
</div>


  <div id="nav">
    <div class = "languangeButtonContainer">
      <button v-on:click="switchLanguage" class = "languageButton">{{ uiLabels.changeLanguage }}</button>
    </div>

    <div class = "createPoll">
      <router-link v-bind:to="'/create/' + lang">{{
        uiLabels.createPoll
      }}</router-link>
    </div>

    <label
      >{{ uiLabels.writePollId }}
      <input type="text" v-model="id" />
    </label>
    <router-link v-bind:to="'/poll/' + id" tag="button">{{
      uiLabels.participatePoll
    }}</router-link>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Start",
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
    };
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en") this.lang = "sv";
      else this.lang = "en";
      socket.emit("switchLanguage", this.lang);
    },
  },
};
</script>


@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
<style scoped>

.header{
background-color:#0c2c63;
min-height: 300px;
}


.languageButton{
font-family: 'Courier New', Courier, monospace;
height: 50px;
width: 70px;
transition: 200ms;
border-radius:5px;
}

.languageButton:hover {
    cursor:pointer;
    color: black;
    border: none;
 }
 .languangeButtonContainer{
   padding-top:-10px;
   margin-top: -20px;
   background-image:url(https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_the_United_States_%281795-1818%29.jpg) no-repeat;

 }
 .createPoll{
   margin-top:30px;
   margin-bottom:20px;
 }


#nav{
  padding-top:50px;
  padding-bottom:200px;
  background-color: #6b62c7;
  
}



</style>
