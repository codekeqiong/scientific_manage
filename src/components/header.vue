<template>
  <div class="header">
    <div class="title">{{ title }}</div>
    
  </div>
</template>

<script>
export default {
  name: 'sidebar',
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
