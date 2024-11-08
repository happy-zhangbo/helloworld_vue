<template>
  <div>
    Steam ID: {{user.steamId}} <br />
    <div>ps: 需要公开个人信息权限</div>
    <div v-show="isScore">打分中</div>
  </div>
  <br/>
  <div>
    Steam分数: {{ scoreObj.score }} <br/>
    等级段位: {{ scoreObj.level }} <br/>
    游戏数量: {{ scoreObj["game_size"] }} <br/>
    游戏时常: {{ scoreObj["played_time"] / 60 }}小时 <br/>
    成就数量: {{ scoreObj["achievements_size"] }}
  </div>
  <br />
  <button @click="score">打分</button>&nbsp;<button @click="confirmScore">确认分数</button> <br />
  <br />
  <div>
    我的邀请链接: {{ inviteLink }}<br />
    邀请成功记录:
  </div>
  <button @click="invite">邀请分享</button>

</template>

<script>
import axios from "axios";
export default {
  name: "steam",
  data(){
    return {
      user: {
        steamId: "0000000000",
        accessToken: ""
      },
      scoreObj: {
        score: 0
      },
      isScore: false,
      inviteLink: "",
    }
  },
  created() {
    const loginInfo = localStorage.getItem("login");
    const loginInfoObj = JSON.parse(loginInfo)
    // const steamId = loginInfoObj.data.data.oauthId
    this.user = loginInfoObj.data.data;
    this.user.steamId = this.user.oauthId;
  },
  methods: {
    score(){
      this.isScore = true;
      const steamId = this.user.steamId
      const accessToken = this.user.accessToken
      axios.get('/api/one-point-system/usersteamscore/score?steamId='+steamId, {
        headers: {
          'Accept': 'text/event-stream',
          'haven-auth': 'bearer ' + accessToken,
          'Content-Type': 'text/event-stream',
          'Authorization': 'Basic aGF2ZW4tZ2FtZTpoYXZlbi1nYW1lLXNlY3JldA=='
        },
        responseType: 'stream',
        adapter: 'fetch', // <- this option can also be set in axios.create()
      }).then(async (response) => {
        console.log('axios got a response');
        const stream = response.data;
        // consume response
        let data = null;
        const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          console.log(value);
          data = value
        }
        data = data.substring(5, data.length - 1);
        this.scoreObj = JSON.parse(data)
        this.isScore = false;
      })
    },
    confirmScore() {
      const accessToken = this.user.accessToken
      axios.post('/api/one-point-system/usersteamscore/confirm', {}, {
        headers: {
          'haven-auth': 'bearer ' + accessToken,
          'Authorization': 'Basic aGF2ZW4tZ2FtZTpoYXZlbi1nYW1lLXNlY3JldA=='
        }
      }).then(async (response) => {
        console.log(response)
      })
    },
    invite() {
      const accessToken = this.user.accessToken
      axios.get('/api/one-point-system/usersteaminvite/invite', {
        headers: {
          'haven-auth': 'bearer ' + accessToken,
          'Authorization': 'Basic aGF2ZW4tZ2FtZTpoYXZlbi1nYW1lLXNlY3JldA=='
        }
      }).then(async (response) => {
        console.log(response)
        this.inviteLink = response.data.data

      })
    }
  }
}
</script>


<style scoped>

</style>