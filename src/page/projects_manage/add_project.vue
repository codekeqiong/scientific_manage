<template>
  <div class="add_project">
    <div class="title">项目申报</div>
    <div class="from-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
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
        <el-form-item label="主题词" prop="theme">
          <el-input v-model="ruleForm.theme"></el-input>
        </el-form-item>
        <el-form-item label="研究领域" prop="field">
          <el-input v-model="ruleForm.field"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="ruleForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="课题批准单位" prop="approval">
          <el-input v-model="ruleForm.approval"></el-input>
        </el-form-item>
        <el-form-item label="内容摘要" prop="abstract">
          <el-input type="textarea" v-model="ruleForm.abstract"></el-input>
        </el-form-item>
        <el-form-item label="项目经费" prop="fund">
          <el-input v-model="ruleForm.fund"></el-input>
        </el-form-item>
        <el-form-item label="起止日期" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
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
    return {
      ruleForm: {
        name: "",
        theme: "",
        field: "",
        keywords: "",
        approval: "",
        abstract: "",
        fund: "",
        date: "",
        second_college: "",
        phone: "",
        remarks: ""
      },
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
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        theme: [{ required: true, message: "请输入主题词", trigger: "blur" }],
        field: [{ required: true, message: "请输入研究领域", trigger: "blur" }],
        keywords: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        approval: [{ required: true, message: "请输入课题批准单位", trigger: "blur" }],
        abstract: [{ required: true, message: "请输入内容摘要", trigger: "blur" }],
        fund: [{ required: true, message: "请输入项目经费", trigger: "blur" }],
        second_college:[{required: true, message: "请选择二级学院", trigger: "blur"}],
        phone: [{required: true, message: "请输入联系方式", trigger: "blur"}],
        date: [
          { required: true, message: "请选择起止日期", trigger: "change" }
        ],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(){
      console.log("提交申请成功")
    }
  }
};
</script>
<style scoped>
.add_project {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.add_project .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.add_project .from-content {
  margin-left: 40px;
  width: 800px;
  padding-right: 50px;
  padding-top: 30px;
  box-sizing: border-box;
}
</style>
