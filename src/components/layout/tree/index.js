import Tree from './tree'
import BaseNode from './base-node'
import { Direction } from './constants'

export {
    BaseNode,
    Tree,
    Direction
}

let shaps = []

export function fetchShaps() {
    return shaps
}

export function convertObject(data) {
    shaps = []
    const size = [100, 60, 200, 150]
    const createNode = (item, parent, level, index) => {
        const node = new BaseNode({
            data: {
                ...item,
                children: null,
            },
            level,
            parent,
            index,
            // width: size[Math.floor(Math.random() * size.length)],
            // height: size[Math.floor(Math.random() * size.length)]
        })

        shaps.push(node)

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
