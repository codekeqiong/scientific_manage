<template>
  <div class="fractional">
    <div class="fractional-title">
      <div>科研分数统计</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created(){

  },
  methods:{

  }
}
</script>
<style>
.fractional {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.fractional-title {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.fractional-title div{
   position: absolute;
  left: 30px;
  top: 15px;
  display: inline-block;
  font-size: 22px;
  font-weight: 500;
}
</style>
