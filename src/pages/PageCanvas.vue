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
          <dd v-for="item in layerList" :key="item.attrs.id" :class="{active: item.attrs.id === activeId }" @click="clickLayerEdit(item.attrs.id)">{{ item.attrs.name }}<el-button type="text" icon="el-icon-delete" @click="clickLayerDelete(item.attrs.id)" /></dd>
        </dl>
      </div>
      <!-- 图层结束 -->
      <!-- canvas舞台开始 -->
      <div ref="page-canvas" id="page-canvas" class="page-canvas__container"></div>
      <!-- canvas 舞台结束 -->
      <!-- 属性开始 -->
      <div class="page-canvas__property">
        <template v-if="editFlag">
          <el-descriptions :column="2" size="medium" contentClassName="canvas-property__item" :colon="false" title="基本">
            <el-descriptions-item>
              <el-input size="mini" v-model="currentEditor.attrs.x" @input="updateKonva">
                <template slot="append">X</template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini" v-model="currentEditor.attrs.y" @input="updateKonva">
                <template slot="append">Y</template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini" v-model="currentEditor.attrs.width" @input="updateKonva">
                <template slot="append">W</template>
              </el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini" v-model="currentEditor.attrs.height" @input="updateKonva">
                <template slot="append">H</template>
              </el-input>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="2" size="medium" contentClassName="canvas-property__item" :colon="false" title="背景色">
            <el-descriptions-item>
              <el-color-picker size="small" color-format="hex" v-model="currentEditor.attrs.fill" @change="updateKonva"></el-color-picker>
              <p>颜色</p>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini" v-model="currentEditor.attrs.fill" @input="updateKonva">
              </el-input>
              <p>Hex</p>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="2" size="medium" contentClassName="canvas-property__item" :colon="false" title="边框">
            <el-descriptions-item>
              <el-color-picker size="small" color-format="rgb" show-alpha v-model="currentEditor.attrs.stroke" @change="updateKonva"></el-color-picker>
              <p>颜色</p>
              </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini" v-model="currentEditor.attrs.strokeWidth" @input="updateKonva"/>
              <p>宽度</p>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="4" size="medium" contentClassName="canvas-property__item" :colon="false" title="阴影">
            <el-descriptions-item>
              <el-color-picker size="small" color-format="rgb" show-alpha v-model="currentEditor.attrs.shadowColor" @change="updateKonva"></el-color-picker>
              <p>颜色</p>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini"  v-model="currentEditor.attrs.shadowOffsetX" @input="updateKonva" />
              <p>X</p>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini"  v-model="currentEditor.attrs.shadowOffsetY" @input="updateKonva" />
              <p>Y</p>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-input size="mini"  v-model="currentEditor.attrs.shadowBlur" @input="updateKonva" />
              <p>模糊</p>
            </el-descriptions-item>
          </el-descriptions>
        </template>
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
      stage: null,
      layer: null,
      editFlag: false,
      currentEditor: null,
      activeId: null,
      layerList: []
    }
  },
  watch:{
    /**
     * TODO 影响性能，待优化
     */
    stage: {
      handler(val) {
        this.layerList = []
        const layer = val.find('Layer')[0].children
        layer.forEach(shape => {
          if (shape.attrs.name !== 'transformer') {
            this.layerList.push(shape)
          }
        })
      },
      deep: true
    }
  },
  methods: {
    // 文件菜单处理
    fileHandler(val) {
      switch (val) {
        case 'save':
          console.log('保存当前页面');
          console.log(this.stage.toJSON())
          console.log(this.stage.toDataURL({ pixelRatio: 1 }));
          break;
      }
    },
    // 置入菜单处理
    insertHandler(val) {
      switch(val) {
        case 'rect':
          console.log('插入矩形');
          this.createRect()
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
    // 初始化舞台
    initKonva() {
      const { width, height } = this.getCanvasElSize()
      this.stage = new Konva.Stage({
        container: 'page-canvas',
        width: width,
        height: height
      })
      this.layer = new Konva.Layer()
      this.stage.add(this.layer)
      this.stage.on('click', e => {
        if (e.target === this.stage) {
          // 点击空白区域移除编辑状态
          this.clearEdit()
        } else {
          this.setEdit(e.target)
        }
        this.layer.draw()
      })
      this.stage.on('dblclick', e => {
        if (e.target !== this.stage) {
          // 点击空白区域移除编辑状态
          this.setDelete(e.target)
        }
      })
      window.stage = this.stage
    },
    // 设置图形编辑状态
    setEdit(shape) {
      if (!shape) return
      this.clearEdit()
      this.editFlag = true
      this.activeId = shape.attrs.id
      this.currentEditor = shape
      shape.draggable(true)
      this.tr = new Konva.Transformer({
        name:'transformer',
        rotationSnaps: [0, 90, 180, 270],
      })
      this.layer.add(this.tr)
      this.tr.nodes([shape])
      shape.on('transform',() => {
        shape.width(Math.max(5, shape.width() * shape.scaleX()))
        shape.height(Math.max(5, shape.height() * shape.scaleY()))
        shape.scaleX(1)
        shape.scaleY(1)
      })
      // this.layer.draw()
    },
    // 清除编辑状态
    clearEdit() {
      if (this.tr) {
        this.stage.find('Transformer')[0].destroy()
        this.tr = null
      }
      if (this.editFlag) {
        this.currentEditor.draggable(false)
        this.currentEditor.off('transform')
        this.currentEditor = null
        this.editFlag = false
      }
      this.activeId = null
    },
    // 删除图层
    setDelete(shape) {
      this.$confirm('确定要删除该图层吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shape.destroy()
        this.clearEdit()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        return
      })
    },
    // 点击图层编辑
    clickLayerEdit(id) {
      this.setEdit(this.stage.find(`#${id}`)[0])
    },
    // 点击图层删除
    clickLayerDelete(id) {
      this.$confirm('确定要删除该图层吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.stage.find(`#${id}`)[0].destroy()
        this.clearEdit()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        return
      })
    },
    // 绘制矩形
    createRect() {
      const rect = new Konva.Rect({
        id: String(new Date().getTime()),
        name: '矩形',
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
        width: 100,
        height: 50,
        fill: '#fff',
        stroke: 'rgba(0,0,0,1)',
        strokeWidth: 1,
        shadowOffsetX : 0,
        shadowOffsetY : 0,
        shadowBlur : 0,
        shadowColor: 'rgba(0,0,0,0.3)'
      })
      rect.on('mouseenter', () => {
        stage.container().style.cursor = 'pointer';
      });

      rect.on('mouseleave', () => {
        stage.container().style.cursor = 'default';
      });
      this.layer.add(rect).draw()
    },
    // 强制更新图形
    updateKonva() {
      if (this.tr && this.currentEditor) {
        this.tr.forceUpdate()
        this.currentEditor.draw()
      }
    }
  },
  mounted() {
    this.initKonva()
    setTimeout(() => {
      this.createRect()
      this.createRect()
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
  .page-canvas__layer > dl > dd > button{
    margin-left: 5px;
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
  .page-canvas__property >>>.el-descriptions .canvas-property__item,
  .page-canvas__property >>>.el-color-picker,
  .page-canvas__property >>>.el-color-picker > .el-color-picker__trigger{
    width: 100%;
    height: 28px;
  }
  .canvas-property__item p {
    margin: 0;
    text-align: center;
    font-size: 12px;
  }
</style>