<template>
  <div class="approval_project">
    <div class="title">项目审批</div>
    <div class="table-content">
      <div class="search_line">
        <el-input placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="search_info"></el-input>
        <el-button type="primary" @click="search()" style="padding:12px 8px;margin-left: -7px;">搜索</el-button>
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
        <!-- <el-table-column prop="account" label="账号"></el-table-column> -->
        <el-table-column prop="project_name" label="项目名称"></el-table-column>
        <el-table-column prop="userName" label="申请人"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="faculty" label="院系"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="date" label="申报日期"></el-table-column>
        <el-table-column prop="operation" label="审核操作">
          <template slot-scope="scope">
            {{scope.row.operation}}
            <el-button type="text" size="small" @click="pass()">通过</el-button>
            <el-button type="text" size="small" @click="back()">退回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>审核该资料通过？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false" style="padding:8px 15px;">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="backDialog" width="30%">
        <span>审核结果未通过，确定撤回？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="backDialog = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="backDialog = false" style="padding:8px 15px;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "query_project",
  data() {
    return {
      dialogVisible: false,
      backDialog: false,
      search_info: "",
      // account: "",
      userName: "",
      role: "",
      faculty: "",
      phone: "",
      project_name: "",
      date: "",
      tableData: [
        {
          // account: 1234567,
          userName: "墨轩",
          faculty: "数计",
          role: "教师",
          phone: 13198487982,
          project_name: "数学与科技研究",
          date: "2019-01-01"
        },
        {
          // account: 1234567,
          userName: "墨轩",
          faculty: "数计",
          role: "院级管理员",
          phone: 13198487982,
          project_name: "数学与科技研究",
          date: "2019-01-01"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pass() {
      this.dialogVisible = true
      console.log("审批通过")
    },
    back() {
      this.backDialog = true
      console.log("审批不通过，退回")
    }
  }
};
</script>
<style scoped>
.approval_project {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.approval_project .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.approval_project .search_line {
  margin: 10px;
  text-align: right;
  height: 40px;
}
</style>
