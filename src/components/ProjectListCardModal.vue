<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectTitle"></el-input>
      </el-form-item>
      <el-form-item label="项目简介">
        <el-input v-model="form.projectContent"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="/api/upload"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-error="handleError"
          :limit="1"
          :multiple="false"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default{
  name: 'ProjectListCardModal',
  props:{
    title: {
      type: String,
      default: '添加项目'
    },
    form: {
      type: Object,
      default: () => ({
        projectTitle: '',
        projectContent: '',
        projectImg: ''
      })
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      fileList: []
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    },
    form: {
      handler(val) {
        this.fileList = [{ name: val.projectImg, url: val.projectImg }]
      },
      deep: true
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('update:visible', false)
      done()
    },
    submit() {
      this.$emit('submit')
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.fileList = []
    },
    handleUploadSuccess(res, file, fileList) {
      // console.log(res)
      const { status, msg, data } = res
      if (status === 10000) {
        this.form.projectImg = data
        this.fileList = [{name: data, url: data}]
      }
    },
    handleError(err, file, fileList){
      this.$message.error('上传失败' + err)
    }
  }
}
</script>

<style scoped>

</style>