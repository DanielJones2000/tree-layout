<template>
  <div class="layout">
    <div class="left">
      <button @click="layout">布局</button>
      <canvas class="tree" ref="cav" width="982" height="782"> </canvas>
    </div>
    <div class="right">
      <textarea v-model="text" class="text"></textarea>
    </div>
  </div>
</template>
<script>
import TestData from '../test-data'
import TreeLayout, { Direction } from './layout/tree'

export default {
  data() {
    return {
      ctx: null,
      treeLayout: null,
      text: JSON.stringify(TestData, null, 2),
      centerX: 400,
      centerY: 500,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ctx = this.$refs.cav.getContext('2d')
      setInterval(() => {
        this.repaint()
      }, 20)
    })
  },
  methods: {
    layout() {
      this.treeLayout = new TreeLayout(JSON.parse(this.text))
      this.treeLayout.build(this.centerX, this.centerY, Direction.BOTTOM)
    },
    drawLine(startNode, endNode) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.moveTo(startNode.x, startNode.y)
      this.ctx.lineTo(startNode.x, (startNode.y + endNode.y) / 2)
      this.ctx.lineTo(endNode.x, (startNode.y + endNode.y) / 2)
      this.ctx.lineTo(endNode.x, endNode.y)
      this.ctx.stroke()
      this.ctx.restore()
    },
    repaint() {
      this.ctx.clearRect(0, 0, 10000, 10000)
      if (this.treeLayout) {
        this.treeLayout.fetchShaps().forEach((item) => {
          item.draw(this.ctx)
          if (item.parent) {
            this.drawLine(item.parent, item)
          }
        })
      }
    },
  },
}
</script>
<style>
.layout {
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.left {
  flex: 1;
  height: 100%;
}

.right {
  flex: 1;
  height: 100%;
  padding: 8px;
}

.text {
  width: 100%;
  height: 100%;
}

.tree {
  width: 982px;
  height: 782px;
  margin-top: 8px;
  border: 1px solid #000;
}
</style>