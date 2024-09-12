import BaseNode from './base-node'
import Layout from './layout'

export default class UnidirectionalTree {
    shaps = []
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

    fetchShaps() {
        return this.shaps
    }

    build(x, y, direction) {
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