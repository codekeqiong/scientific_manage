<template>
  <div class="home_page">
    <div class="tips" @click="skip">
      <i class="el-icon-bell"></i> [最新留言]：
      <span>春节将至请大家安排好相关工作</span>    
    </div>
  </div>
</template>
<script>
export default {
  name: "home_page",
  data(){
    return{

    }
  },
  methods:{
    skip(){
      this.$router.push({
        path:'/leave_detail'
      })
    }
  }
};
</script>
<style scoped>
.home_page .tips {
  text-align: left;
  color: #303445;
  font-size: 12px;
  background-color: #eaf4fe;
  height: 31px;
  line-height: 36px;
  margin: 10px 0;
  border-radius: 5px;
  padding-left: 18px;
  cursor: pointer;
}
.home_page .tips i{
  width: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #3091f2;
}
</style>
