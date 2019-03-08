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
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="userName" label="申请人"></el-table-column>
        <!-- <el-table-column prop="role" label="角色"></el-table-column> -->
        <el-table-column prop="second_college" label="院系"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="createDate" label="申报时间"></el-table-column>
        <el-table-column prop="endTime" label="截止时间"></el-table-column>
        <el-table-column prop="status" label="审核状态"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            {{scope.row.operation}}
            <el-button type="text" size="small" @click="modify()">修改</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.projectName)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="sureRemove()" style="padding:8px 15px;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- tableData分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      layout="total, prev, pager, next"
      style="text-align:right; padding: 49px 29px 50px 0;"
    ></el-pagination>
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
      projectName: "",
      // role: "",
      second_college: "",
      phone: "",
      createDate: "",
      endTime: "",
      status: "",
      total: 10,
      pageSize: 10,
      currentPage: 1,
      pageNum: 1,
      tableData: []
    };
  },
  created() {
    this.queryProject();
  },
  methods: {
    queryProject: function() {
      let param = {
        page: this.pageNum,
        pageSize: this.pageSize
      };
      this.$http
        .post("/api/query-project", this.qs.stringify(param))
        .then(result => {
          if (result.status === 200) {
            this.tableData = result.data;
            this.total = this.tableData.length;
          } else {
            this.$message.error("项目列表数据获取失败", result.data);
          }
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    modify() {
      let param = this.tableData[index]
      this.$router.push({
        path: "/apply",
        // query: { id: param.audience_id }
      })
    },
    remove(projectName) {
      this.removeId = { projectName: projectName };
      this.dialogVisible = true;
    },
    sureRemove(){
      this.$http.post("/api/delete-project", this.qs.stringify(this.removeId)).then(result => {
        if (result.data.status === 0) {
          this.$message.success("删除用户成功");
          this.dialogVisible = false;
          this.queryProject();
        } else {
          this.$message.error("数据删除失败");
        }
      });
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
