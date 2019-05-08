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
        <el-button type="primary" @click="queryProject()" style="padding:12px 8px;margin-left: -7px;">查询</el-button>
      </div>
      <!-- 科研项目 -->
      <div class="kinds" v-if="isShow=='1'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="1"
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
          <!-- <el-table-column prop="setUpDate" label="立项日期"></el-table-column> -->
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="isConclusion" label="是否立项"></el-table-column>
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
              <el-button type="text" size="small" @click="remove(scope.$index,1)">删除</el-button>
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
      </div>
      <!-- 学术论文 -->
      <div class="kinds" v-if="isShow=='2'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="2"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="编号"></el-table-column>
          <el-table-column prop="projectName" label="论文名称"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userName" label="作者"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="scores" label="分数统计"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="createDate" label="申报日期"></el-table-column>
          <!-- <el-table-column prop="setUpDate" label="立项日期"></el-table-column> -->
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="isConclusion" label="是否立项"></el-table-column>
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
              <el-button type="text" size="small" @click="remove(scope.$index,2)">删除</el-button>
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
      </div>
      <!-- 著作 -->
      <div class="kinds" v-if="isShow=='3'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="3"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="编号"></el-table-column>
          <el-table-column prop="projectName" label="著作名称"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userName" label="作者"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="scores" label="分数统计"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="createDate" label="申报日期"></el-table-column>
          <!-- <el-table-column prop="setUpDate" label="立项日期"></el-table-column> -->
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="isConclusion" label="是否立项"></el-table-column>
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
              <el-button type="text" size="small" @click="remove(scope.$index,3)">删除</el-button>
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
      </div>
      <!-- 文学作品 -->
      <div class="kinds" v-if="isShow=='4'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="4"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="编号"></el-table-column>
          <el-table-column prop="projectName" label="文学作品名称"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userName" label="作者"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="scores" label="分数统计"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="createDate" label="申报日期"></el-table-column>
          <!-- <el-table-column prop="setUpDate" label="立项日期"></el-table-column> -->
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="isConclusion" label="是否立项"></el-table-column>
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
              <el-button type="text" size="small" @click="remove(scope.$index,4)">删除</el-button>
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
      </div>
      <!-- 艺体类 -->
      <div class="kinds" v-if="isShow=='5'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="5"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="编号"></el-table-column>
          <el-table-column prop="projectName" label="艺体类名称"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userName" label="申报人"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="scores" label="分数统计"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="createDate" label="申报日期"></el-table-column>
          <!-- <el-table-column prop="setUpDate" label="立项日期"></el-table-column> -->
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="isConclusion" label="是否立项"></el-table-column>
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
              <el-button type="text" size="small" @click="remove(scope.$index, 5)">删除</el-button>
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
      </div>
      <!-- 专利注册 -->
      <div class="kinds" v-if="isShow=='6'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="6"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="编号"></el-table-column>
          <el-table-column prop="projectName" label="文学作品名称"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userName" label="作者"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="scores" label="分数统计"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="createDate" label="申报日期"></el-table-column>
          <!-- <el-table-column prop="setUpDate" label="立项日期"></el-table-column> -->
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="isConclusion" label="是否立项"></el-table-column>
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
              <el-button type="text" size="small" @click="remove(scope.$index,6)">删除</el-button>
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
      </div>
      <!-- 科研活动 -->
      <div class="kinds" v-if="isShow=='7'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="7"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="编号"></el-table-column>
          <el-table-column prop="projectName" label="科研活动名称"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userName" label="申报人"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="scores" label="分数统计"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="createDate" label="申报日期"></el-table-column>
          <!-- <el-table-column prop="setUpDate" label="立项日期"></el-table-column> -->
          <el-table-column prop="endTime" label="结项日期"></el-table-column>
          <el-table-column prop="isConclusion" label="是否立项"></el-table-column>
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
              <el-button type="text" size="small" @click="remove(scope.$index,7)">删除</el-button>
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
      </div>
      <!-- 删除弹框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" style="margin-top: 22vh;">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="padding:8px 15px;">取 消</el-button>
          <el-button type="primary" @click="sureRemove()" style="padding:8px 15px;">确 定</el-button>
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
      role: '',
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
          label: "著作"
        },
        {
          value: "4",
          label: "文学作品"
        },
        {
          value: "5",
          label: "艺体类"
        },
        {
          value: "6",
          label: "专利注册"
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
      this.category = e;
      this.queryProject();
    },
    queryProject: function() {
      let param = {
        page: this.pageNum,
        pageSize: this.pageSize,
        searchText: this.search_info,
        category: this.isShow,
        account: '13198487982',   //sessionStorage.getItem('role')  sessionStorage.getItem('account')
        role: '2'
      };
      this.$http.post("/api/query-project", this.qs.stringify(param)).then(result => {
        result = result.data;
        if (result.status === 0) {
          result.data.forEach(v => {
            if (v.createDate) {
              v.createDate = v.createDate.substr(0,10)
              // v.createDate = new Date(+new Date(v.createDate) + 8 * 3600 * 1000)
              //   .toISOString()
              //   .replace(/T/g, " ")
              //   .replace(/\.[\d]{3}Z/, "");
            }
            if (v.endTime) {
              v.endTime = v.endTime.substr(0,10)
              // v.endTime = new Date(+new Date(v.endTime) + 8 * 3600 * 1000)
              // .toISOString()
              // .replace(/T/g, " ")
              // .replace(/\.[\d]{3}Z/, "");
            }
          });
          this.tableData = result.data;
          this.total = param.searchText == "" ?  result.count : result.data.length;
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
      if (param.status == "已立项") {
        this.$message.error("该项目已立项不能修改!");
      } else if(param.status == "已结题"){
        this.$message.error("该项目已结题不能修改!");
      } else {
        let jump;
        switch(this.isShow){
          case '1': jump = '/apply';
          break;
          case '2': jump = '/academic';
          break;
          case '3': jump = '/work';
          break;
          case '4': jump = '/literary';
          break;
          case '5': jump = '/art';
          break;
          case '6': jump = '/patent';
          break;
          case '7': jump = '/activity';
          break;
        }
        this.$router.push({
          path: jump,
          query: { _id: param._id }
        });
      }
    },
    remove(index,type) {
      if (this.tableData[index].status == "已立项") {
        this.$message.error("已立项的项目不能删除!");
      } else if(this.tableData[index].status == "已结题"){
        this.$message.error("已结题的项目不能删除!");
      } else {
        this.removeId = { _id: this.tableData[index]._id,category: type};
        this.dialogVisible = true;
      }
    },
    sureRemove() {
      let _this = this;
      this.$http.post("/api/delete-project", this.qs.stringify(this.removeId)).then(result => {
        if (result.data.status === 0) {
          this.$message.success("该项目删除成功");
          this.dialogVisible = false;
          if ((_this.total - 1) % this.pageSize === 0) {
            this.pageNum = Math.ceil((_this.total - 1) / this.pageSize);
          }
          this.queryProject();
        } else {
          this.$message.error("该项目删除失败", result);
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
.query_project .el-dialog{
  margin-top: 30vh;
}
</style>
