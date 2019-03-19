<template>
  <div class="home_page">
    <div class="tips" @click="skip">
      <el-badge value="new" class="item">
        <i class="el-icon-bell"></i>
      </el-badge>[最新留言]：
      <span>您有新消息点击查看</span>
    </div>
    <!-- 轮播图 -->
    <div class="box">
      <div class="carousel-wrap" id="carousel">
        <!-- 轮播图列表 -->
        <transition-group tag="ul" class="slide-ul" name="list">
          <li
            v-for="(list,index) in slideList"
            :key="index"
            v-show="index===currentIndex"
            @mouseenter="stop"
            @mouseleave="go"
          >
            <a :href="list.clickUrl">
              <img :src="list.image" :alt="list.desc">
            </a>
          </li>
        </transition-group>
        <!-- 轮播图索引点 -->
        <div class="carousel-items">
          <span
            v-for="(item,index) in slideList.length"
            :key="index"
            :class="{'active':index===currentIndex}"
            @mouseover="change(index)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home_page",
  data() {
    return {
      slideList: [
        {
          clickUrl: "http://www.pzhu.edu.cn/",
          desc: "home",
          image: require("@/assets/door.jpg")
        },
        {
          clickUrl: "http://jwc.pzhu.cn/jwweb/",
          desc: "jwweb",
          image: require("@/assets/fence.jpg")
        },
        {
          clickUrl: "http://sccpc.pzhu.cn/",
          desc: "ZG",
          image: require("@/assets/book.jpg")
        },
        {
          clickUrl: "http://218.6.132.3/PZHUXG/WebSite/Web/",
          desc: "XG",
          image: require("@/assets/c.jpg")
        },
        {
          clickUrl: "http://pzhu.fanya.chaoxing.com/portal",
          desc: "portal",
          image: require("@/assets/ting.jpg")
        }
      ],
      currentIndex: 0,
      timer: ""
    };
  },
  created() {
    //在DOM加载完成后，下个tick中开始轮播
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    });
  },
  methods: {
    skip() {
      this.$router.push({
        path: "/manage_leave"
      });
    },
    go() {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    change(index) {
      this.currentIndex = index;
    },
    autoPlay() {
      this.currentIndex++;
      if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0;
      }
    }
  }
};
</script>
<style scoped>
.home_page .tips {
  text-align: left;
  color: #303445;
  font-size: 12px;
  background-color: #eaf4fe;
  height: 31px;
  line-height: 36px;
  margin: 10px 0;
  border-radius: 5px;
  padding-left: 18px;
  cursor: pointer;
}
.home_page .tips i {
  width: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #3091f2;
}
.home_page .box{
  width: 100%;
  height: 780px;
  background-color: #fff;
}
.carousel-wrap {
  position: relative;
  margin: 20px auto;
  height: 700px;
  width: 95%;
  overflow: hidden;

}
.slide-ul {
  margin-top: 50px;
  width: 100%;
  height: 100%;
  padding: 0;
}
.slide-ul li {
  position: absolute;
  width: 100%;
  height: 100%;
}
.slide-ul li img {
  width: 100%;
  height: 100%;
}
.carousel-items {
  position: absolute;
  z-index: 10;
  bottom: 40px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
.carousel-items span {
  display: inline-block;
  height: 6px;
  width: 30px;
  margin: 0 3px;
  background-color: #b2b2b2;
  cursor: pointer;
}
.carousel-items .active {
  background-color: violet;
}

.list-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.list-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}

.list-enter {
  transform: translateX(100%);
}

.list-leave {
  transform: translateX(0);
}
</style>
