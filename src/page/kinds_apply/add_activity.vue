<template>
  <div class="activity">
    <div class="title">科研活动申报</div>
    <div class="from-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="科研活动名称" prop="projectName">
          <el-input v-model="ruleForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="申报账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="申报人" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="院系" prop="second_college">
          <el-select v-model="ruleForm.second_college" placeholder="请选择院系">
            <el-option
              v-for="(item,index) in collegeArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容概要" prop="keywords">
          <el-input v-model="ruleForm.keywords"></el-input>
        </el-form-item>
         <el-form-item label="研究类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择科研活动形式">
            <el-option
              v-for="(item,index) in typeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科研活动类别" prop="field">
          <el-cascader :options="options" v-model="ruleForm.field" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="课题批准单位" prop="approval">
          <el-input v-model="ruleForm.approval"></el-input>
        </el-form-item>
        <el-form-item label="结项日期" prop="endTime">
          <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择结项日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input type="text" autocomplete="off" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="ruleForm.remarks" maxlength="200"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')" style="margin-right:30px;">重置</el-button>
          <el-button type="primary" @click="onSubmit('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "apply",
  data() {
    //全局定义电话验证规则
    const validatePhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/;
      if (value != "" && reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      ruleForm: {
        projectName: "",
        account: "",
        userName: "",
        field: [],
        scores: '',
        keywords: "",
        type: '',
        approval: "",
        date: "",
        second_college: "",
        phone: "",
        remarks: ""
      },
      options: [
        {
          value: "international",
          label: "国际",
          children: [
            {
              value: "80",
              label: "一类"
            },
            {
              value: "40",
              label: "二类"
            },
            {
              value: "20",
              label: "三类"
            },
            {
              value: "10",
              label: "四类"
            }
          ]
        },
        {
          value: "domestic",
          label: "国内",
          children: [
            {
              value: "50",
              label: "一类"
            },
            {
              value: "25",
              label: "二类"
            },
            {
              value: "10",
              label: "三类"
            },
            {
              value: "5",
              label: "四类"
            }
          ]
        },
        {
          value: "school_level",
          label: "校级",
          children: [
            {
              value: "10",
              label: "一类"
            },
            {
              value: "5",
              label: "二类"
            },
            {
              value: "2",
              label: "三类"
            },
            {
              value: "1",
              label: "四类"
            }
          ]
        }
      ],
      typeOptions: [
        {label: '基础研究', value: '1'},
        {label: '应用研究', value: '2'},
        {label: '开发研究', value: '3'}
      ],
      collegeArr: [
        { label: "数学与计算机学院", value: "数计" },
        { label: "土木与建筑工程学院", value: "土建" },
        { label: "人文社科学院", value: "人文" },
        { label: "经济与管理学院", value: "经管" },
        { label: "艺术学院", value: "艺术" },
        { label: "外国语学院", value: "外国语" },
        { label: "钒钛学院", value: "钒钛" },
        { label: "生物与化学工程学院", value: "生化" },
        { label: "电气信息工程学院", value: "电气" },
        { label: "医学院", value: "医学" },
        { label: "机械工程学院", value: "机械" },
        { label: "交通与汽车工程学院", value: "交汽" },
        { label: "康养学院", value: "康养" },
        { label: "智能制造学院", value: "智能" }
      ],
      rules: {
        projectName: [{ required: true, message: "请输入科研活动名称", trigger: "blur" }],
        account: [{ required: true, message: "请输入申请账号", trigger: "blur" }],
        userName: [{ required: true, message: "请输入申请人姓名", trigger: "blur" }],
        field: [{ required: true, message: "请输入科研活动类别", trigger: "blur" }],
        keywords: [{ required: true, message: "请填写内容概要", trigger: "blur" }],
        type: [{ required: true, message: "请选择科研类型", trigger: "blur" }],
        approval: [{ required: true, message: "请输入课题批准单位", trigger: "blur" }],
        second_college: [{ required: true, message: "请选择二级学院", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, message: "请输入正确的11位联系电话", trigger: "blur"}],
        endTime: [{ required: true, message: "请选择结项日期", trigger: "blur" }]
      }
    };
  },
  created() {
    this.routeId = this.$route.query._id;
    if (this.routeId) {
      this.getData(this.routeId);
    }
  },
  methods: {
    getData: function(id) {
      let param = {
        _id: id,
        category: '7'
      };
      this.$http.post("/api/find-one-project", this.qs.stringify(param)).then(result => {
        if (result.data.status === 0) {
          let datas = result.data.data;
          this.ruleForm.projectName = datas.projectName;
          this.ruleForm.account = datas.account;
          this.ruleForm.userName = datas.userName;
          this.ruleForm.second_college = datas.second_college;
          this.ruleForm.keywords = datas.keywords;
          this.ruleForm.type = datas.type;
          this.ruleForm.field = datas.field.split("-");
          this.ruleForm.approval = datas.approval;
          this.ruleForm.endTime = datas.endTime;
          this.ruleForm.phone = datas.phone;
          this.ruleForm.remarks = datas.remarks;
        } else {
          this.$message.error("编辑数据获取失败", result.data);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // cancel() {
    //   console.log("点击取消成功");
    // },
    onSubmit: function() {
      if (this.ruleForm.projectName === "") {
        this.$message.error("请填写科研活动名称");
        return;
      }
      if (this.ruleForm.account === "") {
        this.$message.error("请填写申请人账号");
        return;
      }
      if (this.ruleForm.userName === "") {
        this.$message.error("请填写申请人");
        return;
      }
      if (this.ruleForm.second_college === "") {
        this.$message.error("请选择院系");
        return;
      }
      if (this.ruleForm.keywords === "") {
        this.$message.error("请填写内容概要");
        return;
      }
      if (this.ruleForm.type === "") {
        this.$message.error("请选择科研类型");
        return;
      }
      if (this.ruleForm.field === "") {
        this.$message.error("请选择科研活动类别");
        return;
      }
      if (this.ruleForm.approval === "") {
        this.$message.error("请填写批准单位");
        return;
      }
      if (this.ruleForm.endTime === "") {
        this.$message.error("请填写结项日期");
        return;
      }
      if (this.ruleForm.phone === "") {
        this.$message.error("请填写申请人联系方式");
        return;
      }
      let params = {
        projectName: this.ruleForm.projectName,
        account: this.ruleForm.account,
        userName: this.ruleForm.userName,
        second_college: this.ruleForm.second_college,
        keywords: this.ruleForm.keywords,
        type: this.ruleForm.type,
        field: this.ruleForm.field.join("-"),
        scores: this.ruleForm.scores,
        approval: this.ruleForm.approval,
        endTime: this.ruleForm.endTime,
        phone: this.ruleForm.phone,
        remarks: this.ruleForm.remarks,
        status: "待审核",
        isConclusion: '否',
        category: '科研活动'
      };
      if (this.routeId) {
        params._id = this.routeId
        params.category = '7'
        this.$http.post("/api/update-project", this.qs.stringify(params)).then(result => {
          if (result.data.status === 0) {
            this.$message.success("科研活动修改成功!");
            this.$router.push({
              path: "/query"
            });
          } else {
            this.$message.error("科研活动修改失败", result.data);
          }
        });
      } else {
        this.$http.post("/api/add-project", this.qs.stringify(params)).then(result => {
          if (result.data.status === 0) {
            this.$message.success("科研活动申报成功!");
            this.$router.push({
              path: "/query"
            });
          } else {
            this.$message.error("科研活动申报失败，请检查输入是否有误!");
          }
        });
      }
    },
    handleChange(value) {
      this.ruleForm.scores = value[value.length - 1]
    }
  }
};
</script>
<style scoped>
.activity {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.activity .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.activity .from-content {
  margin-left: 40px;
  width: 800px;
  padding-right: 50px;
  padding-top: 30px;
  box-sizing: border-box;
}
.activity .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 320px;
}
.activity .el-cascader {
  width: 100%;
}
</style>
