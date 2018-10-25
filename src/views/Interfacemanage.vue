<template>
  <div>
    <el-form  :model="formInline"   ref="formInline" class="demo-form-inline">

      <el-form-item label="开发环境">
        <el-select v-model="environment" placeholder="请选择开发环境">
          <el-option label="请选择开发环境" value="" disabled></el-option>
          <el-option label="测试环境" value="http://47.92.133.76:" ></el-option>
          <el-option label="开发环境" value="http://192.168.0.20:" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务名称"  >
        <el-select v-model="formInline.serviceName" placeholder="请选择服务名称">
          <el-option label="请选择服务名称" value="" disabled></el-option>
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

      <el-form-item label="开发者"  >
        <el-select v-model="formInline.author" placeholder="请选择开发者">
          <el-option label="请选择开发者" value="" disabled></el-option>
          <el-option label="崔万哲" value="崔万哲"></el-option>
          <el-option label="许建科" value="许建科"></el-option>
          <el-option label="胡强强" value="胡强强"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称"  >
        <el-select v-model="formInline.productName" placeholder="请选择产品名称" @change="handleSelect">
          <el-option label="请选择产品名称" value="" disabled></el-option>
          <el-option label="货主PC" value="货主PC" ></el-option>
          <el-option label="货主微信" value="货主微信" ></el-option>
          <el-option label="VIP_PC" value="VIP_PC" ></el-option>
          <el-option label="后台管理" value="后台管理" ></el-option>
          <el-option label="司机APP" value="司机APP" ></el-option>
          <el-option label="商户APP" value="商户APP" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称"  >
        <el-select v-model="formInline.pageId" placeholder="请选择页面">
          <el-option label="请选择页面" value="" disabled></el-option>
          <el-option
            v-for="page in pageDetailList"
            :key="page.id"
            :label="page.pageName"
            :value="page.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能名称" >
        <el-input v-model="formInline.functionName" placeholder="请输入功能名称"></el-input>
      </el-form-item>
      <el-form-item label="接口名称" >
        <el-input v-model="formInline.interfaceName" placeholder="请输入接口名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" >
        <el-input v-model="formInline.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getlist"  >查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="interfaceDetailList"
      border
      style="width: 100%">
      <el-table-column
        label="#" width="50"   >
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="interfaceName"
        label="接口名称" >
      </el-table-column>
      <el-table-column
        label="接口路径" >

        <template slot-scope="scope">
         <div>
           <a :href=baschttp+scope.row.interfaceUrl target="_blank">{{baschttp+scope.row.interfaceUrl}}</a>
         </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="serviceName"
        label="服务名称" >
      </el-table-column>
      <el-table-column
        prop="functionName"
        label="功能名称" >
      </el-table-column>
      <el-table-column
        prop="pageName"
        label="页面" >
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称" >
      </el-table-column>
      <el-table-column
        prop="author"
        label="开发者" >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注" >
      </el-table-column>
      <el-table-column
        prop="serviceName"
        label="添加时间" >
      </el-table-column>
      <el-table-column
        label="操作"   >
        <template slot-scope="scope">
          <el-button type="text"
                     size="mini"
                     @click="editremark(scope.$index, scope.row)">添加备注</el-button>
          <!--<el-button type="text"-->
                     <!--size="mini"-->
                     <!--@click="editremark(scope.$index, scope.row)">编辑</el-button>-->

        </template>
      </el-table-column>

    </el-table>
    <el-pagination v-if="page.total>0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page.pageNum"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="page.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="page.total">
    </el-pagination>

    <el-dialog
      title="添加备注"
      :visible.sync="dialogVisible"
      width="30%" >
      <div class="demo-input-suffix">
        备注：
        <el-input v-model="remark" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveEdit">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as API from '../api/index'
  export default {
    name: "interface",
    data(){
      return {
        environment:'',
        baschttp:'',
        dialogVisible:false,
        formInline: {
          author :'',
          functionName: '' ,
          interfaceName: '' ,
          pageId: '' ,
          productName:'' ,
          remark: '' ,
          serviceName: ''
        },
        page:{
          pageNum: 1,
          pageSize:10,
          total:0
        },
        remark:'',
        editId:''

      }
    },
    created: function () {

    },
    computed: {
      pageDetailList(){
        return this.$store.state.pagemanage.pageAll;
      },
      interfaceDetailList(){
       let ret=  this.$store.state.interfaceservice.interfaceDetailRet;
       this.page.total=ret.total;
       return ret.list;
      }
    },
    methods:{
      getlist(){
        if(this.environment==''){
          this.$message.error('请选择开发环境');
          return;
        }
        if(this.formInline.serviceName==''){
          this.$message.error('请选择服务名称');
          return;
        }
        let Portnumber='';
        switch (this.formInline.serviceName){
          case 'user-service':
            Portnumber='8001'
            break;
          case 'order-service':
            Portnumber='8101'
            break;
          case 'message-service':
            Portnumber='8201'
            break;
          case 'payment-service':
            Portnumber='8301'
            break;
          case 'trace-service':
            Portnumber='8401'
            break;
          case 'job-service':
            Portnumber='8501'
            break;
          case 'manage-service':
            Portnumber='8601'
            break;
          case 'credit-service':
            Portnumber='8701'
            break;
          case 'merchant-service':
            Portnumber='8801'
            break;
        }

        this.baschttp=this.environment+Portnumber+"/";
        let comment=this.formInline;
        comment['page']=this.page.pageNum;
        comment['pageSize']=this.page.pageSize;
        this.$store.dispatch({ type: 'getInterfaceDetailByQC',comment})
      },
      editremark(index,scope){
        this.editId=scope.id;
         this.dialogVisible=true;
      },
      saveEdit(){
        //PUT /interface-util/interface/detail/updateRemarkById
        if(!this.remark){
          this.$message.error('备注不可为空')
        }
        let param =  new FormData();
        param.append('id',this.editId);
        param.append('remark',this.remark);
        console.log(param.get('id'))
        console.log(param.get('remark'))
        API.POST('/interface-util/interface/detail/updateRemarkById',param).then(ret=> {
          if (ret.code == 0) {
             this.$message({
               message: '操作成功',
               type: 'success'
             })
            this.dialogVisible=false;
            this.getlist()
          }else{
            this.$message.error(ret.msg)
          }
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.page.pageSize=val;
        this.getlist()

      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page.pageNum=val;
        this.getlist()

      },
      resetForm() {
        this.formInline= {
            author :'',
            functionName: '' ,
            interfaceName: '' ,
            pageId: '' ,
            productName:'' ,
            remark: '' ,
            serviceName: ''
        }
        this.environment=''
      },
      handleSelect(){
        let comment={name:this.formInline.productName}
        this.$store.dispatch({ type: 'getPageDetailList',comment});
      }
    }
  }
</script>

<style scoped>
  .el-form-item{ width: 32%; display: inline-block;  }
  .el-input{ width: 50%;}
</style>
