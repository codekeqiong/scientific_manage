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
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="ruleForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="申请人" prop="userName">
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
        <el-form-item label="内容摘要" prop="abstract">
          <el-input type="textarea" v-model="ruleForm.abstract" maxlength="300"></el-input>
        </el-form-item>
        <el-form-item label="研究领域" prop="field">
          <el-cascader
            :options="options"
            v-model="ruleForm.field"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="项目经费" prop="fund">
          <el-input v-model="ruleForm.fund"></el-input>
        </el-form-item>
        <el-form-item label="课题批准单位" prop="approval">
          <el-input v-model="ruleForm.approval"></el-input>
        </el-form-item>
        <el-form-item label="预计结项日期" prop="endTime">
          <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择结项日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input type="text" autocomplete="off" v-model="ruleForm.phone"></el-input>
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
    //全局定义电话验证规则
    const validatePhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/;
      if (value != '' && reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      ruleForm: {
        projectName: "",
        userName: "",
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
      options:[{  // 一、科研项目
        value:'keyanxiangmu',
        label:'科研项目',
        children:[{
          value:'guojiaji',
          label: '国家级',
          children:[{
            value: '2+500+50-50-100',
            label: '重大项目'
          },{
            value: '2+400+40-40-80',
            label: '重点项目'
          },{
            value: '2+300+30-30-60',
            label: '一级项目(A类)'
          },{
            value: '2+200+20-20-50',
            label: '一级项目(B类)'
          }]},{
          value:'shengji',
          label: '省级',
          children:[{
            value: '1+180+20-20-40',
            label: '重大、重点项目'
          },{
            value: '1+100+10-10-20',
            label: '一般项目'
          }]},{
          value:'shiting',
          label: '市厅',
          children:[{
            value: '1+40+4-4-12',
            label: '重大、重点项目'
          },{
            value: '1+30+2-3-10',
            label: '一般项目'
          }]},{
          value:'0.5+20+2-2-6',
          label: '科技厅自筹经费项目'
          },{
          value:'0.5+12+1-1-4',
          label: '高校教育厅平台项目'
          },{
          value:'0.5+8+1-1-3',
          label: '市厅级自筹经费项'
          },{
          value:'0+3+0-0-0',
          label: '校级项目'
          }
        ]
      },{  // 三、 学术论文  分/篇
        value: 'xueshulunwen',
        label: '学术论文',
        children:[{
          value: '400',
          label: '科学（SCIENCE）'
        },{
          value: '400',
          label: '自然（NATURE）'
        },{
          value: 'SCI',
          label: 'SCI',
          children:[{
            value: '200',
            label: 'SCI 一区全文'
          },{
            value: '160',
            label: 'SCI 二区全文'
          },{
            value: '120',
            label: 'SCI 三区全文'
          },{
            value: '90',
            label: 'SCI 四区全文'
          }]},{
          value: '80',
          label: 'SSCI(社会科学引文索引'
        },{
          value: '',
          label: 'EI（工程索引）',
          children:[{
            value: '70',
            label: '期刊上发表，检索为 JA'
          },{
            value: '20',
            label: '国际会议上发表，检索为 CA'
          }]
        },{
          value: '60',
          label: '被A&HCI收录'
        },{
          value: '20',
          label: '被CPCI收录'
        },{
          value: 'rewensheke',
          label: '人文社科',
          children:[{
            value: '100',
            label: 'A 类'
          },{
            value: '80',
            label: 'B 类'
          }]
        },{
          value: 'CSSCI',
          label: 'CSSCI',
          children:[{
            value: '70',
            label: '来源期刊'
          },{
            value: '40',
            label: '集刊'
          }]
        },{
          value: 'CSCD',
          label: 'CSCD',
          children:[{
            value: '100',
            label: '核心库期'
          },{
            value: '80',
            label: '扩展库期刊'
          }]
        },{
          value: '50',
          label: '中文核心期刊'
        },{
          value: '40',
          label: '《新华文摘》、《高校文科学术文摘》、《人大报刊复印资料》、《中国社会科学文摘》、《高校文科学术文摘》论点摘要'
        },{
          value: '3',
          label: '国内外一般期刊'
        },{
          value: '1',
          label: '正式出版的全国性学术会议论文集'
        }] 
      },{  // 四、著作  分/万字
        value: 'zhuzuo',
        label: '著作',
        children:[{
          value: 'zhuangzhu',
          label: '专著',
          children:[{
            value: 'A1',
            label: 'A 类出版社',
            children:[{
              value: '2.5',
              label: '理工科',
            },{
              value: '2.2',
              label: '文科',
            }]
          },{
            value: 'B1',
            label: 'B 类出版社',
            children:[{
              value: '2.0',
              label: '理工科',
            },{
              value: '1.8',
              label: '文科',
            }]
          }],
        },{
          value:'zhu',
          label:'编著、译著，工具书，古籍校、注、释',
          children:[{
            value: 'A2',
            label: 'A 类出版社',
            children:[{
              value: '1.5',
              label: '理工科',
            },{
              value: '1.3',
              label: '文科',
            }]
          },{
            value: 'B2',
            label: 'B 类出版社',
            children:[{
              value: '1.2',
              label: '理工科',
            },{
              value: '1.0',
              label: '文科',
            }]
          }]
        },{
          value: 'gaoxiaojiaocai',
          label: '高校教材(本科)',
          children:[{
            value: 'jiaoyubuA',
            label: '教育部规划教材A类出版社',
            children:[{
              value: '1.7',
              label: '理工科',
              },{
              value: '1.5',
              label: '文科',
            }]
          },{
            value: 'jiaoyubuB',
            label: '教育部规划教材B类出版社',
            children:[{
              value: '1.4',
              label: '理工科',
              },{
              value: '1.2',
              label: '文科',
            }]
          },{
            value: 'qitaA',
            label: '其他A类出版社',
            children:[{
              value: '1.0',
              label: '理工科',
              },{
              value: '0.8',
              label: '文科',
            }]
          },{
            value: 'qitaB',
            label: '其他B类出版社',
            children:[{
              value: '0.7',
              label: '理工科',
              },{
              value: '0.5',
              label: '文科',
            }]
          }]
        }]
      },{  // 五、专利、注册商标、软件及作品版权、产品
        value: '',
        label: '专利、注册商标、软件及作品版权、产品等',
        children:[{
            value: '50',
            label: '涉外发明专利（科学技术发达的国家）',
          },{
            value: '35',
            label: '发明专利',
          },{
            value: '15',
            label: '实用新型专利',
          },{
            value: '15',
            label: '计算机软件著作权登记',
          },{
            value: '5',
            label: '外观设计或注册商标专利',
          },{
            value: '15',
            label: '集成电路版样登记',
          },{
            value: '45',
            label: '国家新产品开发',
          },{
            value: '35',
            label: '省部级全国行业新产品开发',
          },{
            value: '20',
            label: '新技术产品',
          },{
            value: 'xinchanpin',
            label: '新产品、新原料、新分析测试方法的制定',
            children:[{
              value: '40',
              label: '主持国家标准'
            },{
              value: '20',
              label: '主持行业标准'
            },{
              value: '10',
              label: '主持企业标准'
            }]
          }]
      },{  // 科技成果鉴定  分/项
        value: 'kejijianding',
        label: '科技成果鉴定',
        children:[{
          value: 'gjlx1',
          label: '国际领先',
          children:[{
            value: 'gjj1',
            label: '国家级',
            children:[{
              value: '80',
              label: '自然科学'
            },{
              value: '60',
              label: '社会科学'
            }]
          },{
            value: 'sbj1',
            label: '省部级',
            children:[{
              value: '40',
              label: '自然科学'
            },{
              value: '30',
              label: '社会科学'
            }]
          },{
            value: 'shitingji1',
            label: '市厅级',
            children:[{
              value: '20',
              label: '自然科学'
            },{
              value: '15',
              label: '社会科学'
            }]
          }]
        },{
          value: 'guojixianjin',
          label: '国际先进',
          children:[{
            value: 'guojiaji2',
            label: '国家级',
            children:[{
              value: '70',
              label: '自然科学'
            },{
              value: '50',
              label: '社会科学'
            }]
          },{
            value: 'shengbuji2',
            label: '省部级',
            children:[{
              value: '35',
              label: '自然科学'
            },{
              value: '30',
              label: '社会科学'
            }]
          },{
            value: 'shitingji2',
            label: '市厅级',
            children:[{
              value: '25',
              label: '自然科学'
            },{
              value: '20',
              label: '社会科学'
            }]
          }]
        },{
          value: 'gnlx',
          label: '国内领先',
          children:[{
            value: 'gjj3',
            label: '国家级',
            children:[{
              value: '50',
              label: '自然科学'
            },{
              value: '40',
              label: '社会科学'
            }]
          },{
            value: 'sbj3',
            label: '省部级',
            children:[{
              value: '30',
              label: '自然科学'
            },{
              value: '25',
              label: '社会科学'
            }]
          },{
            value: 'stj3',
            label: '市厅级',
            children:[{
              value: '15',
              label: '自然科学'
            },{
              value: '10',
              label: '社会科学'
            }]
          }]
        },{
          value: 'gnxj',
          label: '国内先进',
          children:[{
            value: 'gjj4',
            label: '国家级',
            children:[{
              value: '40',
              label: '自然科学'
            },{
              value: '35',
              label: '社会科学'
            }]
          },{
            value: 'sbj4',
            label: '省部级',
            children:[{
              value: '25',
              label: '自然科学'
            },{
              value: '20',
              label: '社会科学'
            }]
          },{
            value: 'stj4',
            label: '市厅级',
            children:[{
              value: '13',
              label: '自然科学'
            },{
              value: '8',
              label: '社会科学'
            }]
          }]
        }]
      },{  //七 人文社科研究报告 分/部
        value: 'renwensheke',
        label: '人文社科研究报告',
        children:[{
          value: '150',
          label: 'A 级包括获得党和国家领导人批示'
        },{
          value: '100',
          label: 'B 级包括获得省部级主要领导批示'
        },{
          value: '60',
          label: 'C 级包括获得省部级其他领导、副省级城市主要领导批示'
        },{
          value: '30',
          label: 'D 级包括获得县市级党委政府主要领导批示'
        },{
          value: '10',
          label: 'E 级包括获得乡镇级党委政府主要领导批示'
        }]
      },{  // 科技成果转化
       value: 'kejichengguozhuanhua',
       label: '科技成果转化',
       children:[{
          value: '5',
          label: '国际领先技术或成果转移、推广'
        },{
          value: '4',
          label: '国内领先技术或成果转移、推广'
        },{
          value: '3',
          label: '国际先进技术或成果转移、推广'
        },{
          value: '2',
          label: '国内先进技术或成果转移、推广'
        },{
          value: '',
          label: '科技成果创造的收益',
          children:[{
            value: '1',
            label: '10—50 万元'
          },{
            value: '3',
            label: '50—100 万元'
          },{
            value: '5',
            label: '100—500 万元'
          },{
            value: '10',
            label: '500—1000 万元'
          },{
            value: '20',
            label: '1000 万元以上'
          }]
        }]
      },{  // 科技成果奖 分/项
        value: 'kejichengguojiang',
        label: '科技成果奖',
        children:[{
          value: '4000',
          label: '国家最高科学技术奖'
        },{
          value: 'ziran',
          label: '国家自然科学奖、国家技术发明奖、国家科学技术进步奖、国际科学技术合作奖',
          children:[{
            value: '3000',
            label: '特等奖'
          },{
            value: '2000',
            label: '一等奖'
          },{
            value: '1000',
            label: '二等奖'
          }]
        },{
          value: 'xinghuo',
          label: '国家星火奖、教育部高等学校科学研究优秀成果奖',
          children:[{
            value: '1000',
            label: '特等奖'
          },{
            value: '800',
            label: '一等奖'
          },{
            value: '600',
            label: '二等奖'
          },{
            value: '400',
            label: '三等奖'
          }]
        },{
          value: 'jinbu',
          label: '省科技进步奖、技术发明奖、科技杰出贡献奖等',
          children:[{
            value: '1000',
            label: '特等奖'
          },{
            value: '800',
            label: '一等奖'
          },{
            value: '500',
            label: '二等奖'
          },{
            value: '200',
            label: '三等奖'
          }]
        },{
          value: 'zhexue',
          label: '省哲学社会科学优秀成果奖、教学成果奖',
          children:[{
            value: '600',
            label: '特等奖'
          },{
            value: '400',
            label: '一等奖'
          },{
            value: '200',
            label: '二等奖'
          },{
            value: '100',
            label: '三等奖'
          }]
        },{
          value: 'shengbuchengguo',
          label: '其它省部级成果奖（包括国家科技部认定的社会力量评奖单位）',
          children:[{
            value: '400',
            label: '特等奖'
          },{
            value: '300',
            label: '一等奖'
          },{
            value: '150',
            label: '二等奖'
          },{
            value: '70',
            label: '三等奖'
          }]
        },{
          value: 'tingju',
          label: '厅局级自然科学科技成果奖',
          children:[{
            value: '150',
            label: '特等奖'
          },{
            value: '100',
            label: '一等奖'
          },{
            value: '70',
            label: '二等奖'
          },{
            value: '30',
            label: '三等奖'
          }]
        },{
          value: 'shijizhexue',
          label: '市级哲学社会科学优秀成果奖',
          children:[{
            value: '110',
            label: '特等奖'
          },{
            value: '70',
            label: '一等奖'
          },{
            value: '40',
            label: '二等奖'
          },{
            value: '20',
            label: '三等奖'
          }]
        }]
      },{  // 艺体类（体育）
        value: 'yitileitiyu',
        label: '艺体类（体育）',
        children:[{
          value: 'yguojiaji',
          label: '国家级奖',
          children:[{
            value: '80',
            label: '一等奖（1-2 名）'
          },{
            value: '60',
            label: '二等奖（3-4 名）'
          },{
            value: '40',
            label: '三等奖（5-6 名）'
          },{
            value: '20',
            label: '其他'
          }]
        },{
          value: 'yshengbuji',
          label: '省部级奖',
          children:[{
            value: '60',
            label: '一等奖（1-2 名）'
          },{
            value: '40',
            label: '二等奖（3-4 名）'
          },{
            value: '20',
            label: '三等奖（5-6 名）'
          },{
            value: '10',
            label: '其他'
          }]
        },{
          value: 'ydifangji',
          label: '地市级奖',
          children:[{
            value: '20',
            label: '一等奖（1-2 名）'
          },{
            value: '12',
            label: '二等奖（3-4 名）'
          },{
            value: '8',
            label: '三等奖（5-6 名）'
          },{
            value: '4',
            label: '其他'
          }]
        }]
      },{   // 艺体类（美术、艺术设计）
        value: 'yitileimeishusheji',
        label: '艺体类（美术、艺术设计）',
        children: [{
          value: 'yilei',
          label: '一类创作成果',
          children:[{
            value: '80',
            label: '金奖'
          },{
            value: '60',
            label: '银奖'
          },{
            value: '40',
            label: '铜奖'
          },{
            value: '20',
            label: '优秀奖'
          },{
            value: '10',
            label: '作品入选'
          }]
        },{
          value: 'erlei',
          label: '二类创作成果',
          children:[{
            value: '60',
            label: '金奖'
          },{
            value: '40',
            label: '银奖'
          },{
            value: '30',
            label: '铜奖'
          },{
            value: '15',
            label: '优秀奖'
          },{
            value: '8',
            label: '作品入选'
          }]
        },{
          value: 'sanlei',
          label: '三类创作成果',
          children:[{
            value: '40',
            label: '金奖'
          },{
            value: '30',
            label: '银奖'
          },{
            value: '20',
            label: '铜奖'
          },{
            value: '10',
            label: '优秀奖'
          },{
            value: '6',
            label: '作品入选'
          }]
        },{
          value: 'silei',
          label: '四类创作成果',
          children:[{
            value: '30',
            label: '金奖'
          },{
            value: '20',
            label: '银奖'
          },{
            value: '15',
            label: '铜奖'
          },{
            value: '8',
            label: '优秀奖'
          },{
            value: '4',
            label: '作品入选'
          }]
        },{
          value: 'wulei',
          label: '五类创作成果',
          children:[{
            value: '20',
            label: '金奖'
          },{
            value: '15',
            label: '银奖'
          },{
            value: '8',
            label: '铜奖'
          },{
            value: '4',
            label: '优秀奖'
          },{
            value: '2',
            label: '作品入选'
          }]
        },{
          value: 'gerenyishuzhan',
          label: '在国家级、省级、市级美术馆（博物馆）举办个人艺术作品展',
          children:[{
            value: '20',
            label: '国家级'
          },{
            value: '10',
            label: '省级'
          },{
            value: '5',
            label: '市级'
          }]
        },{
          value: 'zuopinshoucang',
          label: '作品被国家级、省级美术馆（博物馆）收藏',
          children:[{
            value: '30',
            label: '国家级'
          },{
            value: '20',
            label: '省级'
          }]
        },{
          value: 'chuban',
          label: '出版个人作品集',
          children:[{
            value: '30',
            label: 'A 类出版社'
          },{
            value: '20',
            label: 'B 类出版社'
          }]
        }]
      },{  // 艺体类（音乐、舞蹈、影视、编导、数字媒体等）
        value: 'yishulaideng',
        label: '艺体类（音乐、舞蹈、影视、编导、数字媒体等）',
        children:[{
          value: 'gjjbs',
          label: '国际级比赛',
          children:[{
            value: '60',
            label: '金奖/银奖/铜奖'
          },{
            value: '30',
            label: '其他'
          }]
        },{
          value: 'gjiajbs',
          label: '国家级比赛',
          children:[{
            value: '60',
            label: '金奖'
          },{
            value: '45',
            label: '银奖'
          },{
            value: '30',
            label: '铜奖'
          },{
            value: '20',
            label: '其他'
          }]
        },{
          value: 'shengbubs',
          label: '省部级比赛',
          children:[{
            value: '40',
            label: '金奖'
          },{
            value: '30',
            label: '银奖'
          },{
            value: '20',
            label: '铜奖'
          },{
            value: '10',
            label: '其他'
          }]
        },{
          value: 'dishijibs',
          label: '地市级比赛',
          children:[{
            value: '20',
            label: '金奖'
          },{
            value: '15',
            label: '银奖'
          },{
            value: '10',
            label: '铜奖'
          },{
            value: '5',
            label: '其他'
          }]
        },{
        value: 'zuopinbc',
        label: '作品参加国家级、省级媒体演出（播出）',
        children:[{
          value: '30',
          label: '国家级'
         },{
          value: '30',
          label: '省级'
         }]
        },{
        value: 'juyuanjuban',
        label: '在剧院举办个人作品音乐会',
        children:[{
          value: '40',
          label: '国家级'
         },{
          value: '30',
          label: '省级'
         },{
          value: '15',
          label: '市级'
         }]
        },{
        value: 'yinyuehuibiaoyanhui',
        label: '在音乐会、表演会、影视剧中担任导演、编剧',
        children:[{
          value: '30',
          label: '国家级'
         },{
          value: '20',
          label: '省级'
         },{
          value: '10',
          label: '市级'
         }]
        },{
        value: 'biaoyanhui',
        label: '在音乐会、表演会、影视剧中担任策划、演出、摄影、灯光、编舞、美工、化妆等',
        children:[{
          value: '20',
          label: '国家级'
         },{
          value: '10',
          label: '省级'
         },{
          value: '5',
          label: '市级'
         }]
        }]
      },{  // 文学作品等
        value: 'wenxuezuopin',
        label: '文学作品等',
        children:[{
          value: 'wenguojiaji',
          label: '国家级比赛',
          children: [{
            value: '60',
            label: '一等奖'
          },{
            value: '40',
            label: '二等奖'
          },{
            value: '20',
            label: '三等奖'
          },{
            value: '10',
            label: '其他'
          }]
        },{
          value: 'wenshengji',
          label: '省级比赛',
          children: [{
            value: '30',
            label: '一等奖'
          },{
            value: '20',
            label: '二等奖'
          },{
            value: '10',
            label: '三等奖'
          },{
            value: '5',
            label: '其他'
          }]
        }]
      },{  // 科研平台及科研团队
        value: 'keyanpingtai',
        label: '科研平台及科研团队',
        children:[{
          value: 'lixiangjianshefen',
          label: '立项建设分',
          children: [{
            value: '200',
            label: '国家级'
          },{
            value: '100',
            label: '省（部）级'
          },{
            value: '30',
            label: '市（厅）级'
          },{
            value: '20',
            label: '校级'
          }]
        },{
          value: 'shenbaofen',
          label: '申报分',
          children: [{
            value: '20',
            label: '国家级'
          },{
            value: '10',
            label: '省（部）级'
          },{
            value: '5',
            label: '市（厅）级'
          },{
            value: '0',
            label: '校级'
          }]
        }]
      },{  // 科研活动
        value: 'keyanhuodong',
        label: '科研活动',
        children:[{
          value: 'guoji',
          label: '国际',
          children: [{
            value: '80',
            label: '一类'
          },{
            value: '40',
            label: '二类'
          },{
            value: '20',
            label: '三类'
          },{
            value: '10',
            label: '四类'
          }]
        },{
          value: 'guonei',
          label: '国内',
          children: [{
            value: '50',
            label: '一类'
          },{
            value: '25',
            label: '二类'
          },{
            value: '10',
            label: '三类'
          },{
            value: '5',
            label: '四类'
          }]
        },{
          value: 'xiaoji',
          label: '校级',
          children: [{
            value: '10',
            label: '一类'
          },{
            value: '5',
            label: '二类'
          },{
            value: '2',
            label: '三类'
          },{
            value: '1',
            label: '四类'
          }]
        }]
      }],
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
          { required: true, message: "请输入项目名称", trigger: "blur" }
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
        abstract: [
          { required: true, message: "请输入内容摘要", trigger: "blur" }
        ],
        fund: [{ required: true, message: "请输入项目经费", trigger: "blur" }],
        second_college: [
          { required: true, message: "请选择二级学院", trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, message: "请输入正确的11位联系电话", trigger: "blur" }],
        endTime: [
          { required: true, message: "请选择预计结项日期", trigger: "blur" }
        ],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  created() {
    this.routeId = this.$route.query._id
    if (this.routeId) {
      this.getData(this.routeId)
    }
  },
  methods: {
    getData:function(id){
      let param = {
        _id: id
      }
      this.$http.post('/api/find-one-project', this.qs.stringify(param)).then((result) => {
        if (result.data.status === 0) {
          let datas = result.data.data
          this.ruleForm.projectName = datas.projectName
          this.ruleForm.userName = datas.userName
          this.ruleForm.second_college = datas.second_college
          this.ruleForm.keywords = datas.keywords
          this.ruleForm.abstract = datas.abstract
          this.ruleForm.field = datas.field
          this.ruleForm.approval = datas.approval
          this.ruleForm.fund = datas.fund
          this.ruleForm.endTime = datas.endTime
          this.ruleForm.phone = datas.phone       
          this.ruleForm.remarks = datas.remarks
        } else {
          this.$message.error("编辑数据获取失败", result.data);
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    cancel(){
      console.log('点击取消成功')
    },
    onSubmit: function() {
      if (this.ruleForm.projectName === "") {
        this.$message.error("请填写项目名称");
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
        this.$message.error("请填写科研项目关键字");
        return;
      }
      if (this.ruleForm.abstract === "") {
        this.$message.error("请填写内容摘要");
        return;
      }
      if (this.ruleForm.field === "") {
        this.$message.error("请填写研究领域");
        return;
      }
      if (this.ruleForm.approval === "") {
        this.$message.error("请填写项目批准单位");
        return;
      }
      if (this.ruleForm.fund === "") {
        this.$message.error("请填写项目所需经费");
        return;
      }
      if (this.ruleForm.endTime === "") {
        this.$message.error("请填写项目的起止日期");
        return;
      }
      if (this.ruleForm.phone === "") {
        this.$message.error("请填写申请人联系方式");
        return;
      }
      if (this.ruleForm.remarks === "") {
        this.$message.error("请填写备注");
        return;
      }
      let params = {
        // 验证是否填写必填项
        projectName: this.ruleForm.projectName,
        userName: this.ruleForm.userName,
        second_college: this.ruleForm.second_college,
        keywords: this.ruleForm.keywords,
        abstract: this.ruleForm.abstract,
        field: this.ruleForm.field,
        approval: this.ruleForm.approval,
        fund: this.ruleForm.fund,
        endTime: this.ruleForm.endTime,
        phone: this.ruleForm.phone,
        remarks: this.ruleForm.remarks,
        status: "待审核"
      };
      if(this.routeId){
        params._id = this.routeId
        this.$http.post("/api/update-project", this.qs.stringify(params)).then(result => {
          if (result.data.status === 0) {
            this.$message.success("科研项目修改成功!");
            this.$router.push({
              path: "/query"
            })
          } else {
            this.$message.error("科研项目修改失败", result.data);
          }
        })
        }else{
        this.$http.post("/api/add-project", this.qs.stringify(params)).then(result => {
          if (result.data.status === 0) {
            this.$message.success("科研项目申报成功!");
            this.$router.push({
              path: "/query"
            })
          } else {
            this.$message.error("科研项目申报失败，请检查输入是否有误!", result.data);
          }
        })
      }
    },
    handleChange(value) {
      console.log(value);
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
.add_project .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 320px;
}
.add_project .el-cascader{
  width: 100%;
}
</style>
