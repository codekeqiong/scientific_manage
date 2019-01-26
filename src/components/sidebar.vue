<template>
  <div class="sidebar">
  <el-col :span="24">
    <el-menu
      :default-active="activePath"    
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router>
      <el-menu-item  v-for="(item ,i) in menulist" :index="item.menuUrl" v-if="!item.menuSubLink" :key="i">
          <span slot="title">{{item.menuName}}</span>
      </el-menu-item>
      <el-submenu  v-else :index="item.menuUrl">
        <template slot="title">
          <span>{{item.menuName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item  v-for="(subitem ,subi) in item.menuSubLink" :index="subitem.menuUrl" :key='subi' v-if="!subitem.menuSubLink"><span>{{subitem.menuName}}</span></el-menu-item>
          <el-submenu  :index="subitem.menuUrl" v-else>
            <template slot="title">
              <span>{{subitem.menuName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  v-for="(lastItem ,lastId) in subitem.menuSubLink" :index="lastItem.menuUrl" :key='lastId'><span>{{lastItem.menuName}}</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</div>
</template>

<script>
import { MENULIST } from './menuList'
export default {
  name: 'sidebar',
  data () {
    return {
      msg: 'Welcome to sidebar',
      menulist: MENULIST,
      activeNav: '0',
      activePath: ''
    }
  },
  created: function () {
    this.activePath = '/' + this.$route.path.split('/')[1]
  },
  methods:{
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  },
  watch: {
    '$route': function () {
      this.activePath = '/' + this.$route.path.split('/')[1]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .sidebar{
  height: 870px;
  background-color: #fff;
}
</style>
