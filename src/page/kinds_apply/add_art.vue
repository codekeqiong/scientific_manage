<template>
  <div class="art">
    <div class="title">艺体类申报</div>
    <div class="from-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="艺体类名称" prop="projectName">
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
        <el-form-item label="艺体领域" prop="artArea">
          <el-select v-model="ruleForm.artArea" placeholder="请选择艺体领域">
            <el-option
              v-for="(item,index) in areaOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="艺体类别" prop="field">
          <el-cascader :options="options" v-model="ruleForm.field" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="内容描述" prop="keywords">
          <el-input v-model="ruleForm.keywords"></el-input>
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
        keywords: '',
        artArea: "",
        approval: "",
        date: "",
        second_college: "",
        phone: "",
        remarks: ""
      },
      options: [
        {
          // 艺体类（体育）
          value: "art_sport_sport",
          label: "艺体类（体育）",
          children: [
            {
              value: "nation",
              label: "国家级奖",
              children: [
                {
                  value: "80",
                  label: "一等奖（1-2 名）"
                },
                {
                  value: "60",
                  label: "二等奖（3-4 名）"
                },
                {
                  value: "40",
                  label: "三等奖（5-6 名）"
                },
                {
                  value: "20",
                  label: "其他"
                }
              ]
            },
            {
              value: "province_award",
              label: "省部级奖",
              children: [
                {
                  value: "60",
                  label: "一等奖（1-2 名）"
                },
                {
                  value: "40",
                  label: "二等奖（3-4 名）"
                },
                {
                  value: "20",
                  label: "三等奖（5-6 名）"
                },
                {
                  value: "10",
                  label: "其他"
                }
              ]
            },
            {
              value: "municipal_award",
              label: "地市级奖",
              children: [
                {
                  value: "20",
                  label: "一等奖（1-2 名）"
                },
                {
                  value: "12",
                  label: "二等奖（3-4 名）"
                },
                {
                  value: "8",
                  label: "三等奖（5-6 名）"
                },
                {
                  value: "4",
                  label: "其他"
                }
              ]
            }
          ]
        },
        {
          // 艺体类（美术、艺术设计）
          value: "art_sport_art",
          label: "艺体类（美术、艺术设计）",
          children: [
            {
              value: "one_creative",
              label: "一类创作成果",
              children: [
                {
                  value: "80",
                  label: "金奖"
                },
                {
                  value: "60",
                  label: "银奖"
                },
                {
                  value: "40",
                  label: "铜奖"
                },
                {
                  value: "20",
                  label: "优秀奖"
                },
                {
                  value: "10",
                  label: "作品入选"
                }
              ]
            },
            {
              value: "two_creative",
              label: "二类创作成果",
              children: [
                {
                  value: "60",
                  label: "金奖"
                },
                {
                  value: "40",
                  label: "银奖"
                },
                {
                  value: "30",
                  label: "铜奖"
                },
                {
                  value: "15",
                  label: "优秀奖"
                },
                {
                  value: "8",
                  label: "作品入选"
                }
              ]
            },
            {
              value: "three_creative",
              label: "三类创作成果",
              children: [
                {
                  value: "40",
                  label: "金奖"
                },
                {
                  value: "30",
                  label: "银奖"
                },
                {
                  value: "20",
                  label: "铜奖"
                },
                {
                  value: "10",
                  label: "优秀奖"
                },
                {
                  value: "6",
                  label: "作品入选"
                }
              ]
            },
            {
              value: "four_creative",
              label: "四类创作成果",
              children: [
                {
                  value: "30",
                  label: "金奖"
                },
                {
                  value: "20",
                  label: "银奖"
                },
                {
                  value: "15",
                  label: "铜奖"
                },
                {
                  value: "8",
                  label: "优秀奖"
                },
                {
                  value: "4",
                  label: "作品入选"
                }
              ]
            },
            {
              value: "five_creative",
              label: "五类创作成果",
              children: [
                {
                  value: "20",
                  label: "金奖"
                },
                {
                  value: "15",
                  label: "银奖"
                },
                {
                  value: "8",
                  label: "铜奖"
                },
                {
                  value: "4",
                  label: "优秀奖"
                },
                {
                  value: "2",
                  label: "作品入选"
                }
              ]
            },
            {
              value: "artistic_works",
              label: "在国家级、省级、市级美术馆（博物馆）举办个人艺术作品展",
              children: [
                {
                  value: "20",
                  label: "国家级"
                },
                {
                  value: "10",
                  label: "省级"
                },
                {
                  value: "5",
                  label: "市级"
                }
              ]
            },
            {
              value: "collectioned_works",
              label: "作品被国家级、省级美术馆（博物馆）收藏",
              children: [
                {
                  value: "30",
                  label: "国家级"
                },
                {
                  value: "20",
                  label: "省级"
                }
              ]
            },
            {
              value: "publish",
              label: "出版个人作品集",
              children: [
                {
                  value: "30",
                  label: "A类出版社"
                },
                {
                  value: "20",
                  label: "B类出版社"
                }
              ]
            }
          ]
        },
        {
          // 艺体类（音乐、舞蹈、影视、编导、数字媒体等）
          value: "art_sport_media",
          label: "艺体类（音乐、舞蹈、影视、编导、数字媒体等）",
          children: [
            {
              value: "international_match",
              label: "国际级比赛",
              children: [
                {
                  value: "60",
                  label: "金奖/银奖/铜奖"
                },
                {
                  value: "30",
                  label: "其他"
                }
              ]
            },
            {
              value: "nation_match",
              label: "国家级比赛",
              children: [
                {
                  value: "60",
                  label: "金奖"
                },
                {
                  value: "45",
                  label: "银奖"
                },
                {
                  value: "30",
                  label: "铜奖"
                },
                {
                  value: "20",
                  label: "其他"
                }
              ]
            },
            {
              value: "province_match",
              label: "省部级比赛",
              children: [
                {
                  value: "40",
                  label: "金奖"
                },
                {
                  value: "30",
                  label: "银奖"
                },
                {
                  value: "20",
                  label: "铜奖"
                },
                {
                  value: "10",
                  label: "其他"
                }
              ]
            },
            {
              value: "prefecture_match",
              label: "地市级比赛",
              children: [
                {
                  value: "20",
                  label: "金奖"
                },
                {
                  value: "15",
                  label: "银奖"
                },
                {
                  value: "10",
                  label: "铜奖"
                },
                {
                  value: "5",
                  label: "其他"
                }
              ]
            },
            {
              value: "broadcast",
              label: "作品参加国家级、省级媒体演出（播出）",
              children: [
                {
                  value: "30",
                  label: "国家级"
                },
                {
                  value: "30",
                  label: "省级"
                }
              ]
            },
            {
              value: "concert",
              label: "在剧院举办个人作品音乐会",
              children: [
                {
                  value: "40",
                  label: "国家级"
                },
                {
                  value: "30",
                  label: "省级"
                },
                {
                  value: "15",
                  label: "市级"
                }
              ]
            },
            {
              value: "director",
              label: "在音乐会、表演会、影视剧中担任导演、编剧",
              children: [
                {
                  value: "30",
                  label: "国家级"
                },
                {
                  value: "20",
                  label: "省级"
                },
                {
                  value: "10",
                  label: "市级"
                }
              ]
            },
            {
              value: "plan",
              label:
                "在音乐会、表演会、影视剧中担任策划、演出、摄影、灯光、编舞、美工、化妆等",
              children: [
                {
                  value: "20",
                  label: "国家级"
                },
                {
                  value: "10",
                  label: "省级"
                },
                {
                  value: "5",
                  label: "市级"
                }
              ]
            }
          ]
        }
      ],
      areaOptions: [
        {label: '体育', value: '1'},
        {label: '美术', value: '2'},
        {label: '艺术设计', value: '3'},
        {label: '音乐', value: '4'},
        {label: '舞蹈', value: '5'},
        {label: '影视', value: '6'},
        {label: '编导', value: '7'},
        {label: '数字媒体', value: '8'}
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
        keywords: [{ required: true, message: "请填写关键词", trigger: "blur" }],
        artArea: [{ required: true, message: "请选择艺体领域", trigger: "blur" }],
        approval: [{ required: true, message: "请输入课题批准单位", trigger: "blur" }],
        second_college: [{ required: true, message: "请选择二级学院", trigger: "blur" }],
        phone: [{required: true, validator: validatePhone, message: "请输入正确的11位联系电话",trigger: "blur" }],
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
        category:'5'
      };
      this.$http.post("/api/find-one-project", this.qs.stringify(param)).then(result => {
        if (result.data.status === 0) {
          let datas = result.data.data;
          this.ruleForm.projectName = datas.projectName;
          this.ruleForm.account = datas.account;
          this.ruleForm.userName = datas.userName;
          this.ruleForm.second_college = datas.second_college;
          this.ruleForm.keywords = datas.keywords;
          this.ruleForm.artArea = datas.artArea;
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
        this.$message.error("请填写名称");
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
      if (this.ruleForm.artArea === "") {
        this.$message.error("请选择艺体领域");
        return;
      }
      if (this.ruleForm.field === "") {
        this.$message.error("请选择艺体类别");
        return;
      }
       if (this.ruleForm.keywords === "") {
        this.$message.error("请填写内容描述");
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
        artArea: this.ruleForm.artArea,
        field: this.ruleForm.field.join("-"),
        scores: this.ruleForm.scores,
        approval: this.ruleForm.approval,
        endTime: this.ruleForm.endTime,
        phone: this.ruleForm.phone,
        remarks: this.ruleForm.remarks,
        status: "待审核",
        isConclusion: '否',
        category: '5'
      };
      if (this.routeId) {
        params._id = this.routeId
        params.category = '5'
        this.$http.post("/api/update-project", this.qs.stringify(params)).then(result => {
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
        this.$http.post("/api/add-project", this.qs.stringify(params)).then(result => {
          if (result.data.status === 0) {
            this.$message.success("科研论文申报成功!");
            this.$router.push({
              path: "/query"
            });
          } else {
            this.$message.error("科研论文申报失败，请检查输入是否有误!");
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
.art {
  width: 100%;
  height: 850px;
  background-color: #fff;
}
.art .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  font-size: 22px;
  text-align: left;
  border-bottom: 1px solid #eee;
  position: relative;
}
.art .from-content {
  margin-left: 40px;
  width: 800px;
  padding-right: 50px;
  padding-top: 30px;
  box-sizing: border-box;
}
.art .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 320px;
}
.art .el-cascader {
  width: 100%;
}
</style>
