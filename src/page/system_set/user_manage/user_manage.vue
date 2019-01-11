
<template>
  <div class="user_manage">
    <div class="manage_title">
      <div>用户管理</div>
      <el-button class="add_user" type="primary">新增用户</el-button>
    </div>
    <div class="manage-content">
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
            <el-button type="text" size="small" @click="delet()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return{
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
        }]
      }
    },
}
</script>
<style scoped>
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
.manage_title div{
  position: absolute;
  left: 20px;
  top: 15px;
  display: inline-block;
  font-size: 22px;
  font-weight: 500;
}
.manage_title .add_user{
  position: absolute;
  right: 60px;
  top: 10px;
}
.manage-content{
  margin-top: 30px;
  width: 100%;
  height: 100px;
  padding: 0 60px;
  box-sizing: border-box;
}
</style>


