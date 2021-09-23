<template>
  <el-container class="project-list-wrap">
    <el-main>
      <!-- 操作按钮开始 -->
      <header>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="createProject">创建项目</el-button>
        <el-dropdown trigger="click" @command="changeSort">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--center"></i>{{ sortText }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="asc">按时间正序</el-dropdown-item>
            <el-dropdown-item command="desc">按时间倒叙</el-dropdown-item>
            <el-dropdown-item command="name">按名称排序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </header>
      <!-- 操作按钮结束 -->
      <!-- 卡片列表开始 -->
      <main>
        <ProjectListCard v-for="item in cardList" :key="item.projectId" :value="item" @edit="editProject" @delete="deleteProject" />
        <el-empty v-if="cardList.length <= 0" style="width:100%;height:100%;" :image-size="200"></el-empty>
      </main>
      <!-- 卡片列表结束 -->
      <!-- 分页开始 -->
      <footer v-if="cardList.length > 0">
        <el-pagination
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          :current-page.sync="page.pageNum"
          :page-size="page.pageSize"
          :total="total">
        </el-pagination>
      </footer>
      <!-- 分页结束 -->
    </el-main>
    <ProjectListCardModal :title="title" :form="form" :visible.sync="isShow" @submit="handleSubmit" />
  </el-container>
</template>

<script>
import ProjectListCard from '@/components/ProjectListCard'
import ProjectListCardModal from '@/components/ProjectListCardModal'
import { getList, save, update, getOne, del } from '@/request/project.js'
export default {
  name: 'ProjectList',
  components: {
    ProjectListCard,
    ProjectListCardModal
  },
  data() {
    return {
      isShow: false,
      page: {
        pageNum: 1,
        pageSize: 15,
        isAsc: 'asc',
        orderByColumn: 'createTime'
      },
      total: 0,
      sortText: '按时间正序',
      cardList: [],
      title: '添加项目',
      form: {
        projectTitle: '',
        projectContent: '',
        projectImg: ''
      }
    }
  },
  methods: {
    // 获取项目列表
    fetchList() {
      // console.log(this.page);
      getList(this.page)
      .then(res => {
        // console.log(res);
        const { status, data, msg } = res
        if (status === 10000) {
          this.cardList = data.rows
          this.total = data.total
        } else {
          this.cardList = []
          this.total = 0
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 创建项目
    createProject() {
      // console.log('创建项目')
      this.title = '添加项目'
      this.form = {
        projectId: '',
        projectTitle: '',
        projectContent: '',
        projectImg: ''
      }
      this.isShow = true
    },
    // 改变排序方式
    changeSort(val) {
      if (val === 'asc') {
        this.sortText = '按时间正序'
        this.page = {
          pageNum: 1,
          pageSize: 15,
          isAsc: 'asc',
          orderByColumn: 'createTime'
        }
        console.log('按时间正序查询')
      } else if (val === 'desc') {
        this.sortText = '按时间倒叙'
        this.page = {
          pageNum: 1,
          pageSize: 15,
          isAsc: 'desc',
          orderByColumn: 'createTime'
        }
        console.log('按时间倒叙查询')
      } else if (val === 'name') {
        this.sortText = '按名称排序'
        this.page = {
          pageNum: 1,
          pageSize: 15,
          isAsc: 'asc',
          orderByColumn: 'projectTitle'
        }
        console.log('按名称查询')
      }
      this.fetchList()
    },
    // 编辑项目
    editProject(id) {
      this.title = '编辑项目'
      // console.log('编辑项目', id)
      getOne(id)
      .then(res => {
        const { status, msg, data } =res
        if (status === 10000){
          this.form = data
          this.isShow = true
        }
      })
      .catch(err => {
        this.$message.error(err);
      })
    },
    // 删除项目
    deleteProject(id) {
      del(id).then(res => {
        const { status, data, msg } = res
        if (status === 10000) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.fetchList()
        }
      })
      .catch(err => {
        this.$message.error(err)
      })
     
      // console.log('删除项目', id)
    },
    // 分页切换
    pageChange(val) {
      // console.log('切换分页了')
      // console.log(this.page)
      this.fetchList()
    },
    // 弹框提交
    handleSubmit() {
      // console.log(this.form);
      if (!!this.form.projectId) {
        update(this.form)
        .then(res => {
          const { status, msg, data } = res
          if(status === 10000) {
            this.$message.success(msg)
            this.fetchList()
            this.isShow = false
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
      } else {
        save(this.form)
        .then(res => {
          const { status, msg, data } = res
          if (status === 10000) {
            this.$message.success(msg)
            this.fetchList()
            this.isShow = false
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
      }
    }
  },
  mounted() {
    this.fetchList()
  }
}
</script>

<style scoped>
  .project-list-wrap{
    height: 100%;
  }
  /* 头部样式 */
  .project-list-wrap > .el-main > header{
    height: 40px;
    text-align: right;
  }
  .el-main > header > .el-dropdown{
    user-select: none;
    cursor: pointer;
    color: #409EFF;
    margin-left: 15px;
  }
  /* 主体内容样式 */
  .project-list-wrap > .el-main > main{
    overflow: auto;
    height: calc(100% - 80px);
    display: flex;
    justify-content: space-between;
    align-items:flex-start;
    flex-wrap: wrap;
  }
  .project-list-wrap > .el-main > main::after{
    content: '';
    flex: auto;
  }
  /* 卡片样式 */
  /* .el-main > main >  */
  /* 底部样式 */
  .project-list-wrap > .el-main > footer{
    margin-top: 8px;
    height: 32px;
    text-align: right;
  }
</style>