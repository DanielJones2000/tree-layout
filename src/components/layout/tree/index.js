import Layout from './layout'
import BaseNode from './base-node'
import { Direction } from './constants'

export {
    BaseNode,
    Layout,
    Direction
}

export default class TreeLayout {
    shaps = []
    root = null
    rootX = 0
    rootY = 0
    direction = null

    constructor(data) {
        this.root = this.convertObject(data)
        this.root.isRoot = true
    }

    fetchShaps() {
        return this.shaps
    }

    build(x, y, direction) {
        this.rootX = x
        this.rootY = y
        this.direction = direction
        return new Layout({
            root: this.root,
            rootX: this.rootX,
            rootY: this.rootY,
            direction: this.direction
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