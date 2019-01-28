<template>
  <div class="leave_detail">
    <div class="title">留言详情</div>
    <div class="leave-bg">
      <img src="../../assets/leave_bg.jpg" alt="">
      <div class="leave-text">
        <div class="text_title">春节将至请大家安排好相关工作</div>
        <div class="text_content">
          攀枝花学院是教育部布点在川西南、滇西北唯一一所以工为主的综合性普通本科院校。学校座落于中国著名的“钒钛之都”、
          中国优秀旅游城市、国家首批新型工业产业化基地、国家创业城市、国家卫生城市、全国唯一一座以花命名的山水园林城市。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "leave_detail",
  data() {
    return {

    };
  },
  methods: {
    
  }
};
</script>
<style scoped>
.leave_detail {
  width: 100%;
  height: 850px;
}
.leave_detail .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  margin-left: 20px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.leave_detail .leave-bg{
  position: relative;
  width: 650px;
  height: 616px;
  margin: 0 auto;
}
.leave_detail .leave-bg .leave-text{
  width: 450px;
  height: 300px;
  position: absolute;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  top: 225px;
  left: 70px;
}
.leave_detail .text_title{
  text-align: left;
}
.leave_detail .text_content{
  text-align: left;
  text-indent: 2em;
}
</style>
