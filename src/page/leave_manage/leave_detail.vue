<template>
  <div class="leave_detail">
    <div class="title">留言详情</div>
    <div class="leave-bg">
      <img src="../../assets/leave_bg.jpg" alt="">
      <div class="leave-text">
        <div class="text_title">{{title}}</div>
        <div class="text_content">{{content}}</div>
        <div class="text_autor">{{autor}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "leave_detail",
  data() {
    return {
      title: '',
      content: '',
      autor: ''
    };
  },
  created(){
    if(!this.$route.query){
      this.getLeaveInfo() 
    } else {
      this.title = this.$route.query.title
      this.content = this.$route.query.content
      this.autor = this.$route.query.autor
    }
  },
  methods: {
    getLeaveInfo:function(){
      this.$http.post('/api/leave?id=1',this.qs.stringify({})).then((result) => {
      if (result.status === 200) {
        result.data.forEach(v => {
        //UTC日期转换为正常日期显示 
          if(v.add_time){
            v.add_time = new Date(+new Date(v.add_time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
          }
        });
        let newIndex = result.data.length - 1
        this.title = result.data[newIndex].title
        this.content = result.data[newIndex].content
        this.autor = result.data[newIndex].autor
      } else {
        this.$message.error("数据获取失败", result.data);
      }
    })
  }
}
}
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
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}
.leave_detail .text_content{
  text-align: left;
  text-indent: 2em;
  height: 230px;
}
.leave_detail .text_autor{
  text-align: right;
  margin-right: 30px;
}
</style>
