<template>
  <div class="add_patent">
    <div class="title">专利注册申报</div>
    <div class="from-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="专利名称" prop="projectName">
          <el-input v-model="ruleForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="userName">
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
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="ruleForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="研究领域" prop="field">
          <el-cascader :options="options" v-model="ruleForm.field" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="课题批准单位" prop="approval">
          <el-input v-model="ruleForm.approval"></el-input>
        </el-form-item>
        <el-form-item label="结项日期" prop="endTime">
          <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择结项日期"></el-date-picker>
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
        keywords: "",
        approval: "",
        date: "",
        second_college: "",
        phone: "",
        remarks: ""
      },
      options: [
        {
          value: "50",
          label: "涉外发明专利（科学技术发达的国家）"
        },
        {
          value: "35",
          label: "发明专利"
        },
        {
          value: "15",
          label: "实用新型专利"
        },
        {
          value: "15",
          label: "计算机软件著作权登记"
        },
        {
          value: "5",
          label: "外观设计或注册商标专利"
        },
        {
          value: "15",
          label: "集成电路版样登记"
        },
        {
          value: "45",
          label: "国家新产品开发"
        },
        {
          value: "35",
          label: "省部级全国行业新产品开发"
        },
        {
          value: "20",
          label: "新技术产品"
        },
        {
          value: "new_formulate",
          label: "新产品、新原料、新分析测试方法的制定",
          children: [
            {
              value: "40",
              label: "主持国家标准"
            },
            {
              value: "20",
              label: "主持行业标准"
            },
            {
              value: "10",
              label: "主持企业标准"
            }
          ]
        }
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
        projectName: [
          { required: true, message: "请输入论文名称", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入申请账号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入申请人姓名", trigger: "blur" }
        ],
        field: [{ required: true, message: "请输入研究领域", trigger: "blur" }],
        keywords: [
          { required: true, message: "请输入关键词", trigger: "blur" }
        ],
        approval: [
          { required: true, message: "请输入课题批准单位", trigger: "blur" }
        ],
        second_college: [
          { required: true, message: "请选择二级学院", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            message: "请输入正确的11位联系电话",
            trigger: "blur"
          }
        ],
        endTime: [
          { required: true, message: "请选择结项日期", trigger: "blur" }
        ]
        // remarks: [{ required: true, message: "请输入备注", trigger: "blur" }]
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
        _id: id
      };
      this.$http
        .post("/api/find-one-project", this.qs.stringify(param))
        .then(result => {
          if (result.data.status === 0) {
            let datas = result.data.data;
            this.ruleForm.projectName = datas.projectName;
            this.ruleForm.account = datas.account;
            this.ruleForm.userName = datas.userName;
            this.ruleForm.second_college = datas.second_college;
            this.ruleForm.keywords = datas.keywords;
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
    cancel() {
      console.log("点击取消成功");
    },
    onSubmit: function() {
      if (this.ruleForm.projectName === "") {
        this.$message.error("请填写论文名称");
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
        this.$message.error("请填写论文关键字");
        return;
      }
      if (this.ruleForm.field === "") {
        this.$message.error("请填写研究领域");
        return;
      }
      if (this.ruleForm.approval === "") {
        this.$message.error("请填写论文批准单位");
        return;
      }
      if (this.ruleForm.endTime === "") {
        this.$message.error("请填写论文的结项日期");
        return;
      }
      if (this.ruleForm.phone === "") {
        this.$message.error("请填写申请人联系方式");
        return;
      }
      // if (this.ruleForm.remarks === "") {
      //   this.$message.error("请填写备注");
      //   return;
      // }
      let params = {
        // 验证是否填写必填项
        projectName: this.ruleForm.projectName,
        account: this.ruleForm.account,
        userName: this.ruleForm.userName,
        second_college: this.ruleForm.second_college,
        keywords: this.ruleForm.keywords,
        field: this.ruleForm.field.join("-"),
        approval: this.ruleForm.approval,
        endTime: this.ruleForm.endTime,
        phone: this.ruleForm.phone,
        remarks: this.ruleForm.remarks,
        status: "待审核"
      };
      if (this.routeId) {
        params._id = this.routeId;
        this.$http
          .post("/api/update-project", this.qs.stringify(params))
          .then(result => {
            if (result.data.status === 0) {
              this.$message.success("科研论文修改成功!");
              this.$router.push({
                path: "/query"
              });
            } else {
              this.$message.error("科研论文修改失败", result.data);
            }
          });
      } else {
        this.$http
          .post("/api/add-project", this.qs.stringify(params))
          .then(result => {
            if (result.data.status === 0) {
              this.$message.success("科研论文申报成功!");
              this.$router.push({
                path: "/query"
              });
            } else {
              this.$message.error(
                "科研论文申报失败，请检查输入是否有误!",
                result.datas
              );
            }
          });
      }
    },
    handleChange(value) {
      console.log(value); // 输出所选的研究领域
      if (value[0] == "scientific") {
        if (value[1] == "nation") {
          console.log("申报分为2分");
        } else if (value[1] == "province" || value[1] == "city") {
          console.log("申报分为1分");
        } else if (value[1] == "20" || value[1] == "12" || value[1] == "8") {
          console.log("申报分为0.5分");
        } else {
          console.log("申报分为0");
        }
      }
    }
  }
};
</script>
<style scoped>
.add_patent {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.add_patent .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.add_patent .from-content {
  margin-left: 40px;
  width: 800px;
  padding-right: 50px;
  padding-top: 30px;
  box-sizing: border-box;
}
.add_patent .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 320px;
}
.add_patent .el-cascader {
  width: 100%;
}
</style>
