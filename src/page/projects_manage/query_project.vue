<template>
  <div class="query_project">
    <div class="title">项目查询</div>
    <div class="table-content">
      <div class="search_line">
        <span>类别：</span>
        <el-select v-model="kinds" @change="option_select(kinds)">
          <el-option
            v-for="item in kind_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入项目名称查询"
          prefix-icon="el-icon-search"
          v-model="search_info"
          style="margin-left:10px;"
        ></el-input>
        <el-button type="primary" @click="search()" style="padding:12px 8px;margin-left: -7px;">查询</el-button>
      </div>
      <!-- 科研项目 -->
      <div class="kinds1">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="编号"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userName" label="申报人"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="scores" label="分数统计"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="createDate" label="申报日期"></el-table-column>
          <el-table-column prop="setUpDate" label="立项日期"></el-table-column>
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="status" label="审核状态">
            <template slot-scope="scope1">
              <span v-if="scope1.row.status =='已退回'" style="color:#ff0000">{{scope1.row.status}}</span>
              <span
                v-else-if="scope1.row.status =='已通过'"
                style="color:#00ff00"
              >{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="modify(scope.$index)">修改</el-button>
              <el-button type="text" size="small" @click="remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="queryProject"
          @size-change="queryProject"
          :page-size="pageSize"
          :current-page.sync="pageNum"
          :total="total"
          layout="total, prev, pager, next, jumper"
          style="text-align:right; padding: 49px 29px 50px 0;"
        ></el-pagination>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>确定删除？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" style="padding:8px 15px;">取 消</el-button>
            <el-button type="primary" @click="sureRemove()" style="padding:8px 15px;">确 定</el-button>
          </span>
        </el-dialog>
      </div>
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
      kinds: "1",
      isShow: "1",
      account: "",
      userName: "",
      projectName: "",
      category: "",
      score: '',
      phone: "",
      createDate: "",
      setUpDate: "",
      endTime: "",
      status: "",
      total: 0,
      pageSize: 10,
      pageNum: 1,
      kind_options: [
        {
          value: "1",
          label: "科研项目"
        },
        {
          value: "2",
          label: "学术论文"
        },
        {
          value: "3",
          label: "专利注册"
        },
        {
          value: "4",
          label: "艺体类"
        },
        {
          value: "5",
          label: "文学作品"
        },
        {
          value: "6",
          label: "著作"
        },
        {
          value: "7",
          label: "科研活动"
        }
      ],
      tableData: [],
      projectHead: []
    };
  },
  created() {
    this.queryProject();
  },
  methods: {
    option_select(e) {
      this.isShow = e;
      console.log(this.isShow);
    },
    search() {
      if (this.search_info !== "") {
        let param = {
          page: this.pageNum,
          pageSize: this.pageSize,
          searchText: this.search_info
        };
        this.$http
          .post("/api/query-project", this.qs.stringify(param))
          .then(result => {
            result = result.data;
            if (result.status === 0) {
              result.data.forEach(v => {
                if (v.createDate) {
                  v.createDate = new Date(
                    +new Date(v.createDate) + 8 * 3600 * 1000
                  )
                    .toISOString()
                    .replace(/T/g, " ")
                    .replace(/\.[\d]{3}Z/, "");
                }
                if (v.endTime) {
                  v.endTime = new Date(+new Date(v.endTime) + 8 * 3600 * 1000)
                    .toISOString()
                    .replace(/T/g, " ")
                    .replace(/\.[\d]{3}Z/, "");
                }
              });
              this.tableData = result.data;
              this.total = this.tableData.length;
            } else {
              this.$message.error("查询列表数据失败", result.data);
            }
          });
      } else {
        this.queryProject();
      }
    },
    queryProject: function() {
      let param = {
        page: this.pageNum,
        pageSize: this.pageSize
      };
      this.$http
        .post("/api/query-project", this.qs.stringify(param))
        .then(result => {
          result = result.data;
          if (result.status === 0) {
            result.data.forEach(v => {
              if (v.createDate) {
                v.createDate = new Date(
                  +new Date(v.createDate) + 8 * 3600 * 1000
                )
                  .toISOString()
                  .replace(/T/g, " ")
                  .replace(/\.[\d]{3}Z/, "");
              }
              if (v.endTime) {
                v.endTime = new Date(+new Date(v.endTime) + 8 * 3600 * 1000)
                  .toISOString()
                  .replace(/T/g, " ")
                  .replace(/\.[\d]{3}Z/, "");
              }
            });
            this.tableData = result.data;
            this.total = result.count;
          } else {
            this.$message.error("项目列表数据获取失败", result.data);
          }
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    modify(index) {
      let param = this.tableData[index];
      if (param.status == "已通过") {
        this.$message.error("该项目已通过审核不能修改!");
      } else {
        this.$router.push({
          path: "/apply",
          query: { _id: param._id }
        });
      }
    },
    remove(index) {
      if (this.tableData[index].status == "已通过") {
        this.$message.error("该项目已通过审核不能删除!");
      } else {
        this.removeId = { _id: this.tableData[index]._id };
        this.dialogVisible = true;
      }
    },
    sureRemove() {
      let _this = this;
      this.$http
        .post("/api/delete-project", this.qs.stringify(this.removeId))
        .then(result => {
          if (result.data.status === 0) {
            this.$message.success("删除用户成功");
            this.dialogVisible = false;
            if ((_this.total - 1) % this.pageSize === 0) {
              this.pageNum = Math.ceil((_this.total - 1) / this.pageSize);
            }
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
