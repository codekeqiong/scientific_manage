
<template>
  <div class="user_manage">
    <div class="manage_title">
      <div>用户管理</div>
    </div>
    <div class="manage-content">
      <div class="right-corner">
        <el-input
          placeholder="请输入搜索内容"
          class="input-search"
          v-model="input_search"
          clearable
          style="width:200px; height:40px;"
        ></el-input>
        <el-button class="search" type="primary" style="padding: 11px 15px;margin-left:-7px;">查询</el-button>
        <el-button class="add_user" @click="add_user()" type="primary" style="padding: 11px 15px;">
          <i class="el-icon-plus"></i> 新增用户
        </el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="编号" width="120"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            {{scope.row.operation}}
            <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="remove(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- tableData分页 -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        layout="total, prev, pager, next, jumper"
        style="text-align:right; padding: 49px 29px 50px 0;"
      ></el-pagination>
      <el-dialog :title="dialogTitle" :visible.sync="addUserDialog" width="500px" center>
        <div class="add-user">
          <div class="add-content">
            <el-form
              :model="rulesForm"
              :rules="rules"
              ref="rulesForm"
              label-width="100px"
              class="rulesForm"
            >
              <el-form-item label="添加姓名" prop="userName">
                <el-input v-model="rulesForm.userName" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="添加账号" prop="account">
                <el-input v-model="rulesForm.account" autocomplete="off" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="设置密码" prop="pass">
                <el-input
                  type="password"
                  v-model="rulesForm.pass"
                  autocomplete="off"
                  style="width:90%"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="rulesForm.checkPass"
                  autocomplete="off"
                  style="width:90%"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份" prop="role">
                <el-radio-group v-model="rulesForm.role">
                  <el-radio label="教师"></el-radio>
                  <el-radio label="院级管理员"></el-radio>
                  <el-radio label="系统管理员"></el-radio>
                </el-radio-group>
              </el-form-item>
              <div style="text-align: center;">
                <el-button v-if="isAdd" type="primary" plain @click="resetForm('rulesForm')" style="margin-right: 30px;">重置</el-button>
                <el-button v-if="!isAdd" type="primary" plain @click="cancel()" style="margin-right: 30px;">取消</el-button>
                <el-button type="primary" @click="submit(rulesForm.account)">确定</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="dialogRemove" width="500px">
        <span>确定删除该用户？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogRemove = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="removeUser()" style="padding:8px 15px;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户密码"));
      } else {
        if (this.rulesForm.checkPass !== "") {
          this.$refs.rulesForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.rulesForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      input_search: "",
      dialogRemove: false,
      tableData: [],
      addUserDialog: false,
      dialogTitle: "添加用户",
      isAdd: true,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      pageNum: 1,
      rulesForm: {
        account: "",
        userName: "",
        pass: "",
        checkPass: "",
        role: "教师"
      },
      rules: {
        account: [
          { required: true, message: "请输入用户账号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户的姓名", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validateNewPass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择身份", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUsersInfo();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel(){
      this.addUserDialog = false;
    },
    // 获取用户列表
    getUsersInfo: function() {
      let params = {
        page: this.pageNum,
        page_size: this.pageSize
      }
      this.$http.post("/api/users", this.qs.stringify(params)).then(result => {
        if (result.status === 200) {
          this.tableData = result.data;
          this.total = this.tableData.length
        } else {
          this.$message.error("列表数据获取失败", result.data);
        }
      });
    },
    // 新增用户
    add_user() {
      this. dialogTitle = "添加用户";
      this.addUserDialog = true;
      this.isAdd = true
    },
    // 修改用户信息
    modify(upData) {
      this.dialogTitle = "修改用户";
      this.addUserDialog = true;
      this.isAdd = false
      this.rulesForm = upData;
      this.rulesForm.pass = upData.password;
      this.rulesForm.checkPass = upData.password;
      this._id = upData._id
    },
    // 确定提交
    submit: function(key) {
      let params = {
        account: this.rulesForm.account,
        userName: this.rulesForm.userName,
        password: this.rulesForm.pass,
        role: this.rulesForm.role
      };
      if(this.rulesForm.pass !== this.rulesForm.checkPass){
        return
      } else {
        if(this.isAdd){
          for (const i in this.tableData) {
            if (this.tableData[i].account === key){
              this.$message.error("账号重复，请重新输入!");
              return;
            }
          }
          this.$http.post("/api/add-users", this.qs.stringify(params)).then(result => {
            if (result.data.status === 0) {
              this.getUsersInfo();
              this.$message.success("新增用户信息成功!");
              this.addUserDialog = false;
            } else {
              this.$message.error("新增用户信息失败", result.data);
            }
          });
        } else {
          params._id = this._id
          this.$http.post("/api/update-users", this.qs.stringify(params)).then(result => {
            if (result.data.status === 0) {
              this.$message.success("修改用户信息成功");
              this.getUsersInfo();
              this.addUserDialog = false;
            } else {
              this.$message.error("修改用户信息失败");
            }
          }) 
        }
      }
    },
    // 删除用户
    remove: function(index) {
      this.dialogRemove = true;
      this.user_id = { _id: this.tableData[index]._id };
    },
    removeUser: function() {
      this.$http.post("/api/delete-users", this.qs.stringify(this.user_id)).then(result => {
        if (result.data.status === 0) {
          this.$message.success("删除用户成功");
          this.dialogRemove = false;
          this.getUsersInfo();
        } else {
          this.$message.error("数据删除失败");
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getUsersInfo()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getUsersInfo()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
};
</script>
<style>
.user_manage {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.manage_title {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.manage_title > div:nth-child(1) {
  position: absolute;
  left: 30px;
  top: 15px;
  display: inline-block;
  font-size: 22px;
  font-weight: 500;
}
.manage-content {
  width: 100%;
  height: 100px;
  padding: 0 20px;
  box-sizing: border-box;
}
.right-corner {
  margin: 10px 0;
  width: 400px;
  height: 40px;
  line-height: 40px;
  float: right;
}
.user_manage .el-dialog__header {
  text-align: left;
}
</style>


