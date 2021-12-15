<template>
  <div
    class="sidebar"
    :style="{
      width: sidebarWidth,
    }"
  >
    <h1>
      <span v-if="collapsed">
        <div>C</div>
        <div>P</div>
        <div>M</div>
      </span>
      <span v-else> Cat Poll Menu </span>
    </h1>

    <SidebarLink to="/">
      {{ uiLabels.createHeader }}
    </SidebarLink>
    <SidebarLink to="/create/en">Create Poll</SidebarLink>
    <br />
    <br />
    <br />
    <label>Poll ID: </label>
    <input type="text" v-model="id" class="catPawTextCursor" />
    <SidebarLink to="{{id}}">Fill Out Poll</SidebarLink>
    <SidebarLink to="'/poll/' + id">See Poll Results</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
      ><i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
// import { defineComponent } from "@vue/composition-api";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
import SidebarLink from "./SidebarLink";
import io from "socket.io-client";
const socket = io();

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "en",
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    pollId: function () {},
  },
};
</script>

<style>
:root {
  --sidebar-bg-color: rgb(42, 2, 105);
  --sidebar-item-hover: black;
  --sidebar-item-active: rgb(0, 204, 255);
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRePHReV06JeC-Kproe_MQ-CscA9N1gAjCdBA&usqp=CAU);
  background-size: cover;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
