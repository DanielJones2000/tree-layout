import BaseNode from './base-node'
import Layout from './layout'
import Link from './link'

/**
 * 单向树
 */
export default class UnidirectionalTree {
    shaps = []
    lines = []
    root = null
    rootX = 0
    rootY = 0
    direction = null

    // 层级间距
    levelSpacing = 50

    // 兄弟间距
    siblingSpacing = 20

    constructor(option) {
        this.levelSpacing = option?.levelSpacing || 50
        this.siblingSpacing = option?.siblingSpacing || 20
        this.root = this.convertObject(option.data)
        this.root.isRoot = true
    }

    getShaps() {
        return this.shaps
    }

    getLines() {
        return this.lines
    }

    build(x, y, direction) {
        this.lines = []
        this.rootX = x
        this.rootY = y
        this.direction = direction
        new Layout({
            root: this.root,
            rootX: this.rootX,
            rootY: this.rootY,
            direction: this.direction,
            levelSpacing: this.levelSpacing,
            siblingSpacing: this.siblingSpacing
        })

        this.shaps.forEach(item => {
            if (!item.parent) return
            this.lines.push(new Link(this.direction, item.parent, item))
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
                index
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