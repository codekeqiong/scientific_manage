<template>
  <div class="header">
    <div class="title">
      <div>
        <img src="../assets/logo.png">
      </div>
      <div class="system-title">高校科研管理系统</div>
      <div class="hello">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">13198487982<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my_header",
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      this.$router.push({
        path: "/"
      });
      this.$message("已退出登录");
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 68px;
  background: #19203c;
  padding: 0 25px 0 30px;
  line-height: 68px;
  text-align: left;
  position: fixed;
  width: 100%;
  z-index: 2000;
  color: #fff;
}
.header .title {
  height: 100%;
  position: relative;
}
.title div:nth-child(1) {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title div:nth-child(1) img {
  display: inline-block;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title .system-title {
  width: 200px;
  height: 68px;
  display: inline-block;
  position: absolute;
  font-size: 22px;
  top: 2px;
  left: 70px;
}
.title .hello {
  width: 160px;
  height: 68px;
  position: absolute;
  top: 2px;  
  right: 120px;
  display: inline-block;
  text-align: right;
  font-size: 18px;
}
.title .hello .el-dropdown{
  width: 100%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 18px;
}
</style>
