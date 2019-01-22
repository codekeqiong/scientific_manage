<template>
  <div class="query_project">
    <div class="title">项目查询</div>
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
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="school" label="院系"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
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
      // tableHead:[
      //   {prop: 'account', label: '账号'},
      //   {prop: 'userName', label: '用户名'},
      //   {prop: 'sex', label: '性别'},
      //   {prop: 'role', label: '角色'},
      //   {prop: 'school', label: '学院'},
      //   {prop: 'phone', label: '联系电话'}
      // ]
      tableData: [
        {
          account: 1234567,
          userName: "墨轩",
          sex: 321456,
          role: "教师",
          school: "数计",
          phone: "13198487982"
        },
        {
          account: 1234567,
          userName: "墨轩",
          sex: 321456,
          role: "教师",
          school: "数计",
          phone: "13198487982"
        }
      ],
      account: "",
      userName: "",
      sex: "",
      role: "",
      school: "",
      phone: ""
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
.query_project .table-content {
  margin-top: 30px;
}
</style>
