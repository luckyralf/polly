<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>

<script>
// import { defineComponent } from "@vue/composition-api";
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";
import meow from "/public/sounds/meow.mp3";
import io from "socket.io-client";
const socket = io();

export default {
  props: {},
  setup() {
    return { sidebarWidth };
  },
  components: { Sidebar },
  methods: {
    switchLanguageToEN: function () {
      this.lang = "en";
      socket.emit("switchLanguage", this.lang);
    },
    switchLanguageToSV: function () {
      this.lang = "sv";
      socket.emit("switchLanguage", this.lang);
    },
    playSound: function () {
      const audio = new Audio(meow);
      audio.play();
    },
  },
};
</script>

<style>
/* klass för uri */
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  padding: 0.4em;
  font-weight: bold;
  color: blue;
}

#nav a.router-link-exact-active {
  background-color: blue;
  color: white;
}

/* Klass för menyn */
</style>
