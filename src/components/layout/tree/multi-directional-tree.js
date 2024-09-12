import UnidirectionalTree from './unidirectional-tree'
import { Direction } from './constants'

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

    constructor(option) {
        Object.assign(this, option)
    }

    build(x, y) {
        this.rootX = x
        this.rootY = y

        if (this.top) {
            this.topTree = new UnidirectionalTree(this.top)
            this.topTree.build(this.rootX, this.rootY, Direction.TOP)
        }

        if (this.bottom) {
            this.bottomTree = new UnidirectionalTree(this.bottom)
            this.bottomTree.build(this.rootX, this.rootY, Direction.BOTTOM)
        }

        if (this.left) {
            this.leftTree = new UnidirectionalTree(this.left)
            this.leftTree.build(this.rootX, this.rootY, Direction.LEFT)
        }

        if (this.right) {
            this.rightTree = new UnidirectionalTree(this.right)
            this.rightTree.build(this.rootX, this.rootY, Direction.RIGHT)
        }
    }

    fetchShaps() {
        const list = []
        if (this.topTree) {
            list.push(...this.topTree.fetchShaps())
        }

        if (this.bottomTree) {
            list.push(...this.bottomTree.fetchShaps())
        }

        if (this.leftTree) {
            list.push(...this.leftTree.fetchShaps())
        }

        if (this.rightTree) {
            list.push(...this.rightTree.fetchShaps())
        }

        const root = list.find(item => item.isRoot)

        return [root, ...list.filter(item => !item.isRoot)]
    }
}