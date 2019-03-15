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
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="userName" label="申请人"></el-table-column>
        <!-- <el-table-column prop="role" label="角色"></el-table-column> -->
        <el-table-column prop="second_college" label="院系"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="createDate" label="申报日期"></el-table-column>
        <el-table-column prop="endTime" label="结项日期"></el-table-column>
        <el-table-column prop="status" label="审核状态">
          <template slot-scope="scope1">
            <span v-if="scope1.row.status =='已退回'" style="color:#ff0000">{{scope1.row.status}}</span>
            <span v-else-if="scope1.row.status =='已通过'" style="color:#00ff00">{{scope1.row.status}}</span>
            <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="审核操作">
          <template slot-scope="scope">
            {{scope.row.operation}}
            <el-button type="text" size="small" @click="look(scope.$index)">查看详情</el-button>
            <el-button type="text" size="small" @click="pass(scope.$index)">通过</el-button>
            <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>通过该审核资料？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="surePass()" style="padding:8px 15px;">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="backDialog" width="30%">
        <span>审核结果未通过，确定退回？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="backDialog = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="sureBack()" style="padding:8px 15px;">确 定</el-button>
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
      layout="total, prev, pager, next, jumper"
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
      backDialog: false,
      search_info: "",
      userName: "",
      second_college: "",
      phone: "",
      projectName: "",
      createDate: "",
      endTime: "",
      total: 10,
      pageSize: 10,
      currentPage: 1,
      pageNum: 1,
      tableData: []
    };
  },
  created(){
    this.queryProject()
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
            result.data.forEach(v => {
              if(v.createDate){
                v.createDate = new Date(+new Date(v.createDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
              } 
              if(v.endTime){
                v.endTime = new Date(+new Date(v.endTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
              }
            });
            this.tableData = result.data;
            this.total = this.tableData.length;
          } else {
            this.$message.error("项目列表数据获取失败", result.data);
          }
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    look(index){
      this.$router.push({
        path: "/apply",
        query: { _id: this.tableData[index]._id }
      })
    },
    pass(index) {
      if(this.tableData[index].status=='已通过'){
        this.$message.error('该项目已审核通过，请勿重复操作!')
      }else{
        this.dialogVisible = true
        this.paramId = { _id: this.tableData[index]._id}
      }
    },
    surePass(){
      this.$http.post('/api/pass-one', this.qs.stringify(this.paramId)).then((result) => {
        if(result.data.status === 0){
          this.$message.success('该项目已通过审核')
          this.dialogVisible = false
        } else {
          this.$message.error('操作失败',result.data.data)
        }
      })
    },
    back(index) {
      if(this.tableData[index].status=='已通过'){
        this.$message.error('该项目已审核通过，不能退回!')
      }else{
        this.backDialog = true
        this.paramId = { _id: this.tableData[index]._id}
      }
    },
    sureBack(){
      this.$http.post('/api/back-one', this.qs.stringify(this.paramId)).then((result) => {
        if(result.data.status === 0){
          this.$message.success('该项目经审核未通过已退回')
          this.backDialog = false
        } else {
          this.$message.error('操作失败',result.data.data)
        }
      })
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
