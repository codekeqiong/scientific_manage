<template>
  <div class="fractional">
    <div class="fractional-title">
      <div>科研分数统计</div>
    </div>
    <div class="score-list">
      <div class="search_line">
        <el-input placeholder="请输入项目名称查询" prefix-icon="el-icon-search" v-model="search_info"></el-input>
        <el-button type="primary" @click="search()" style="padding:12px 8px;margin-left: -7px;">搜索</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="申请人" prop="userName"></el-table-column>
        <el-table-column label="申报分" prop="declareScore"></el-table-column>
        <el-table-column label="立项研究分" prop="setUpScore"></el-table-column>
        <el-table-column label="结题分" prop="conclusionScore"></el-table-column>
        <el-table-column label="类别鉴定分" prop="kindsScores"></el-table-column>
        <el-table-column label="数量(万字、篇、项、部)" prop="number"></el-table-column>
        <el-table-column label="项目经费(元)" prop="fund"></el-table-column>
        <el-table-column label="未按时结题扣分" prop="unConclusionScore"></el-table-column>
        <el-table-column label="项目被终止扣分" prop="terminatedDeduct"></el-table-column>
        <el-table-column label="统计分" prop="totalScore"></el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="getLeaveInfo"
        @size-change="getLeaveInfo"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next, jumper"
        style="text-align:right; padding: 49px 29px 50px 0;"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      pageNum: 1,
      pageSize: 10,
      total: 10,
      search_info: '',
      tableData: [{
        projectName: '人工智能',
        account: '8487982',
        userName: 'june',
        declareScore: 2,
        setUpScore: 500,
        conclusionScore: 50,
        unConclusionScore: '-',
        terminatedDeduct: '-',
        kindsScores: 100,
        number: '10',
        fund: 10000,
      }]
    }
  },
  created(){

  },
  methods:{
    handleSelectionChange() {
      this.multipleSelection = val;
    },
    getLeaveInfo:function(){
      console.log('1')
    }
  }
}
</script>
<style>
.fractional {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.fractional-title {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.fractional-title div{
  position: absolute;
  left: 30px;
  top: 15px;
  display: inline-block;
  font-size: 22px;
  font-weight: 500;
}
.fractional .search_line {
  margin: 10px;
  height: 40px;
  text-align: right;
}
</style>
