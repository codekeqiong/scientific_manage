<template>
  <div class="password">
    <div class="password-content">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码:" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass" autocomplete="off">
          <el-input type="password" v-model.number="ruleForm.checkPass"></el-input>
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
export default {
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
      }
    }
}
</script>
<style scoped>
  .password{
    width: 100%;
    height: 850px;
    background-color: #fff;
  }
  .password-content{
    width: 400px;
    height: 300px;
    padding-top: 280px;
    box-sizing: border-box;
    margin: 0 auto;
  }
</style>

