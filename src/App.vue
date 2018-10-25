<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">


  *,:before,:after{box-sizing: border-box;}
  body,html{
    padding:0px;
    margin:0px auto;
    height: 100%;
  }
  a{
    text-decoration:none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    height: 100%;
  }
  section{ height: 100%;}

</style>
