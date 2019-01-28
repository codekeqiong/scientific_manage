<template>
  <div class="manage_leave">
    <div class="title">留言列表</div>
    <div class="leave_list">
      <div class="search_line">
        <el-input
          placeholder="请输入搜索内容"
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
          <!-- <el-date-picker v-model="current_time" type="date" @change="getTime" format="yyyy-MM-dd"></el-date-picker> -->
        </el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            {{scope.row.operation}}
            <el-button type="text" size="small" @click="detail()">查看详情</el-button>
            <el-button type="text" size="small" @click="remove()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "manage_leave",
  data() {
    return {
      current_time: '',
      search_input: "",
      tableData: [
        {
          title: "春节放假通知",
          autor: "June",
          add_time: '2019-1-28 18:00:00'
        },
        {
          title: "2019上半年放假安排",
          autor: "June",
          add_time: '2019-1-28 18:01:00'
        }
      ]
    };
  },
  created: {

  },
  methods: {
    handleSelectionChange() {
      this.multipleSelection = val;
    },
    search() {
      console.log("点击搜索成功");
    },
    add_leave() {
      console.log("点击添加留言成功");
    },
    detail() {
      console.log("查看详情");
    },
    remove() {
      console.log("删除留言");
    },
    getTime(date) {
      this.current_time = new Date();
      console.log(this.current_time);
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
