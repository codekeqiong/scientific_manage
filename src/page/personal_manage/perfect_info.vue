<template>
  <div class="perfect_info">
    <div class="info-title">个人中心</div>
    <div class="info-content">
      <el-form :model="rulesForm" :rules="rules" ref="rulesForm" label-width="100px" class="rulesForm">
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
          <el-select v-model="ruleForm.second_college" placeholder="请选择院系">
            <el-option v-for="(item,index) in collegeArr" :key="index" label="item.label" value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="native_place">
          <el-input v-model="rulesForm.native_place"></el-input>
        </el-form-item>
         <el-form-item label="学历" prop="education">
          <el-select v-model="ruleForm.education" placeholder="请选择学历">
            <el-option v-for="(item,index) in educationArr" :key="index" label="item.label" value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth_place">
          <el-input v-model="rulesForm.birth_place"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="number" v-model="rulesForm.phone"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      rulesForm:{
        account: '',
        account_name:'',
        sex: '',
        second_college:'',
        native_place:'',
        education: '',
        birth_place: '',
        phone: ''
      },
      //  collegeArr:[{label: '应用id', value: 'apply_id'},
      //   {label: '小程序id', value: 'program_id'},
      //   {label: '模块名称', value: 'model_name'},
      //   {label: '制作用户名', value: 'make_name'},
      //   {label: '分类', value: 'kinds'},
      //   {label: '封面', value: 'cover'},
      //   {label: '权重', value: 'weight'},
      //   {label: '上架状态', value: 'shelf_state'},
      //   {label: '创建时间', value: 'create_time'}],
      rules:{
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        account_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        second_college: [
          { required: true, message: '请输选择二级学院', trigger: 'blur' }
        ],
        native_place: [
          { required: true, message: '请输入籍贯', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请选择学历', trigger: 'blur' }
        ],
        birth_place: [       
          { required: true, message:'请输入出生年月', trigger: 'blur' }
        ],
        phone: [       
          { required: true, message:'请输入联系方式', trigger: 'blur' }
        ]
      },
    }
  }
}
</script>
<style scoped>
.perfect_info{
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.info-title{
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left:20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.info-content{
  margin-top: 30px;
  width: 800px;
}
</style>
