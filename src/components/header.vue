<template>
  <div class="header">
    <div class="title">
      <div><img src="../assets/logo.png" alt=""></div>
      <div class="system-title">高校科研管理系统</div>
      <div class="hello">June, 欢迎您 !</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {

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
.title div:nth-child(1){
  display: inline-block;
  margin-top: 9px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title div:nth-child(1) img{
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title .system-title{
  width: 200px;
  height: 68px;
  display: inline-block;
  position: absolute;
  font-size: 22px;
  top: 2px;
  left: 70px;
}
.title .hello{
  width: 200px;
  height: 68px;
  position:absolute;
  top: 2px;
  right: 80px;
  display: inline-block;
  font-size: 18px;
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
