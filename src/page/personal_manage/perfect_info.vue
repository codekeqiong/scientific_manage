<template>
  <div class="perfect_info">
    <div class="info-title">个人中心</div>
    <div class="info-content">
      <el-form
        :model="rulesForm"
        :rules="rules"
        ref="rulesForm"
        label-width="100px"
        class="rulesForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="rulesForm.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="account_name">
          <el-input v-model="rulesForm.account_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="rulesForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="院系" prop="second_college">
          <el-select v-model="rulesForm.second_college" placeholder="请选择院系">
            <el-option
              v-for="(item,index) in collegeArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="native_place">
          <el-input v-model="rulesForm.native_place"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="rulesForm.education" placeholder="请选择学历">
            <el-option
              v-for="(item,index) in educationArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth_date">
          <el-date-picker v-model="rulesForm.birth_date" type="date" placeholder="选择出生日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="rulesForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-right:30px;">取消</el-button>
          <el-button type="primary" @click="onSubmit('rulesForm')">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rulesForm: {
        account: "",
        account_name: "",
        sex: "",
        second_college: "",
        native_place: "",
        education: "",
        birth_date: "",
        phone: ""
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
      educationArr: [
        { label: "小学", value: "小学" },
        { label: "初中", value: "初中" },
        { label: "中技", value: "中技" },
        { label: "高中", value: "高中" },
        { label: "中专", value: "中专" },
        { label: "大专", value: "大专" },
        { label: "本科", value: "本科" },
        { label: "硕士", value: "硕士" },
        { label: "MBA", value: "MBA" },
        { label: "EMBA", value: "EMBA" },
        { label: "博士", value: "博士" },
        { label: "其他", value: "其他" }
      ],
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        account_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        second_college: [{ required: true, message: "请输选择二级学院", trigger: "blur" }],
        native_place: [{ required: true, message: "请输入籍贯", trigger: "blur" }],
        education: [{ required: true, message: "请选择学历", trigger: "blur" }],
        birth_date: [{ required: true, message: "请输入出生年月", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }]
      }
    };
  },
  methods:{
    onSubmit(){
      console.log("数据更新成功")
    }
  }
};
</script>
<style scoped>
.perfect_info {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.info-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.perfect_info .info-content {
  /* border: 1px solid #dcdfe6; */
  margin-top: 30px;
  margin-left: 40px;
  width: 800px;
  padding-right: 50px;
  padding-top: 30px;
  box-sizing: border-box;
}
.perfect_info .el-input .el-input__inner {
  padding-right: 30px;
  width: 649px;
}
</style>
