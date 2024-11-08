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
  created() {
    const invite = this.$route.params.invite;
    if(invite) {
      localStorage.setItem("invite", invite);
    }else{
      localStorage.removeItem("invite");
    }
    //
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
