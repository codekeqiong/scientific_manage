<template>
  <div class="academic">
    <div class="title">学术论文类申报</div>
    <div class="from-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="论文名称" prop="projectName">
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
        <el-form-item label="指导老师" prop="tutor">
          <el-input v-model="ruleForm.tutor"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="ruleForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="论文类别" prop="field">
          <el-cascader :options="options" v-model="ruleForm.field" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="课题批准单位" prop="approval">
          <el-input v-model="ruleForm.approval"></el-input>
        </el-form-item>
        <el-form-item label="结项日期" prop="endTime">
          <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="请选择结项日期"></el-date-picker>
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
        second_college: "",
        tutor: '',
        keywords: "",
        field: [],
        scores: '',
        approval: "",
        endTime: "",
        phone: "",
        remarks: ""
      },
      options: [
        {
          value: "400",
          label: "科学（SCIENCE）"
        },
        {
          value: "400",
          label: "自然（NATURE）"
        },
        {
          value: "SCI",
          label: "SCI",
          children: [
            {
              value: "200",
              label: "SCI 一区全文"
            },
            {
              value: "160",
              label: "SCI 二区全文"
            },
            {
              value: "120",
              label: "SCI 三区全文"
            },
            {
              value: "90",
              label: "SCI 四区全文"
            }
          ]
        },
        {
          value: "80",
          label: "SSCI(社会科学引文索引)"
        },
        {
          value: "EI",
          label: "EI（工程索引）",
          children: [
            {
              value: "70",
              label: "期刊上发表，检索为JA"
            },
            {
              value: "20",
              label: "国际会议上发表，检索为CA"
            }
          ]
        },
        {
          value: "60",
          label: "被A&HCI收录"
        },
        {
          value: "20",
          label: "被CPCI收录"
        },
        {
          value: "rewensheke",
          label: "人文社科",
          children: [
            {
              value: "100",
              label: "A 类"
            },
            {
              value: "80",
              label: "B 类"
            }
          ]
        },
        {
          value: "CSSCI",
          label: "CSSCI",
          children: [
            {
              value: "70",
              label: "来源期刊"
            },
            {
              value: "40",
              label: "集刊"
            }
          ]
        },
        {
          value: "CSCD",
          label: "CSCD",
          children: [
            {
              value: "100",
              label: "核心库期"
            },
            {
              value: "80",
              label: "扩展库期刊"
            }
          ]
        },
        {
          value: "50",
          label: "中文核心期刊"
        },
        {
          value: "40",
          label:
            "《新华文摘》、《高校文科学术文摘》、《人大报刊复印资料》、《中国社会科学文摘》、《高校文科学术文摘》论点摘要"
        },
        {
          value: "3",
          label: "国内外一般期刊"
        },
        {
          value: "1",
          label: "正式出版的全国性学术会议论文集"
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
        projectName: [{ required: true, message: "请输入论文名称", trigger: "blur" }],
        account: [{ required: true, message: "请输入申请账号", trigger: "blur" }],
        userName: [{ required: true, message: "请输入申请人姓名", trigger: "blur" }],
        field: [{ required: true, message: "请输入研究领域", trigger: "blur" }],
        keywords: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        approval: [{ required: true, message: "请输入课题批准单位", trigger: "blur" }],
        tutor: [{ required: true, message: "请输入课题指导老师", trigger: "blur" }],
        second_college: [{ required: true, message: "请选择二级学院", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, message: "请输入正确的11位联系电话",trigger: "blur" }],
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
        category: '2'
      };
      this.$http.post("/api/find-one-project", this.qs.stringify(param)).then(result => {
          if (result.data.status === 0) {
            this.ruleForm = result.data.data;       
            this.ruleForm.field = this.ruleForm.field.split("-");
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
        this.$message.error("请填写论文名称");
        return;
      }
      if (this.ruleForm.account === "") {
        this.$message.error("请填写申报人账号");
        return;
      }
      if (this.ruleForm.userName === "") {
        this.$message.error("请填写论文作者");
        return;
      }
      if (this.ruleForm.second_college === "") {
        this.$message.error("请选择院系");
        return;
      }
      if (this.ruleForm.tutor === "") {
        this.$message.error("请填写学术论文指导老师");
        return;
      }
      if (this.ruleForm.keywords === "") {
        this.$message.error("请填写论文关键字");
        return;
      }
      if (this.ruleForm.field === "") {
        this.$message.error("请选择论文类别");
        return;
      }
      if (this.ruleForm.approval === "") {
        this.$message.error("请填写课题批准单位");
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
      let params = {
        // 验证是否填写必填项
        projectName: this.ruleForm.projectName,
        account: this.ruleForm.account,
        userName: this.ruleForm.userName,
        second_college: this.ruleForm.second_college,
        tutor: this.ruleForm.tutor,
        keywords: this.ruleForm.keywords,
        field: this.ruleForm.field.join("-"),
        approval: this.ruleForm.approval,
        endTime: this.ruleForm.endTime,
        phone: this.ruleForm.phone,
        remarks: this.ruleForm.remarks,
        scores: this.ruleForm.scores,
        status: "待审核",
        isConclusion: '否',
        category: '学术论文'
      };
      if (this.routeId) {
        params._id = this.routeId
        params.category = '2'
        this.$http.post("/api/update-project", this.qs.stringify(params)).then(result => {
          if (result.data.status === 0) {
            this.$message.success("学术论文修改成功!");
            this.$router.push({
              path: "/query"
            });
          } else {
            this.$message.error("学术论文修改失败", result.data);
          }
        });
      } else {
        this.$http.post("/api/add-project", this.qs.stringify(params)).then(result => {
          if (result.data.status === 0) {
            this.$message.success("学术论文申报成功!");
            this.$router.push({
              path: "/query"
            });
          } else {
            this.$message.error("学术论文申报失败，请检查输入是否有误!");
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
.academic {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.academic .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.academic .from-content {
  margin-left: 40px;
  width: 800px;
  padding-right: 50px;
  padding-top: 30px;
  box-sizing: border-box;
}
.academic .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 320px;
}
.academic .el-cascader {
  width: 100%;
}
</style>
