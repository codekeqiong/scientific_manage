<template>
  <div class="query_project">
    <div class="title">项目查询</div>
    <div class="table-content">
      <div class="search_line">
        <el-input placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="search_info"></el-input>
        <el-button type="primary" @click="search()" style="padding:12px 8px;margin-left: -7px;">搜索</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="apply()" style="padding:12px 8px;">项目申报</el-button> -->
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
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="userName" label="申请人"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="school" label="院系"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="add_time" label="申报时间"></el-table-column>
        <el-table-column prop="status" label="审核状态"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            {{scope.row.operation}}
            <el-button type="text" size="small" @click="modify()">修改</el-button>
            <el-button type="text" size="small" @click="remove()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false" style="padding:8px 15px;">确 定</el-button>
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
      search_info: "",
      // account: "",
      userName: "",
      name: "",
      role: "",
      school: "",
      phone: "",
      add_time: "",
      status: "",
      tableData: [
        {
          // account: 1234567,
          userName: "墨轩",
          name: 321456,
          role: "教师",
          school: "数计1",
          phone: "13198487982",
          add_time: "2019-01-01",
          status: "待审核"
        },
        {
          // account: 1234567,
          userName: "墨轩",
          name: 321456,
          role: "院级管理员",
          school: "数计2",
          phone: "13198487982",
          add_time: "2019-01-01",
          status: "待审核"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    modify() {
      console.log("点击修改成功")
      this.$router.push({
        path: "/apply"
      });
    },
    remove() {
      console.log("点击删除成功")
      this.dialogVisible = true
    }
  }
};
</script>
<style scoped>
.query_project {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.query_project .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.query_project .search_line {
  margin: 10px;
  height: 40px;
  text-align: right;
}
</style>
