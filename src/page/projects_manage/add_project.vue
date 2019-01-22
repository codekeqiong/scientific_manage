<template>
  <div class="add_project">
    <div class="title">项目申报</div>
    <div class="from-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="主题词" prop="theme">
          <el-input v-model="ruleForm.theme"></el-input>
        </el-form-item>
        <el-form-item label="研究领域" prop="field">
          <!-- <el-input v-model="ruleForm.field"></el-input> -->
          <el-checkbox-group v-model="ruleForm.field">
            <el-checkbox label="美食/餐厅线上活动" name="type" style="margin-left: 30px;"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
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
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
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
        remarks: ""
      },
      rules: {
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        theme: [{ required: true, message: "请输入主题词", trigger: "blur" }],
        field: [{ required: true, message: "请输入研究领域", trigger: "blur" }],
        keywords: [
          { required: true, message: "请输入关键词", trigger: "blur" }
        ],
        approval: [
          { required: true, message: "请输入课题批准单位", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "请输入内容摘要", trigger: "blur" }
        ],
        fund: [{ required: true, message: "请输入项目经费", trigger: "blur" }],
        date: [
          { required: true, message: "请选择起止日期", trigger: "change" }
        ],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
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
  /* border: 1px solid #dcdfe6; */
  margin-top: 30px;
  margin-left: 40px;
  width: 800px;
  padding-right: 50px;
  padding-top: 30px;
  box-sizing: border-box;
}
</style>
