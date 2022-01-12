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

.infoButton2 {
  left: 20.5%;
  position: absolute;
  padding-top: 20px;
  padding-right: -20px;
  background-size: cover;
  background-position: 50%;
  border-radius: 100%;
  height: 37px;
  width: 37px;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaoEGFgHlaMnIHZFCstyDyPjCYK4ncplDSpqPIHKdF7lBQy_plhW90Dz7kE1PedYqXG0&usqp=CAU");
}

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
