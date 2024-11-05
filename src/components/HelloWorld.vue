<template>

  <a href="/api/one-auth/oauth/render/steam">Steam Login</a><br /><br />
<!--  <button @click="toSteam()">Steam 交互</button>-->
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {

    }
  },
  methods: {
    toSteam: function (){
      this.$router.push("/steam")
    }
  }
}

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
