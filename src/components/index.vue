<script>
import axios from "axios";
export default {
    data() {
      return {
        callbackParams: "",
        result: ""
      }
    },
    created() {
      const callbackParams = this.getQueryParams(window.location.href);
      this.callbackParams = JSON.stringify(callbackParams, null, 2);

      const params = {
        ...callbackParams,
        "grantType": "social",
        "source": "steam"
      }

      this.callbackParams = JSON.stringify(params, null, 2);

      axios.post("http://127.0.0.1/one-auth/token", {}, {
        params: params,
        headers: {
          "Authorization": "Basic aGF2ZW4tZ2FtZTpoYXZlbi1nYW1lLXNlY3JldA=="
        }
      }).then(res => {
        this.result = JSON.stringify(res, null, 2);
        // console.log(res);
        // 存储AccessToken
        localStorage.setItem("login", JSON.stringify(res));
        this.$router.push("/")
      })


    },
    methods: {
      getQueryParams(url) {
        // 使用正则表达式提取URL参数
        const paramsString = url.split('?')[1];
        if (!paramsString) {
          return {};
        }

        // 将参数字符串分割成数组，并解析键值对
        const params = paramsString.split('&').reduce((acc, pair) => {
          const [key, value] = pair.split('=');
          acc[key] = decodeURIComponent(value); // 使用decodeURIComponent解码值
          return acc;
        }, {});
        return params;
      }
    }
  };
</script>

<template>
  <div>获取URL中参数, 组成json传递到后端: </div>
  <pre>{{ callbackParams }}</pre>
  <div>传递后端后, 兑换accessToken: </div>
  <pre>{{ result }}</pre>
</template>

<style scoped>

</style>