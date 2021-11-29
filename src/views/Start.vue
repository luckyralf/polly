<template>
 <body class="Wrapped">
  <section id ="headerText">
      <header>
         <h1>CAT POLL</h1>
      </header>
  </section>

  <div id="nav">
    <button class="langButton" v-on:click="switchLanguage">{{ uiLabels.changeLanguage }}</button>
    <router-link v-bind:to="'/create/' + lang">{{
      uiLabels.createPoll
    }}</router-link>
    <label
      >{{ uiLabels.writePollId }}
      <input type="text" v-model="id" />
    </label>
    <router-link v-bind:to="'/poll/' + id" tag="button">{{
      uiLabels.participatePoll
    }}</router-link>
  </div>


   <div id="Finalword">
        <hr>
          <footer>
              <h3> &copy; Cat Poll Corp.</h3>
          </footer>
    </div>
 </body>
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




#nav{
}

.langButton{
  border-radius: 50%;
  background-color: red;
  font-family: "Monaco", monospace;
}

#headerText{
  text-align: center;
  text-transform: uppercase;
  font-family: "Monaco", monospace;
  color: ##d3ffce;
  color: #fff;
  overflow:hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 30pt;
  border: 10px dotted #D84141;
  margin-left:

}

.Wrapped {
   background-color: #1B1BB1;;
}

#Finalword{
  font-family: "Monaco", monospace;
  color: green;
  
}

/*hejhej*/
</style>


