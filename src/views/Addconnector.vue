<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form-inline">
    <el-form-item label="服务名称" prop="serviceName">
      <el-select v-model="ruleForm.serviceName" placeholder="请选择服务名称">
        <el-option label="请选择服务名称" value="-1" disabled></el-option>
        <el-option label="user-service" value="user-service"></el-option>
        <el-option label="order-service" value="order-service"></el-option>
        <el-option label="message-service" value="message-service"></el-option>
        <el-option label="payment-service" value="payment-service"></el-option>
        <el-option label="trace-service" value="trace-service"></el-option>
        <el-option label="job-service" value="job-service"></el-option>
        <el-option label="manage-service" value="manage-service"></el-option>
        <el-option label="credit-service" value="credit-service"></el-option>
        <el-option label="merchant-service" value="merchant-service"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开发者" prop="author">
      <el-select v-model="ruleForm.author" placeholder="请选择开发者">
        <el-option label="请选择开发者" value="-1" disabled></el-option>
        <el-option label="崔万哲" value="崔万哲"></el-option>
        <el-option label="许建科" value="许建科"></el-option>
        <el-option label="胡强强" value="胡强强"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="页面名称" prop="pageId">
      <el-select v-model="ruleForm.pageId " placeholder="请选择页面">
        <el-option label="请选择页面" value="" disabled></el-option>
        <el-option
          v-for="(page,index) in pageDetailList"
          :key="index"
          :label="page.pageName"
          :value="index">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="功能名称" prop="functionName">
      <el-input v-model="ruleForm.functionName " placeholder="请输入功能名称"></el-input>
    </el-form-item>
    <el-form-item label="接口名称" prop="interfaceName">
      <el-input v-model="ruleForm.interfaceName  " placeholder="请输入接口名称"></el-input>
    </el-form-item>
    <el-form-item label="接口路径" prop="interfaceUrl">
      <el-input v-model="ruleForm.interfaceUrl  " placeholder="请输入接口路径"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="ruleForm.remark   " placeholder="请输入备注"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import * as API from '../api/index'
  export default {
    data() {
      return {
        ruleForm: {
          author :'',
          functionName: '' ,
          interfaceName: '' ,
          pageId: null ,
          remark: '' ,
          interfaceUrl:'',
          serviceName: ''
        },
        rules: {
          serviceName: [
            { required: true, message: '请选择服务名称', trigger: 'change' }
          ],
          author: [
            { required: true, message: '请选择开发者', trigger: 'change' }
          ],
          pageId: [
            { required: true, message: '请选择页面', trigger: 'change' }
          ],
          functionName: [
            { required: true, message: '请输入产品名称', trigger: 'change' }
          ],
          interfaceName: [
            { required: true, message: '请输入接口名称', trigger: 'change' }
          ],
          interfaceUrl: [
            { required: true, message: '请输入接口路径', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请输入备注', trigger: 'change' }
          ],

        }
      };
    },
    created:function(){
      this.$store.dispatch({ type: 'getPageDetailList'});
    },
    computed: {
      pageDetailList(){
        return this.$store.state.pagemanage.pageAll;
      },
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let paId = this.ruleForm.pageId;
          let data = {
            serviceName:this.ruleForm.serviceName,
            author:this.ruleForm.author,
            pageId:this.pageDetailList[paId].id,
            productName:this.pageDetailList[paId].productName,
            functionName:this.ruleForm.functionName,
            interfaceName:this.ruleForm.interfaceName,
            interfaceUrl:this.ruleForm.interfaceUrl,
            remark:this.ruleForm.remark,
          };
          if (valid) {
            API.POST('/interface-util/interface/detail/saveInterfaceDetail',data).then(ret=> {
              if (ret.code == 0) {
                this.$message('创建成功');
                this.resetForm('ruleForm');

              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
