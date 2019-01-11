<template>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialog"
      width="30%"
      center>
      <div class="add-user">
      <div class="add-content">
        <el-form :model="rulesForm" :rules="rules" ref="rulesForm" label-width="100px" class="rulesForm">
          <el-form-item label="添加账号" prop="account">
            <el-input v-model="rulesForm.account"></el-input>
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input type="password" v-model="rulesForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="rulesForm.password2" autocomplete="off"></el-input>
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
            <el-button type="primary" @click="submit('rulesForm')">提交</el-button>
          </div>
        </el-form>
      </div>
    </div> 
    <span slot="footer" class="dialog-footer">
      <el-button @click="simpleDialog = false" style="margin-right: 40px; padding:12px 30px">取 消</el-button>
      <el-button type="primary" @click="simpleDialog = false" style="padding:12px 30px">删除</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'addUser',
  data(){
       var validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      addUserDialog: false,
      rulesForm:{
        account: '',
        password: '',
        password2: '',
        identity: '教师',
      },
      rules:{
        account: [
          { type: "number", required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
            { validator: validateNewPass, trigger: 'blur' }
          ],
        password2: [
            { validator: validateCheckPass, trigger: 'blur' }
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
    submit(){
      console.log("提交成功")
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
    width: 500px;
    height: 350px;
    box-sizing: border-box;
    border: 1px solid #409EFF;
    margin: 0 auto;
  }
</style>

