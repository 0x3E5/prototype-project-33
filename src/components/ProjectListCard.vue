<template>
  <el-card class="card-item">
    <div class="card-item__button">
      <el-dropdown @command="cardHandler">
        <span class="card-item__dropdown">.<br />.<br />.</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="'edit,'+ value.id">编辑项目</el-dropdown-item>
          <el-dropdown-item :command="'delete,'+ value.id">删除项目</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-image class="card-item__image" :src="value.image">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <!-- <img :src="value.image" class="card-item__image"> -->
    <div class="card-item__content">
      <p><span class="card-item__title">{{ value.name }}</span><time class="card-item__time">{{ value.date }}</time></p>
      <p class="card-item__desc" v-html="value.desc"></p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ProjectListCard',
  props: {
    value:{
      type: Object,
      default: () => ({
        id:1,
        image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        name: '项目1',
        date: '2021-01-01 00:00',
        desc: '项目1很长很长很长很长很长的描述描述......'
      })
    }
  },
  methods: {
    // 卡片操作
    cardHandler(val) {
      const flag = val.split(',')
      if (flag[0] === 'edit') {
        this.$emit('edit', flag[1])
      } else if (flag[0] === 'delete') {
        this.$confirm('确定要对该项目进行删除操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delete', flag[1])
        }).catch(() => {
          return
        })
        
      }
    }
  }
}
</script>

<style scoped>
  .card-item{
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
</style>