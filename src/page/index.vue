<template>
  <div class="login">
    <div class="login-content">
      <el-form :model="rulesForm" :rules="rules" ref="rulesForm" label-width="100px" class="rulesForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="rulesForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="rulesForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verification">
          <el-input v-model="rulesForm.verification"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
         <el-radio-group v-model="rulesForm.identity">
            <el-radio label="教师"></el-radio>
            <el-radio label="院级管理员"></el-radio>
            <el-radio label="系统管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" plain  @click="resetForm('rulesForm')" style="margin-right: 30px;background-color:#fff;">重置</el-button>
          <el-button type="primary" @click="loginIn('rulesForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div> 
</template>
<script>
export default {
  name: 'login',
  data(){
    return{
      rulesForm:{
        account: '',
        password: '',
        verification: '',
        identity: '教师',
      },
      rules:{
        account: [
          { type: "number", required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        verification: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ],
        identity: [       
          { type: "number", required: true, message: '请选择身份', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginIn(){
      console.log("登录成功")
    }
  }
}
</script>
<style scoped>
  .login{
    width: 100%;
    height: 850px;
    box-sizing: border-box;
    padding-top: 250px;
    background-color: #fff;
  }
  .login-content{
    padding: 40px 40px;
    padding-left: 0;
    /* padding-right: 40px; */
    width: 500px;
    height: 350px;
    box-sizing: border-box;
    border: 1px solid #409EFF;
    margin: 0 auto;
  }
</style>

