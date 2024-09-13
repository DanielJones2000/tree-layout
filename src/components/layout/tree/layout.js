import { Direction } from './constants'

class Layout {
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

    // 树布局的方向
    direction = Direction.BOTTOM

    /**
     * 判断是否会水平放置
     */
    get isVertical() {
        return this.direction === Direction.TOP || this.direction === Direction.BOTTOM
    }

    auto(option) {
        this.root = null
        this.treeList = []
        Object.assign(this, option)
        this.root.x = this.rootX
        this.root.y = this.rootY
        // 自根到叶子节点遍历并重定位
        this.locationVLR(this.root)
        // 自叶子节点到根遍历并重定位
        this.locationLRD()
    }

    /**
     * 获取叶子节点的总宽
     * @param {*} children
     * @returns
     */
    getChildrenDistance(children) {
        let distance = 0
        const distanceMap = {}

        children.forEach((item, index) => {
            let nextNode = children.at(index + 1) || { width: 0, height: 0 }
            let nextNodeSize = this.isVertical ? nextNode.width : nextNode.height

            let size = this.isVertical ? item.width : item.height
            if (index === 0 || index === children.length - 1) {
                size = this.isVertical ? item.width / 2 : item.height / 2
            }

            if (index === children.length - 1) {
                distance += size
            } else {
                distance += size + this.siblingSpacing
            }

            distanceMap[index] = distance + nextNodeSize / 2
        })

        return {
            distance,
            distanceMap
        }
    }

    /**
     * 先根遍历坐标
     * @param {*} node
     * @returns
     */
    locationVLR(node) {
        if (!this.treeList[node.level]) {
            this.treeList[node.level] = []
        }
        this.treeList[node.level].push(node)
        if (!node?.children.length) {
            return
        }

        const { distance, distanceMap } = this.getChildrenDistance(node.children)
        const pos = this.isVertical ? node.x : node.y
        let startPos = pos - distance / 2

        node.children.forEach((item, index) => {
            const moveDistance = startPos + (distanceMap[index - 1] || 0)
            if (this.isVertical) {
                item.x = moveDistance
            } else {
                item.y = moveDistance
            }

            // 处理父子节点间距
            switch (this.direction) {
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

            this.locationVLR(item)
        })
    }

    /**
     * 检查是否重叠
     * @param {*} first
     * @param {*} second
     * @returns
     */
    checkOverlap(first, second) {
        let a1 = 0
        let a2 = 0
        if (this.isVertical) {
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
     * @param {*} node
     * @param {*} pos
     */
    moveTree(node, pos) {
        let diff = 0
        if (this.isVertical) {
            diff = pos - node.x
            node.x = pos
        } else {
            diff = pos - node.y
            node.y = pos
        }
        if (node?.children) {
            node.children.forEach(item => {
                let newPos = 0
                if (this.isVertical) {
                    newPos = item.x + diff
                } else {
                    newPos = item.y + diff
                }
                this.moveTree(item, newPos)
            })
        }
    }

    /**
     * 设置叶子树剧中
     * @param {*} node
     * @returns
     */
    centerTree(node) {
        if (!node) return
        let startPos = 0
        if (node.children.length <= 1) {
            return
        }
        const first = node.children.at(0)
        const last = node.children.at(-1)
        if (this.isVertical) {
            startPos = node.x - first.x - (last.x - first.x) / 2
        } else {
            startPos = node.y - first.y - (last.y - first.y) / 2
        }
        if (!startPos) return
        node.children.forEach(item => {
            let newPos = 0
            if (this.isVertical) {
                newPos = item.x + startPos
            } else {
                newPos = item.y + startPos
            }
            this.moveTree(item, newPos)
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
    locationLRD() {
        const list = [...this.treeList].reverse()

        list.forEach(layer => {
            layer.forEach((first, index) => {
                const second = layer[index + 1]
                if (!second || !this.checkOverlap(first, second)) return
                let diff = 0
                if (this.isVertical) {
                    diff = first.x + this.siblingSpacing + first.width - second.x
                } else {
                    diff = first.y + this.siblingSpacing + first.height - second.y
                }

                const moveNode = this.findCommonParentNode(first, second)
                let newPos = 0
                if (this.isVertical) {
                    newPos = moveNode.x + diff
                } else {
                    newPos = moveNode.y + diff
                }
                this.moveTree(moveNode, newPos)
                this.centerTree(moveNode.parent)
            })
        })
    }
}
export default new Layout()