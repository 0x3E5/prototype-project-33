<template>
  <div class="page-wrap">
    <!-- 工具栏开始 -->
    <div class="page-toolbar">
      <el-dropdown trigger="click" @command="fileHandler">
        <span class="el-dropdown-link">
          文件
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="save">保存</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click" @command="insertHandler">
        <span class="el-dropdown-link">
          置入
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="rect">矩形</el-dropdown-item>
          <el-dropdown-item command="circle">圆形</el-dropdown-item>
          <el-dropdown-item command="triangle">三角形</el-dropdown-item>
          <el-dropdown-item command="star">星形</el-dropdown-item>
          <el-dropdown-item command="image">图片</el-dropdown-item>
          <el-dropdown-item command="text">文字</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="text" @click="helpHandler">帮助</el-button>
    </div>
    <!-- 工具栏结束 -->
    <div class="page-container">
      <!-- 图层开始 -->
      <div class="page-canvas__layer">
        <dl>
          <dt>图层</dt>
          <dd class="active">矩形</dd>
          <dd>圆形</dd>
          <dd>三角形</dd>
        </dl>
      </div>
      <!-- 图层结束 -->
      <!-- canvas舞台开始 -->
      <div ref="page-canvas" id="page-canvas" class="page-canvas__container"></div>
      <!-- canvas 舞台结束 -->
      <!-- 属性开始 -->
      <div class="page-canvas__property">
        <el-descriptions :column="2" size="medium" contentClassName="canvas-property__item" :colon="false" title="基本">
          <el-descriptions-item>
            <el-input size="mini" :value="123456">
              <template slot="append">X</template>
            </el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456">
              <template slot="append">Y</template>
            </el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456">
              <template slot="append">W</template>
            </el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456">
              <template slot="append">H</template>
            </el-input>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="2" size="medium" contentClassName="canvas-property__item" :colon="false" title="背景色">
          <el-descriptions-item>
            <el-color-picker size="small" color-format="hex"></el-color-picker>
            <p>颜色</p>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456">
              <template slot="prepend">#</template>
            </el-input>
            <p>Hex</p>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="2" size="medium" contentClassName="canvas-property__item" :colon="false" title="边框">
          <el-descriptions-item>
            <el-color-picker size="small" color-format="rgb" show-alpha></el-color-picker>
            <p>颜色</p>
            </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456" />
            <p>宽度</p>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="4" size="medium" contentClassName="canvas-property__item" :colon="false" title="阴影">
          <el-descriptions-item>
            <el-color-picker size="small" color-format="rgb" show-alpha></el-color-picker>
            <p>颜色</p>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456" />
            <p>X</p>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456" />
            <p>Y</p>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-input size="mini" :value="123456" />
            <p>模糊</p>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 属性结束 -->
    </div>
  </div>
</template>

<script>
import Konva from 'konva';
export default {
  name: 'PageCanvas',
  data() {
    return {
      stage: null
    }
  },
  methods: {
    // 文件菜单处理
    fileHandler(val) {
      switch (val) {
        case 'save':
          console.log('保存当前页面');
          break;
      }
    },
    // 置入菜单处理
    insertHandler(val) {
      switch(val) {
        case 'rect':
          console.log('插入矩形');
          break;
        case 'circle':
          console.log('插入圆形');
          break;
        case 'triangle':
          console.log('插入三角形');
          break;
        case 'star':
          console.log('插入星形');
          break;
        case 'image':
          console.log('插入图片');
          break;
        case 'text':
          console.log('插入文字');
          break;
      }
    },
    // 帮助按钮
    helpHandler() {
      console.log('帮助按钮');
    },
    // 获取canvas外层元素宽高
    getCanvasElSize() {
      const width = this.$refs['page-canvas'].offsetWidth
      const height = this.$refs['page-canvas'].offsetHeight
      return {
        width: width,
        height: height
      }
    },
    // 绘制矩形
    createRect() {
      const layer = new Konva.Layer()
      const rect = new Konva.Rect({
        id: 'rect',
        name: 'rect',
        x: 20,
        y: 20,
        width: 100,
        height: 50,
        fill: '#fff',
        stroke: 'black',
        strokeWidth: 1
      })
      layer.add(rect)
      this.stage.add(layer)
    }
  },
  mounted() {
    const { width, height } = this.getCanvasElSize()
    this.stage = new Konva.Stage({
      container: 'page-canvas',
      width: width,
      height: height
    })
    setTimeout(() => {
      this.createRect()
      console.log(this.stage);
    }, 100)
  }
}
</script>

<style scoped>
  .page-wrap{
    width: 100%;
    height: 100%;
  }
  /* 工具条样式 */
  .page-wrap > .page-toolbar{
    width: 100%;
    height: 32px;
    text-align: left;
    box-sizing: border-box;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
  }
  .page-wrap > .page-toolbar > div,
  .page-wrap > .page-toolbar > button {
    margin-left: 20px;
    cursor: pointer;
    user-select: none;
    color: #606266;
  }
  .page-wrap > .page-container{
    width: 100%;
    height: calc(100% - 32px);
    display: flex;
  }
  /* 左侧图层样式 */
  .page-wrap > .page-container > .page-canvas__layer,
  .page-wrap > .page-container > .page-canvas__property{
    width: 280px;
    height: 100%;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
    padding: 10px;
  }
  
  .page-container > .page-canvas__layer > dl{
    user-select: none;
    overflow: auto;
    text-align: left;
    color: #888;
  }
  .page-canvas__layer > dl > dt{
    font-size: 16px;
  }
  .page-canvas__layer > dl > dd{
    cursor: pointer;
    font-size: 14px;
    padding: 5px 0;
  }
  .page-canvas__layer > dl > dd.active{
    color: #333;
    font-weight: 600;
  }
  .page-wrap > .page-container > .page-canvas__container{
    width: calc(100% - 560px);
    height: 100%;
    background: #E5E5E5;
    overflow: hidden;
  }
  /* 右侧属性样式 */
  .page-canvas__property >>> .el-input > .el-input__inner{
    padding: 0 5px;
    text-align: center;
  }
  .canvas-property__item p {
    margin: 0;
    text-align: center;
    font-size: 12px;
  }
</style>