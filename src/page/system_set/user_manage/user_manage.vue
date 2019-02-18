
<template>
  <div class="user_manage">
    <div class="manage_title">
      <div>用户管理</div>
    </div>
    <div class="manage-content">
      <div class="right-corner">
        <el-input placeholder="请输入搜索内容" class="input-search" v-model="input_search" clearable style="width:200px; height:40px;"></el-input>
        <el-button class="search" type="primary" style="padding: 11px 15px;margin-left:-7px;">查询</el-button>
        <el-button class="add_user" @click="add_user()" type="primary" style="padding: 11px 15px;"><i class="el-icon-plus"></i> 新增用户</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
             {{scope.row.operation}}
            <el-button type="text" size="small" @click="modify()">修改</el-button>
            <el-button type="text" size="small" @click="remove()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
      title="添加用户"
      :visible.sync="addUserDialog"
      width="500px"
      center>
      <div class="add-user">
        <div class="add-content">
          <el-form :model="rulesForm" :rules="rules" ref="rulesForm" label-width="100px" class="rulesForm">
            <el-form-item label="添加姓名" prop="userName">
              <el-input v-model="rulesForm.userName" style="width:90%"></el-input>
            </el-form-item>
            <el-form-item label="添加账号" prop="account">
              <el-input v-model="rulesForm.account" style="width:90%"></el-input>
            </el-form-item>          
            <el-form-item label="设置密码" prop="password">
              <el-input type="password" v-model="rulesForm.password" autocomplete="off" style="width:90%"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="rulesForm.password2" autocomplete="off" style="width:90%"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="identity">
            <el-radio-group v-model="rulesForm.identity">
                <el-radio label="教师"></el-radio>
                <el-radio label="院级管理员"></el-radio>
                <el-radio label="系统管理员"></el-radio>
              </el-radio-group>
            </el-form-item>
            <div style="text-align: center;">
              <el-button type="primary" plain  @click="resetForm('rulesForm')" style="margin-right: 30px;">重置</el-button>
              <el-button type="primary" @click="submit('rulesForm')">确定</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
     <el-dialog title="提示" :visible.sync="dialogRemove" width="500px">
        <span>确定删除该用户？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogRemove = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="dialogRemove = false" style="padding:8px 15px;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
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
        input_search: '',
        dialogRemove: false,
        tableData:[{
          account: 1234567,
          userName: '墨轩',
          password: 321456,
          role: '教师'
        },{
          account: 1545667,
          userName: '墨轩',
          password: 324556,
          role: '院级管理员'
        },{
          account: 1548667,
          userName: '墨轩',
          password: 324856,
          role: '系统管理员'
        }],
        addUserDialog: false,
        rulesForm:{
          account: '',
          userName: '',
          password: '',
          password2: '',
          identity: '教师',
        },
        rules:{
          account: [
            { required: true, message: '请输入用户账号', trigger: 'blur' }
          ],
          userName:[
            { required: true, message: '请输入用户的姓名', trigger: 'blur'}
          ],
          password: [
            { required: true, validator: validateNewPass, trigger: 'blur' }
          ],
          password2: [
            { required: true, validator: validateCheckPass, trigger: 'blur' }
          ],
          identity: [       
            { required: true, message:'请选择身份', trigger: 'blur' }
          ]
        },
      }
    },
    methods:{
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      submit(){
        console.log("提交成功")
      },
      add_user(){
        this.addUserDialog = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      remove(){
        this.dialogRemove = true
      },
      modify(){
        this.addUserDialog = true
      }
    }
}
</script>
<style>
.user_manage{
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.manage_title{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.manage_title>div:nth-child(1){
  position: absolute;
  left: 30px;
  top: 15px;
  display: inline-block;
  font-size: 22px;
  font-weight: 500;
}
.manage-content{
  width: 100%;
  height: 100px;
  padding: 0 20px;
  box-sizing: border-box;
}
.right-corner{
  margin: 10px 0;
  width: 400px;
  height: 40px;
  line-height: 40px;
  float: right;
}
.user_manage .el-dialog__header{
  text-align: left;
}
</style>


