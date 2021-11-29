<template>
  <body class="Wrapped">
    <section id="headerText">
      <header>
        <h1>CAT POLL</h1>
      </header>
    </section>

    <div id="nav">
      <div class="langButtonWrapper">
        <button class="langButton" v-on:click="switchLanguage">
          {{ uiLabels.changeLanguage }}
        </button>
      </div>

      <div class="writeAndParticipate">
        <label
          >{{ uiLabels.writePollId }}
          <input type="text" v-model="id" />
        </label>
        <router-link v-bind:to="'/poll/' + id" tag="button">{{
          uiLabels.participatePoll
        }}</router-link>
      </div>

      <div class="createOwn">
        <router-link v-bind:to="'/create/' + lang">{{
          uiLabels.createPoll
        }}</router-link>
      </div>
    </div>
   

    <div id="Finalword">
      <hr />
      <footer>
        <h3>&copy; Cat Poll Corp.</h3>
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




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');
@import url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");



@import
url("https://fonts.googleapis.com/css?family=Droid+Serif|Share+Tech+Mono");
<style scoped>
.languageButton {
  font-family: "Courier New", Courier, monospace;
  height: 50px;
  width: 70px;
  transition: 200ms;
  border-radius: 5px;
}

.languageButton:hover {
  cursor: pointer;
  color: black;
  border: none;
}
.languangeButtonContainer {
  padding-top: -10px;
  margin-top: -20px;
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_the_United_States_%281795-1818%29.jpg)
    no-repeat;
}
.createPoll {
  margin-top: 30px;
  margin-bottom: 20px;
}


#nav{
  
}

.langButton {
  border-radius: 50%;
  background-color: yellow;
  font-family: 'Outfit', sans-serif;
}
.langButtonWrapper {
  padding-top: 40px;
}

#headerText {
  text-align: center;
  text-transform: uppercase;
  font-family: "Monaco", monospace;
  color: ##d3ffce;
  color: #fff;
  overflow: hidden;
  text-shadow: 2px 2px 2px black;
  font-size: 30pt;
  border: 10px dotted #d84141;
  margin-bottom: 100px;

  font-size: 40pt;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  text-shadow: 0 0 7px rgb(253, 117, 67), 0 0 10px rgb(247, 82, 22),
    0 0 21px #f40, 0 0 42px #f40, 0 0 82px #f40;
  /*padding: 0rem 6rem 5.5rem;*/
  border-radius: 2rem;
  text-transform: uppercase;
}

.writeAndParticipate{
  padding-top:40px;
  padding-bottom:40px;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-style:bold;
  border:dotted 5px;
  border-radius:20px;
  background-color:#88ddff;
  margin-left:200px;
  margin-right: 200px;
  margin-top:20px;
  

}

.createOwn{
  font-family: 'Outfit', sans-serif;
  padding-top:50px;
  color:white;
  border:dotted 5px;
  border-radius:20px;
  background-color:#88ddff;
  margin-left:200px;
  margin-right: 200px;
  margin-top:20px;
}

.Wrapped {
  background-color: #0c2c63;
}

#Finalword {
  font-family: "Monaco", monospace;
  color: green;
}

/*hejhej*/
</style>
