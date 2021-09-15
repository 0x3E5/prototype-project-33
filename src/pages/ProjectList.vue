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
        <ProjectListCard v-for="item in cardList" :key="item.id" :value="item" @edit="editProject" @delete="deleteProject" />
        <el-empty v-if="cardList.length <= 0" style="width:100%;height:100%;" :image-size="200"></el-empty>
      </main>
      <!-- 卡片列表结束 -->
      <!-- 分页开始 -->
      <footer v-if="cardList.length > 0">
        <el-pagination
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          :current-page.sync="page.current"
          :page-size="page.size"
          :total="total">
        </el-pagination>
      </footer>
      <!-- 分页结束 -->
    </el-main>
  </el-container>
</template>

<script>
import ProjectListCard from '@/components/ProjectListCard'
export default {
  name: 'ProjectList',
  components: {
    ProjectListCard
  },
  data() {
    return {
      page: {
        current: 1,
        size: 15
      },
      total: 20,
      sortText: '按时间正序',
      cardList: [
        {
          id:1,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:2,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:3,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:4,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:5,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:6,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:7,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:8,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:9,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:10,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
        {
          id:11,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '项目1',
          date: '2021-01-01 00:00',
          desc: '项目1很长很长很长很长很长的描述描述......'
        },
      ]
    }
  },
  methods: {
    // 创建项目
    createProject() {
      console.log('创建项目')
    },
    // 改变排序方式
    changeSort(val) {
      if (val === 'asc') {
        this.sortText = '按时间正序'
        console.log('按时间正序查询')
      } else if (val === 'desc') {
        this.sortText = '按时间倒叙'
        console.log('按时间倒叙查询')
      } else if (val === 'name') {
        this.sortText = '按名称排序'
        console.log('按名称查询')
      }
    },
    // 编辑项目
    editProject(id) {
      console.log('编辑项目', id)
    },
    // 删除项目
    deleteProject(id) {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      console.log('删除项目', id)
    },
    // 分页切换
    pageChange(val) {
      console.log('切换分页了')
      console.log(this.page)
    }
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