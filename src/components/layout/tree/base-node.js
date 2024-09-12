// 节点类
export default class Node {
    // 存放节点数据
    data = ''

    // 父节点
    parent = null
    // 孩子节点
    children = []

    // 节点所在的层级
    level = 0
    // 节点在层级的位置
    index = 0
    // 横坐标
    x = 0
    // 纵坐标
    y = 0

    // 节点宽
    width = 100
    // 节点高
    height = 50

    // 是否为根节点
    isRoot = false

    constructor(option) {
        Object.assign(this, option || {})
        this.children = []
    }

    add(node) {
        this.children.push(node)
    }

    draw(ctx) {
        ctx.save()
        ctx.fillStyle = 'lightblue'
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
        ctx.restore()
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI)
        ctx.fill()
        ctx.restore()
    }
}