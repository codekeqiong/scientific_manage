<template>
  <div class="header">
    <div class="title">
      <img src="../assets/logo.png" alt="">
      <div>{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      title: '高校科研管理系统'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 68px;
  background: #19203C;
  padding: 0 25px 0 30px;
  line-height: 68px;
  text-align: left;
  position: fixed;
  width: 100%;
  z-index: 2000;
  color: #fff;
}
.header .title{
  height: 100%;
  position: relative;
}
.title img{
  display: inline-block;
  width: 68px;
  height: 68px;
  border-radius: 50%;
}
.title>div{
  display: inline-block;
  position: absolute;
  font-size: 22px;
  top: 2px;
  left: 90px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
