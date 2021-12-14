<template>
  <Sidebar />
  <div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Sidebar from "@components/sidebar/Sidebar";

export default defineComponent({
  setup() {},
});
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

:root {
  --sidebar-bg-color: blue;
  --sidebar-item-hover: red;
  --sidebar-item-active: yellow;
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
</style>
