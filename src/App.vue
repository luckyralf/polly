<template>
  <router-view />
</template>

<script>
export default {
  props: {},
  setup() {
    return {};
  },
  components: {},
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
