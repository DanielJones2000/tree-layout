import UnidirectionalTree from './unidirectional-tree'
import { Direction } from './constants'
import BaseNode from './base-node'

/**
 * 四向缩进树
 */
export default class MultiDirectionalTree {
    topTree = null
    bottomTree = null
    leftTree = null
    rightTree = null

    rootX = 0
    rootY = 0

    top = null
    bottom = null
    left = null
    right = null

    // 层级间距
    levelSpacing = 50

    // 兄弟间距
    siblingSpacing = 20

    constructor(option) {
        Object.assign(this, option)
    }

    /**
     * 获取每个区块的外接矩形坐标
     * @param {*} list
     * @returns
     */
    getRectangleSize(list) {
        let x1 = 0
        let y1 = 0
        let x2 = 0
        let y2 = 0

        list.filter(item => !item.isRoot).forEach(item => {
            if (!x1) x1 = item.x - item.width / 2
            if (!y1) y1 = item.y - item.height / 2
            x1 = Math.min(item.x - item.width / 2 - this.levelSpacing, x1)
            y1 = Math.min(item.y - item.height / 2 - this.levelSpacing, y1)
            x2 = Math.max(item.x + item.width / 2 + this.levelSpacing, x2)
            y2 = Math.max(item.y + item.height / 2 + this.levelSpacing, y2)
        })

        return {
            x1,
            y1,
            x2,
            y2
        }
    }

    build(x, y) {
        this.rootX = x
        this.rootY = y

        if (this.top) {
            this.topTree = new UnidirectionalTree({
                data: this.top,
                levelSpacing: this.levelSpacing,
                siblingSpacing: this.siblingSpacing,

            })
            this.topTree.build(this.rootX, this.rootY, Direction.TOP)
        }

        if (this.bottom) {
            this.bottomTree = new UnidirectionalTree({
                data: this.bottom,
                levelSpacing: this.levelSpacing,
                siblingSpacing: this.siblingSpacing
            })
            this.bottomTree.build(this.rootX, this.rootY, Direction.BOTTOM)
        }

        if (this.left) {
            this.leftTree = new UnidirectionalTree({
                data: this.left,
                levelSpacing: this.levelSpacing,
                siblingSpacing: this.siblingSpacing
            })
            this.leftTree.build(this.rootX, this.rootY, Direction.LEFT)
        }

        if (this.right) {
            this.rightTree = new UnidirectionalTree({
                data: this.right,
                levelSpacing: this.levelSpacing,
                siblingSpacing: this.siblingSpacing
            })
            this.rightTree.build(this.rootX, this.rootY, Direction.RIGHT)
        }

        const topRectangle = this.getRectangleSize(this.topTree?.getShaps?.() || [])
        const bottomRectangle = this.getRectangleSize(this.bottomTree?.getShaps?.() || [])
        const leftRectangle = this.getRectangleSize(this.leftTree?.getShaps?.() || [])
        const rightRectangle = this.getRectangleSize(this.rightTree?.getShaps?.() || [])

        if (this.topTree
            && leftRectangle.y1 <= topRectangle.y2
            && rightRectangle.y1 <= topRectangle.y2
            && (leftRectangle.x2 <= topRectangle.x1 || rightRectangle.x1 <= topRectangle.x2)) {
            let minY = this.rootY
            if (this.leftTree) {
                minY = leftRectangle.y1
            }

            if (this.rightTree) {
                minY = rightRectangle.y1
            }

            if (this.leftTree && this.rightTree) {
                minY = Math.min(leftRectangle.y1, rightRectangle.y1)
            }
            this.topTree.rootY = minY + this.levelSpacing
            this.topTree.autoLayout()
        }

        if (this.bottomTree
            && leftRectangle.y2 >= bottomRectangle.y1
            && rightRectangle.y2 >= bottomRectangle.y1
            && (leftRectangle.x2 <= bottomRectangle.x1 || rightRectangle.x1 <= bottomRectangle.x2)) {
            let maxY = this.rootY

            if (this.leftTree) {
                maxY = leftRectangle.y2
            }

            if (this.rightTree) {
                maxY = rightRectangle.y2
            }

            if (this.leftTree && this.rightTree) {
                maxY = Math.max(leftRectangle.y2, rightRectangle.y2)
            }
            this.bottomTree.rootY = maxY - this.levelSpacing
            this.bottomTree.autoLayout()
        }
    }

    getShaps() {
        const list = []
        if (this.topTree) {
            list.push(...this.topTree.getShaps())
        }

        if (this.bottomTree) {
            list.push(...this.bottomTree.getShaps())
        }

        if (this.leftTree) {
            list.push(...this.leftTree.getShaps())
        }

        if (this.rightTree) {
            list.push(...this.rightTree.getShaps())
        }

        const root = list.find(item => item.isRoot)
        const rootNode = new BaseNode({
            data: root.data,
            level: 0,
            parent: null,
            index: 0,
            width: root.width,
            height: root.height,
            rootX: this.rootX,
            rootY: this.rootY,
            x: this.rootX,
            y: this.rootY,
        })

        return [rootNode, ...list.filter(item => !item.isRoot)]
    }

    getLines() {
        const list = []
        if (this.topTree) {
            list.push(...this.topTree.getLines())
        }

        if (this.bottomTree) {
            list.push(...this.bottomTree.getLines())
        }

        if (this.leftTree) {
            list.push(...this.leftTree.getLines())
        }

        if (this.rightTree) {
            list.push(...this.rightTree.getLines())
        }
        return list
    }
}