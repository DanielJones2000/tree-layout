import { Direction } from './constants'

class Tree {
    // 根节点
    root = null

    // 根节点x坐标
    rootX = 0
    // 根节点y坐标
    rootY = 0

    // 层级间距
    levelSpacing = 50

    // 兄弟间距
    siblingSpacing = 20

    // 图元列表
    treeList = []

    constructor(option) {
        Object.assign(this, option)
    }

    layout(direction) {
        this.root.x = this.rootX
        this.root.y = this.rootY
        this.treeList = []
        // 自根到叶子节点遍历并重定位
        this.locationVLR(this.root, direction)
        // 自叶子节点到根遍历并重定位
        this.locationLRD(direction)
    }

    isVertical(direction) {
        return direction === Direction.TOP || direction === Direction.BOTTOM
    }

    getChildrenDistance(direction, children) {
        let distance = 0
        const distanceMap = {}
        const isVertical = this.isVertical(direction)

        children.forEach((item, index) => {
            if (index === children.length - 1) return
            if (isVertical) {
                distance += item.width + this.siblingSpacing
                distanceMap[index] = distance
                return
            }
            distance += item.height + this.siblingSpacing
            distanceMap[index] = distance
        })

        return {
            distance,
            distanceMap
        }
    }

    /**
     * 先根遍历坐标
     */
    locationVLR(node, direction) {
        if (!this.treeList[node.level]) {
            this.treeList[node.level] = []
        }
        this.treeList[node.level].push(node)
        if (!node?.children.length) {
            return
        }

        const isVertical = this.isVertical(direction)
        const { distance, distanceMap } = this.getChildrenDistance(direction, node.children)

        const pos = isVertical ? node.x : node.y
        let startPos = pos - distance / 2

        node.children.forEach((item, index) => {
            const moveDistance = startPos + (distanceMap[index - 1] || 0)
            if (isVertical) {
                item.x = moveDistance
            } else {
                item.y = moveDistance
            }

            // 处理父子节点间距
            switch (direction) {
                case Direction.TOP:
                    item.y = node.y - item.height - this.levelSpacing
                    break
                case Direction.BOTTOM:
                    item.y = node.y + node.height + this.levelSpacing
                    break
                case Direction.LEFT:
                    item.x = node.x - item.width - this.levelSpacing
                    break
                default:
                    item.x = node.x + node.width + this.levelSpacing
            }

            this.locationVLR(item, direction)
        })
    }

    /**
     * 检查是否重叠
     * @param {*} direction
     * @param {*} first
     * @param {*} second
     * @returns
     */
    checkOverlap(direction, first, second) {
        let a1 = 0
        let a2 = 0
        if (this.isVertical(direction)) {
            a1 = first.x + first.width
            a2 = second.x
        } else {
            a1 = first.y + first.height
            a2 = second.y
        }
        return a2 < a1
    }

    /**
     * 移动当前节点所组成的子树
     * @param {*} direction
     * @param {*} node
     * @param {*} pos
     */
    moveTree(direction, node, pos) {
        const isVertical = this.isVertical(direction)
        let diff = 0
        if (isVertical) {
            diff = pos - node.x
            node.x = pos
        } else {
            diff = pos - node.y
            node.y = pos
        }
        if (node?.children) {
            node.children.forEach(item => {
                let newPos = 0
                if (isVertical) {
                    newPos = item.x + diff
                } else {
                    newPos = item.y + diff
                }
                this.moveTree(direction, item, newPos)
            })
        }
    }

    centerTree(direction, node) {
        if (!node) return
        const isVertical = this.isVertical(direction)
        let startPos = 0
        if (node.children.length <= 1) {
            return
        }
        const first = node.children.at(0)
        const last = node.children.at(-1)
        if (isVertical) {
            startPos = node.x - first.x - (last.x - first.x) / 2
        } else {
            startPos = node.y - first.y - (last.y - first.y) / 2
        }
        if (!startPos) return
        node.children.forEach(item => {
            let newPos = 0
            if (isVertical) {
                newPos = item.x + startPos
            } else {
                newPos = item.y + startPos
            }
            this.moveTree(direction, item, newPos)
        })
    }

    findCommonParentNode(node1, node2) {
        if (node1.parent === node2.parent) {
            return node2
        } else {
            return this.findCommonParentNode(node1.parent, node2.parent);
        }
    }

    /**
     * 后根遍历
     */
    locationLRD(direction) {
        const isVertical = this.isVertical(direction)
        const list = [...this.treeList].reverse()

        list.forEach(layer => {
            layer.forEach((first, index) => {
                const second = layer[index + 1]
                if (!second || !this.checkOverlap(direction, first, second)) return
                let diff = 0
                if (isVertical) {
                    diff = first.x + this.siblingSpacing + first.width - second.x
                } else {
                    diff = first.y + this.siblingSpacing + first.height - second.y
                }

                const moveNode = this.findCommonParentNode(first, second)
                let newPos = 0
                if (isVertical) {
                    newPos = moveNode.x + diff
                } else {
                    newPos = moveNode.y + diff
                }
                this.moveTree(direction, moveNode, newPos)
                this.centerTree(direction, moveNode.parent)
            })
        })
    }
}
export default Tree