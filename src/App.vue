<template>
  <div id="app">
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <my-sidebar></my-sidebar>
        </el-aside>
        <el-container>
          <el-main><router-view/></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myHeader from './components/my_header'
import mySidebar from './components/my_sidebar'
import myFooter from './components/my_footer'
export default {
  name: 'App',
  components: {myHeader, mySidebar, myFooter},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
.header {
  padding: 0;
}
.sidebar {
  background-color: #EFF0F5;
  height: 100%;
}
.footer{
  background-color: #ffffff;
}
</style>
