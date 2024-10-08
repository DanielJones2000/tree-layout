import BaseNode from './base-node'
import Layout from './layout'
import Link from './link'

/**
 * 单向缩进树
 */
export default class UnidirectionalTree {
    shaps = []
    lines = []
    data = null
    root = null
    rootX = 0
    rootY = 0
    initX = 0
    initY = 0
    direction = null

    // 层级间距
    levelSpacing = 50

    // 兄弟间距
    siblingSpacing = 20

    constructor(option) {
        this.data = option.data
        this.levelSpacing = option?.levelSpacing || 50
        this.siblingSpacing = option?.siblingSpacing || 20
    }

    getShaps() {
        return this.shaps
    }

    getLines() {
        return this.lines
    }

    build(x, y, direction) {
        this.shaps = []
        this.rootX = x
        this.rootY = y
        this.initX = x
        this.initY = y
        this.direction = direction
        this.root = this.convertObject(this.data)
        this.root.isRoot = true
        this.autoLayout()
    }

    autoLayout() {
        this.lines = []
        Layout.auto({
            root: this.root,
            rootX: this.rootX,
            rootY: this.rootY,
            direction: this.direction,
            levelSpacing: this.levelSpacing,
            siblingSpacing: this.siblingSpacing
        })

        this.shaps.forEach(item => {
            if (!item.parent) return
            let { parent } = item
            if (parent.isRoot) {
                parent = {
                    ...parent,
                    x: this.initX,
                    y: this.initY
                }
            }
            this.lines.push(new Link(this.direction, parent, item, this.levelSpacing))
        })
    }

    convertObject(data) {
        this.shaps = []
        const createNode = (item, parent, level, index) => {
            const node = new BaseNode({
                data: {
                    ...item,
                    children: null,
                },
                level,
                parent,
                index,
                direction: this.direction,
                width: item.width,
                height: item.height
            })

            this.shaps.push(node)

            if (item?.children) {
                item.children.forEach((row, i) => {
                    const child = createNode(row, node, node.level + 1, i)
                    node.add(child)
                })
            }

            return node
        }
        return createNode(data, null, 0, 0)
    }
}