<template>
  <div>
    <el-button size="small" style="margin-bottom: 10px;" type="primary"  @click="dialogFormVisible = true">添加</el-button>

     <el-dialog title="添加页面功能" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="页面名称" :label-width="formLabelWidth" prop="name" >
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" :label-width="formLabelWidth" prop="region">
              <!-- <el-input v-model="form.region" auto-complete="off"></el-input> -->
              <el-select v-model="form.region" placeholder="请选择产品名称" >
                <el-option label="请选择产品名称" value="-1" disabled></el-option>
                <el-option label="货主PC" value="货主PC" ></el-option>
                <el-option label="货主微信" value="货主微信" ></el-option>
                <el-option label="VIP_PC" value="VIP_PC" ></el-option>
                <el-option label="后台管理" value="后台管理" ></el-option>
                <el-option label="司机APP" value="司机APP" ></el-option>
                <el-option label="商户APP" value="商户APP" ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit('form')">确 定</el-button>
          </div>
        </el-dialog>

    <el-table
      :data="comments"
      border
      style="width: 60%">
      <el-table-column
        prop="pageName"
        label="页面名称"
         >
      </el-table-column>
       <el-table-column
        prop="productName"
        label="产品名称"
         >
      </el-table-column>
      <!-- <el-table-column
        label="编辑"   >
        <template slot-scope="scope">
          <el-button type="text" @click="editpagename(scope.$index, scope.row)">编辑</el-button>
          <el-dialog title="编辑页面功能" :visible.sync="dialogEditVisible">
            <el-form :model="form1">
              <el-form-item label="页面名称" :label-width="formLabelWidth">
                <el-input v-model="form1.name1" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="产品名称" :label-width="formLabelWidth">
                <el-select v-model="form1.region1" placeholder="请选择产品名称">
                <el-option label="请选择产品名称" value="-1" disabled></el-option>
                <el-option label="货主PC" value="货主PC" ></el-option>
                <el-option label="货主微信" value="货主微信" ></el-option>
                <el-option label="VIP_PC" value="VIP_PC" ></el-option>
                <el-option label="后台管理" value="后台管理" ></el-option>
                <el-option label="司机APP" value="司机APP" ></el-option>
                <el-option label="商户APP" value="商户APP" ></el-option>
              </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditVisible = false">取 消</el-button>
              <el-button type="primary" @click="edit">确 定</el-button>
          </div>
        </el-dialog>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
    import * as API from '../api/index';
    export default {
        name: "index",
        data(){
          return {
            tableData:[ ],
            dialogFormVisible: false,
            //添加的form
            form: {
              name: '',
              region: ''
            },
            rules: {
              name: [
                {required: true, message: '请填写页面名称', trigger: 'change'}
              ],
              region: [
                {required: true, message: '请选择产品名称', trigger: 'change'}
              ],
            },
            //编辑
            // dialogEditVisible: false,
            // form1: {
            //   name1: '',
            //   region1: ''
            // },
            formLabelWidth: '120px'
          }
        },
      created:function(){
        this.$store.dispatch({ type: 'getPageDetailList'});
        this.getList();
        },
      computed:{
        comments(){
          //console.log(this.$store.state.pagemanage.pageAll)
          return this.$store.state.pagemanage.pageAll//pagemanage.js中的all数组
        }
      },
      methods:{
        getList(){
            this.$store.dispatch({type:'getPageDetailList'})
        },
        //添加数据
        submit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let comment = {
                "pageName": this.form.name,
                "productName": this.form.region
              }
              const url = '/interface-util/interface/detail/savePageDetail'
              API.POST(url, comment).then(res => {
                this.dialogFormVisible = false;
                this.getList();
              })
            }
          })

        },
        // editpagename(index,row){

        //    this.form1.name1= row.pageName;
        //    this.form1.region1 = row.productName;

          // let comment = {
          //   "pageName": this.form1.name1,
          //   "productName": this.form1.region1
          // }
          // const url = '/interface-util/interface/detail/savePageDetail'
          // API.POST(url, comment).then(res => {
          //     this.dialogFormVisible = false;
          //     this. getList();
          // })
        //    this.dialogEditVisible = true;
        // },
        //编辑数据
        // edit(){
        //   this.dialogEditVisible = false
        // }
      },

    }
</script>

<style scoped>
  .el-input {
    width: 50%;
  }
</style>
