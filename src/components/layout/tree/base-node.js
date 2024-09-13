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

    // 绘制方向
    direction = null

    constructor(option) {
        Object.assign(this, option || {})
        this.width = this.width || 100
        this.height = this.height || 50
        this.children = []
    }

    add(node) {
        this.children.push(node)
    }

    draw(ctx) {
        ctx.save()
        ctx.fillStyle = 'lightblue'
        let x = this.x - this.width / 2
        let y = this.y - this.height / 2
        ctx.fillRect(x, y, this.width, this.height)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(x, y, this.width, this.height)
        ctx.restore()
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI)
        ctx.fill()
        ctx.restore()
        ctx.save()
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.font = '12px Arial';
        ctx.fillText(`(x:${this.x},y:${this.y})`, this.x, this.y + 16)
        ctx.restore()
    }
}