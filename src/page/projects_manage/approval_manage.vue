<template>
  <div class="approval_project">
    <div class="title">项目审批</div>
    <div class="table-content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="编号" width="120"></el-table-column>
        <!-- <el-table-column v-for="(index,item) in tableHead" :key="item.index" :prop="item.prop" :label="item.label"></el-table-column> -->
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="userName" label="申请人"></el-table-column>
        <el-table-column prop="number" label="项目编号"></el-table-column>
        <el-table-column prop="project_name" label="项目名称"></el-table-column>
        <el-table-column prop="date" label="申报日期"></el-table-column>
        <el-table-column prop="status" label="审核状态"></el-table-column>
        <el-table-column prop="operation" label="操作">
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
  name: "query_project",
  data() {
    return {
      tableData: [
        {
          account: 1234567,
          userName: "墨轩",
          number: "13453436",
          project_name: "数学与科技研究",
          date: "2019-01-01",
          status: "未审核"
        },
        {
          account: 1234567,
          userName: "墨轩",
          number: "13453436",
          project_name: "数学与科技研究",
          date: "2019-01-01",
          status: "未审核"
        }
      ],
      account: "",
      userName: "",
      number: "",
      project_name: "",
      date: "",
      status: ""
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
.approval_project .table-content {
  margin-top: 30px;
}
</style>
