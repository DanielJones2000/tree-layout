import UnidirectionalTree from './unidirectional-tree'
import { Direction } from './constants'

/**
 * 四向树
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

    build(x, y) {
        this.rootX = x
        this.rootY = y

        if (this.top) {
            this.topTree = new UnidirectionalTree({
                data: this.top,
                levelSpacing: this.levelSpacing,
                siblingSpacing: this.siblingSpacing
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

        return [root, ...list.filter(item => !item.isRoot)]
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