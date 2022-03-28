<template>
  <div class="main">
    <Header />
    <LeftMenu />
    <Nuxt />
  </div>
</template>
<script>
export default {
  watch: {
    $route(to, from) {
      this.resetErrors();
    },
  },
 
};
</script>
