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
        <el-card class="card-item" v-for="item in cardList" :key="item.id">
          <div class="card-item__button">
            <el-dropdown @command="cardHandler">
              <span class="card-item__dropdown">.<br />.<br />.</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="'edit,'+ item.id">编辑项目</el-dropdown-item>
                <el-dropdown-item :command="'delete,'+ item.id">删除项目</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-image class="card-item__image" :src="item.image">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <!-- <img :src="item.image" class="card-item__image"> -->
          <div class="card-item__content">
            <p><span class="card-item__title">{{ item.name }}</span><time class="card-item__time">{{ item.date }}</time></p>
            <p class="card-item__desc" v-html="item.desc"></p>
          </div>
        </el-card>
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
export default {
  name: 'ProjectList',
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
    // 编辑项目
    editProject(id) {
      console.log('编辑项目', id)
    },
    // 删除项目
    deleteProject(id) {
      this.$confirm('确定要对该项目进行删除操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除项目', id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        return
      })
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
    // 卡片操作
    cardHandler(val) {
      const flag = val.split(',')
      if (flag[0] === 'edit') {
        this.editProject(flag[1])
      } else if (flag[0] === 'delete') {
        this.deleteProject(flag[1])
      }
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
  .el-main > main > .card-item{
    width: 18%;
    height: 32%;
    margin-bottom: 2%;
  }
  main > .card-item >>> .el-card__body{
    height: 100%;
    padding: 0;
    position: relative;
  }
  main > .card-item >>> .el-card__body:hover .card-item__button{
    display: block;
  }
  .card-item >>> .el-card__body .card-item__button {
    display: none;
    user-select: none;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 3px;
    height: 20px;
    width: 16px;
    background: rgba(255,255,255,0.8);
    border-radius: 2px;
    line-height: 5px;
    font-weight: 700;
    z-index: 2;
  }
  .card-item >>> .el-card__body .card-item__dropdown{
    display: inline-block;
    height: 20px;
    width: 16px;
  }
  .card-item >>> .el-card__body > .card-item__image{
    width: 100%;
    height: 70%;
    border-bottom: 1px solid #eee;
  }
  .card-item >>> .el-card__body .image-slot{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: #ccc;
  }
  .card-item >>> .el-card__body > .card-item__content{
    padding: 5px;
  }
  .card-item >>> .el-card__body > .card-item__content > p {
    margin: 0;
  }
  .card-item >>> .el-card__body > .card-item__content > p:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  .card-item >>> .el-card__body .card-item__title{
    font-size: 16px;
    font-weight: 500;
  }
  .card-item >>> .el-card__body .card-item__time{
    font-size: 14px;
  }
  .card-item >>> .el-card__body  .card-item__desc{
    text-align: left;
    font-size: 14px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  /* 底部样式 */
  .project-list-wrap > .el-main > footer{
    margin-top: 8px;
    height: 32px;
    text-align: right;
  }
</style>