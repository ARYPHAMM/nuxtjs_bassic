<template>
  <div>
    <Nuxt  />
  </div>
</template>
<script>
export default {
  watch: {
   '$route' (to, from){
       this.resetErrors();
    }
  },
}
</script>