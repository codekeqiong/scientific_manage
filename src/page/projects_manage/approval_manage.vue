<template>
  <div class="approval_project">
    <div class="title">项目审批</div>
    <div class="table-content">
      <div class="search_line">
        <span>类别：</span>
        <el-select v-model="kinds"  @change="option_select(kinds)">
          <el-option
            v-for="item in kind_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="请输入项目名称查询" prefix-icon="el-icon-search" v-model="search_info" style="margin-left:10px;"></el-input>
        <el-button type="primary" @click="queryProject()" style="padding:12px 8px;margin-left: -7px;">搜索</el-button>
      </div>
      <!-- 科研项目 -->
      <div class="kinds" v-if="isShow == '1'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="1"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" width="120"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="userName" label="申请人"></el-table-column>
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
              <span v-else-if="scope1.row.status =='已立项'" style="color:#32CD32">{{scope1.row.status}}</span>
              <span v-else-if="scope1.row.status =='已结题'" style="color:#00ff00">{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="审核操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="look(scope.$index)">详情</el-button>
              <el-button type="text" size="small" @click="pass(scope.$index)">立项</el-button>
              <el-button type="text" size="small" @click="end(scope.$index)">结题</el-button>
              <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
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
      <div class="kinds" v-if="isShow == '2'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="2"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" width="120"></el-table-column>
          <el-table-column prop="projectName" label="学术论文名称"></el-table-column>
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
              <span v-else-if="scope1.row.status =='已立项'" style="color:#32CD32">{{scope1.row.status}}</span>
              <span v-else-if="scope1.row.status =='已结题'" style="color:#00ff00">{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="审核操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="look(scope.$index)">详情</el-button>
              <el-button type="text" size="small" @click="pass(scope.$index)">立项</el-button>
              <el-button type="text" size="small" @click="end(scope.$index)">结题</el-button>
              <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
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
      <!-- 著作类 -->
      <div class="kinds" v-if="isShow == '3'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="3"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" width="120"></el-table-column>
          <el-table-column prop="projectName" label="著作名称"></el-table-column>
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
              <span v-else-if="scope1.row.status =='已立项'" style="color:#32CD32">{{scope1.row.status}}</span>
              <span v-else-if="scope1.row.status =='已结题'" style="color:#00ff00">{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="审核操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="look(scope.$index)">详情</el-button>
              <el-button type="text" size="small" @click="pass(scope.$index)">立项</el-button>
              <el-button type="text" size="small" @click="end(scope.$index)">结题</el-button>
              <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
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
      <!-- 文学作品类 -->
      <div class="kinds" v-if="isShow == '4'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="4"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" width="120"></el-table-column>
          <el-table-column prop="projectName" label="文学作品名称"></el-table-column>
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
              <span v-else-if="scope1.row.status =='已立项'" style="color:#32CD32">{{scope1.row.status}}</span>
              <span v-else-if="scope1.row.status =='已结题'" style="color:#00ff00">{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="审核操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="look(scope.$index)">详情</el-button>
              <el-button type="text" size="small" @click="pass(scope.$index)">立项</el-button>
              <el-button type="text" size="small" @click="end(scope.$index)">结题</el-button>
              <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
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
      <div class="kinds" v-if="isShow == '5'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="5"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" width="120"></el-table-column>
          <el-table-column prop="projectName" label="艺体名称"></el-table-column>
          <el-table-column prop="userName" label="申请人"></el-table-column>
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
              <span v-else-if="scope1.row.status =='已立项'" style="color:#32CD32">{{scope1.row.status}}</span>
              <span v-else-if="scope1.row.status =='已结题'" style="color:#00ff00">{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="审核操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="look(scope.$index)">详情</el-button>
              <el-button type="text" size="small" @click="pass(scope.$index)">立项</el-button>
              <el-button type="text" size="small" @click="end(scope.$index)">结题</el-button>
              <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
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
      <!-- 专利著作类 -->
      <div class="kinds" v-if="isShow == '6'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="6"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" width="120"></el-table-column>
          <el-table-column prop="projectName" label="专利名称"></el-table-column>
          <el-table-column prop="userName" label="申请人"></el-table-column>
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
              <span v-else-if="scope1.row.status =='已立项'" style="color:#32CD32">{{scope1.row.status}}</span>
              <span v-else-if="scope1.row.status =='已结题'" style="color:#00ff00">{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="审核操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="look(scope.$index)">详情</el-button>
              <el-button type="text" size="small" @click="pass(scope.$index)">立项</el-button>
              <el-button type="text" size="small" @click="end(scope.$index)">结题</el-button>
              <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
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
      <!-- 科研活动类 -->
      <div class="kinds" v-if="isShow == '7'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          key="7"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" width="120"></el-table-column>
          <el-table-column prop="projectName" label="科研活动名称"></el-table-column>
          <el-table-column prop="userName" label="申请人"></el-table-column>
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
              <span v-else-if="scope1.row.status =='已立项'" style="color:#32CD32">{{scope1.row.status}}</span>
              <span v-else-if="scope1.row.status =='已结题'" style="color:#00ff00">{{scope1.row.status}}</span>
              <span v-else style="color:#409EFF">{{scope1.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="审核操作">
            <template slot-scope="scope">
              {{scope.row.operation}}
              <el-button type="text" size="small" @click="look(scope.$index)">详情</el-button>
              <el-button type="text" size="small" @click="pass(scope.$index)">立项</el-button>
              <el-button type="text" size="small" @click="end(scope.$index)">结题</el-button>
              <el-button type="text" size="small" @click="back(scope.$index)">退回</el-button>
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
    </div>
    <!-- 立项弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>该审核资料已通过？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="padding:8px 15px;">取 消</el-button>
        <el-button type="primary" @click="surePass()" style="padding:8px 15px;">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 结题弹窗 -->
    <el-dialog title="提示" :visible.sync="endDialog" width="30%">
      <span>该审核资料已通过？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="endDialog = false" style="padding:8px 15px;">取 消</el-button>
        <el-button type="primary" @click="sureEnd()" style="padding:8px 15px;">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退回弹窗 -->
    <el-dialog title="提示" :visible.sync="backDialog" width="30%">
      <span>审核结果未通过，确定退回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="backDialog = false" style="padding:8px 15px;">取 消</el-button>
        <el-button type="primary" @click="sureBack()" style="padding:8px 15px;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "query_project",
  data() {
    return {
      dialogVisible: false,
      endDialog: false,
      backDialog: false,
      kinds: "1",
      isShow: '1',
      search_info: "",
      userName: "",
      category: '',  
      scores: '', 
      isConclusion: '',
      phone: "",
      projectName: "",
      createDate: "",
      setUpDate: '',
      endTime: "",
      total: 0,
      pageSize: 10,
      pageNum: 1,
      tableData: [],
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
      ]
    };
  },
  created(){
    this.queryProject()
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
        category: this.isShow
      };
      this.$http.post("/api/query-project", this.qs.stringify(param)).then(result => {
        result = result.data
        if (result.status === 0) {
          result.data.forEach(v => {
            if(v.createDate){
              v.createDate = v.createDate.substr(0,10)
              // v.createDate = new Date(+new Date(v.createDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
            } 
            if(v.endTime){
               v.endTime = v.endTime.substr(0,10)
              // v.endTime = new Date(+new Date(v.endTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
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
      this.multipleSelection = val
    },
    look(index){
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
        query: { _id: this.tableData[index]._id }
      })
    },
    pass(index) {
      if(this.tableData[index].status=='已立项'){
        this.$message.error('该项目已审核通过，请勿重复操作!')
      }else if(this.tableData[index].status=='已结题'){
        this.$message.error('该项目已结题!')
      }else{
        this.dialogVisible = true
        this.paramId = { _id: this.tableData[index]._id,category: this.isShow, setUpDate: Date.now()}
      }
      console.log(this.paramId)
    },
    surePass(){
      this.$http.post('/api/pass-one', this.qs.stringify(this.paramId)).then((result) => {
        if(result.data.status === 0){
          this.$message.success('该项目已通过审核')
          this.dialogVisible = false
          this.queryProject()
        } else {
          this.$message.error('操作失败',result.data.data)
        }
      })
    },
    end(index){
      if(this.tableData[index].status=='已退回' || this.tableData[index].status=='待审核'){
        this.$message.error('该项目未通过审核!')
      } else if(this.tableData[index].status=='已结题'){
        this.$message.error('该项目已结题，请勿重复操作!')
      }else{
        this.endDialog = true
        this.paramId = { _id: this.tableData[index]._id,category: this.isShow}
      }
    },
    sureEnd(){
      this.$http.post('/api/end-one', this.qs.stringify(this.paramId)).then((result) => {
        if(result.data.status === 0){
          this.$message.success('该项目结题成功')
          this.endDialog = false
          this.queryProject()
        } else {
          this.$message.error('结题操作失败',result.data.data)
        }
      })
    },
    back(index) {
      if(this.tableData[index].status=='已立项'){
        this.$message.error('该项目已审核通过，不能退回!')
      }else if(this.tableData[index].status=='已结题'){
        this.$message.error('该项目已结题，不能退回!')
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
          this.queryProject()
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
