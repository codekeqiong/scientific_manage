<template>
<div class="whole">
  <div class="text-area">
    <div class="icon-img">
      <img src="../assets/icon.jpg" alt="">
    </div>
    <div class="main-title">高校科研管理系统</div>
    <div class="title-line"></div>
    <div class="text-explain">
      <p><img src="../assets/gou.svg" alt="">科研项目管理</p>
      <p><img src="../assets/gou.svg" alt="">科研分数统计</p>
      <p><img src="../assets/gou.svg" alt="">留言信息管理</p>
      <p><img src="../assets/gou.svg" alt="">个人信息管理</p>
    </div>
  </div>
  <div class="login">
    <div class="login-content">
      <el-form :model="rulesForm" :rules="rules" ref="rulesForm" label-width="100px" class="rulesForm">
        <div class="login-title">账号登录</div>
        <el-form-item label="账号" prop="account">
          <el-input v-model="rulesForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="rulesForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
         <el-radio-group v-model="rulesForm.identity">
            <el-radio label="教师"></el-radio>
            <el-radio label="院级管理员"></el-radio>
            <el-radio label="系统管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验证码" prop="verify">
          <el-input v-model="rulesForm.verify" placeholder="请输入验证码" style="width: 188px; text-align:left;"></el-input>
          <div class="vertify-box" @click="refreshCode()">
            <Sidentify :identifyCode="identifyCode"></Sidentify>
          </div>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" plain  @click="resetForm('rulesForm')" style="margin-left: 40px;margin-right: 30px;">重置</el-button>
          <el-button type="primary" @click="loginIn('rulesForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div> 
  <div class="foot-line"></div>
</div>
</template>
<script>
import Sidentify from '../components/identify'
export default {
  name: 'login',
  components: { Sidentify },
  data(){
    return{
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
      identifyCode: '',
      rulesForm:{
        account: '',
        password: '',
        identity: '教师',
        verify: ''
      },
      rules:{
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
        identity: [       
          { required: true, message: '请选择身份', trigger: 'blur' }
        ],
        verify:[
          { required: true, message: '请正确填写验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginIn(){
      if(this.rulesForm.verify === this.identifyCode){
        this.$router.push({
          path:'/home'
        })
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      return this.identifyCode
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  }
}
</script>
<style scoped>
  .whole{
    width: 100%;
    height: 631px;
    background: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .login{
    position: absolute;
    bottom: 16%;
    right: 8%;
    width: 450px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .login-content{
    padding: 0 40px;
    padding-left: 0;
    width: 450px;
    height: 410px;
    box-sizing: border-box;
    border: 1px solid #409EFF;
    /* margin: 0 auto; */
  }
  .login-content .login-title{
    font-size: 22px;
    margin: 25px auto;
    margin-left: 40px;
   }
  .whole .foot-line{
    position: absolute;
    bottom: 60px;
    width: 100%;
    height: 1px;
    background-color: #959595;
   }
  .text-area{
    position: absolute;
    top: 10%;
    left: 14%;
    width: 420px;
    height: 300px;
   }
  .text-area .icon-img{
    display: inline-block;
    width: 90px;
    height: 90px;
    vertical-align: middle;
   }
  .text-area .icon-img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .text-area .main-title{
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
    font-size: 36px;
    color: #fff;
   }
  .text-area .title-line{
    margin: 30px 0;
    width: 100%;
    height: 1px;
    background-color: #959595;
  }
  .text-area p{
    text-align: left;
    margin: 20px 0 20px 20px;
    font-size: 18px;
    color: #fff;
  }
  .text-area p img{
    width: 45px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .vertify-box{
    display: inline-block;
    vertical-align: top;
  }
</style>

