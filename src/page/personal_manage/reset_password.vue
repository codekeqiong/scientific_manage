<template>
  <div class="password">
    <div class="title">修改密码</div>
    <div class="password-content">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码:" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPass">
          <el-input 
          type="password" 
          v-model="ruleForm.newPass" 
          @focus.capture.native='changePasswordTip(true)'
          @blur.capture.native='changePasswordTip(false)'
          autocomplete="off">
          </el-input>
          <div style="position: absolute">
            <verify-pass-word-tip :password="ruleForm.newPass" :isShowTip = 'isShowTip'></verify-pass-word-tip>
          </div>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass" autocomplete="off">
          <el-input 
          type="password" 
          v-model.number="ruleForm.checkPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>   
  </div>
</template>
<script>
import verifyPassWordTip from '../../components/checkpassStrong'
export default {
  name: "VerifyPassWord",
  components: { verifyPassWordTip },
    data(){
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('旧密码不能为空'));
        } else {
          callback();
        }
      };
      var validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (value === this.ruleForm.oldPass){
            callback(new Error('输入密码与旧密码重复!'));
          } else if (this.ruleForm.newPass !== '') {
            this.$refs.ruleForm.validateField('newPass');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        isShowTip: false,
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validateNewPass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validateCheckPass, trigger: 'blur' }
          ],
         
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changePasswordTip(isShow) {
        if (isShow) {
          this.isShowTip = true;
        } else {
          this.isShowTip = false;
        }
      },
    }
}
</script>
<style scoped>
.password{
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.password .title{
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-weight: 500;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.password-content{
  width: 400px;
  height: 300px;
  padding-top: 280px;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>

