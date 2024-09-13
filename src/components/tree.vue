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
import TreeLayout from './layout/tree'

export default {
  data() {
    return {
      ctx: null,
      tree: null,
      text: JSON.stringify(TestData, null, 2),
      centerX: 460,
      centerY: 400,
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
      this.tree = new TreeLayout({
        levelSpacing: 80,
        top: JSON.parse(this.text),
        bottom: JSON.parse(this.text),
        // left: JSON.parse(this.text),
        // right: JSON.parse(this.text),
      })
      this.tree.build(this.centerX, this.centerY)
    },
    repaint() {
      this.ctx.clearRect(0, 0, 10000, 10000)
      if (this.tree) {
        this.tree.getLines().forEach((item) => {
          item.draw(this.ctx)
        })

        this.tree.getShaps().forEach((item) => {
          item.draw(this.ctx)
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