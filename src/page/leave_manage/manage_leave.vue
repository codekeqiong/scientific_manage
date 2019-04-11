<template>
  <div class="manage_leave">
    <div class="title">留言列表</div>
    <div class="leave_list">
      <div class="search_line">
        <el-input
          placeholder="请输入留言标题查询"
          v-model="search_input"
          prefix-icon="el-icon-search"
          clearable
        ></el-input>
        <el-button type="primary" @click="search()" style="padding:12px 8px;margin-left: -7px;">搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="add_leave()"
          style="padding:12px 8px;"
        >添加留言</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="全选" type="selection" width="100"></el-table-column>
        <el-table-column label="编号" type="index" width="100"></el-table-column>
        <el-table-column label="留言标题" prop="title"></el-table-column>
        <el-table-column label="发布者" prop="autor"></el-table-column>
        <el-table-column label="发布时间" prop="add_time">
        <!-- <el-date-picker v-model="current_time" type="date" ></el-date-picker> -->
        </el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            {{scope.row.operation}}
            <el-button type="text" size="small" @click="detail(scope.$index)">查看详情</el-button>
            <el-button type="text" size="small" @click="remove(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加留言" :visible.sync="dialogVisible" width="30%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="留言标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="留言内容" prop="content">
            <el-input type="textarea" v-model="ruleForm.content"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="dialogRemove" width="30%">
        <span>确定删除该留言？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogRemove = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="sureRemove()" style="padding:8px 15px;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- tableData分页 -->
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
</template>
<script>
export default {
  name: "manage_leave",
  data() {
    return {
      current_time: "",
      search_input: "",
      dialogVisible: false,
      dialogRemove: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        title: "",
        content: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入留言标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符范围内",}
        ],
        content: [
          { required: true, message: "请输入留言内容", trigger: "blur" },
          { max: 200, message: "长度在 200 个字符以内"}
        ]
      },
      tableData: []
    };
  },
  created() {
    this.getLeaveInfo()
  },
  methods: {
    // 获取留言列表
    getLeaveInfo:function(){
      let param = {
        page: this.pageNum,
        pageSize: this.pageSize
      }
      this.$http.post('/api/leave',this.qs.stringify(param)).then((result) => {
        result = result.data
      if (result.status === 0) {
        result.data.forEach(v => {
        //UTC日期转换为正常日期显示 
          if(v.add_time){
            v.add_time = new Date(+new Date(v.add_time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
          }
        });
        this.tableData = result.data
        this.total = result.count
      } else {
        this.$message.error("列表数据获取失败", result.data);
      }
    })
    },
    handleSelectionChange() {
      this.multipleSelection = val;
    },
    search() {
      if(this.search_input !== ''){
        let param = {
          page: this.pageNum,
          pageSize: this.pageSize,
          searchText: this.search_input
        }
        this.$http.post('/api/leave',this.qs.stringify(param)).then((result) => {
          result = result.data
          if (result.status === 0) {
            result.data.forEach(v => {
            //UTC日期转换为正常日期显示 
              if(v.add_time){
                v.add_time = new Date(+new Date(v.add_time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
              }
            });
            this.tableData = result.data
            this.total = this.tableData.length
        } else {
          this.$message.error("查询列表数据失败", result.data);
        }
        })
      } else {
        this.getLeaveInfo()
      }
    },
    add_leave() {
      this.dialogVisible = true;
    },
    detail(index) {
      let currentData = this.tableData[index]
      this.$router.push({
        path: "/leave_detail",
        query: { title: currentData.title, content: currentData.content, autor: currentData.autor }
      });
    },
    remove(index) {
      this.removeId = this.tableData[index]._id
      this.dialogRemove = true;
    },
    sureRemove(){
      this.dialogRemove = false
      let param = {
        _id: this.removeId
      }
      let _this = this
      this.$http.post('/api/delete-leave', this.qs.stringify(param)).then((result) => {
        if(result.data.status === 0){
          this.$message.success('删除留言成功')
          if((_this.total - 1)% this.pageSize === 0){
            this.pageNum = Math.ceil((_this.total - 1)/this.pageSize)
          }
          this.getLeaveInfo()
        } else {
          this.$message.error('删除留言失败', result.data.data)
        }
      })
    },
    sure() {
      let param = {
        title: this.ruleForm.title,
        autor: 'june',
        content: this.ruleForm.content
      }
      this.$http.post('/api/add-leave',this.qs.stringify(param)).then((result) => {
        if(result.data.status === 0){
          this.$message.success('添加留言成功!')
          this.getLeaveInfo()
          this.dialogVisible = false;
          this.ruleForm = {}
        }else{
          this.$message.error('添加留言失败', result.data.data)
        }
      })
    }
  }
};
</script>
<style scoped>
.manage_leave {
  width: 100%;
  height: 860px;
  background-color: #fff;
}
.manage_leave .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  text-align: left;
  margin-left: 20px;
  border-bottom: 1px solid #eee;
}
.manage_leave .search_line {
  margin: 10px;
  height: 40px;
  text-align: right;
}
</style>
