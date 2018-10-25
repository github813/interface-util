<template>
  <el-container >
    <!--<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"-->
             <!--background-color="#545c64"      text-color="#fff" active-text-color="#ffd04b" >-->
    <el-menu  :default-active="defaultActiveIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
             background-color="#545c64"      text-color="#fff" active-text-color="#ffd04b" router >
      <el-menu-item index="/interface" >
        <i class="el-icon-menu"></i>
        <span slot="title">接口管理</span>
      </el-menu-item>
      <el-menu-item index="/page" >
        <i class="el-icon-menu"></i>
        <span slot="title">页面管理</span>
      </el-menu-item>
      <el-menu-item index="/Addconnector" >
        <i class="el-icon-menu"></i>
        <span slot="title">添加接口</span>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header style=" font-size: 12px; line-height: 60px; border-bottom: 1px solid #545c64">

        <el-button  @click.prevent="collapse" v-if="!isCollapse" icon="el-icon-arrow-left"></el-button>
        <el-button  @click.prevent="collapse" v-if="isCollapse" icon="el-icon-arrow-right"></el-button>


      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) .el-submenu{
    width: 200px;
  }
</style>
<script>

  export default {
        name: "home",

        // props
        data() {
          return {
            // defaultActiveIndex:'/index',
            isCollapse: false
          }
        },
        created: function () {


        },
        computed:{
         uname(){
           let userinfo=JSON.parse(sessionStorage.getItem("userinfo"));
           if(userinfo){
              return  userinfo.name;
           }else {
             return "";
           }
         },
          defaultActiveIndex(){
            return sessionStorage.getItem('url')||'/interface'
          }
        },
      methods:{
        collapse: function () {
          this.isCollapse = !this.isCollapse;
        },
        jumpto(url){
          this.defaultActiveIndex=url;
          sessionStorage.setItem('url',url);
          this.$router.push(url);
        },
        handleOpen(key, keyPath) {
          // console.log(key);
          // console.log((keyPath))
        },
        handleClose(key, keyPath) {
          //
        }
      }

    }
</script>
<style>
  body {
    background: #fff;
  }
</style>
<style scoped>
.el-menu{border-color: #545c64;}
</style>
