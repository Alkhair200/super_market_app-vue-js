<template>
  <NavBar></NavBar>
  <Aside></Aside>
  <router-view></router-view>
  <notifications />
</template>
<script>
import NavBar from "./components/Navbar.vue";
import Aside from "./components/Aside.vue";

export default {
  components: {
    NavBar,
    Aside,
  },
};
</script>
