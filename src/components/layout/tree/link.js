import { Direction } from './constants'
export default class Link {
    x1 = 0
    y1 = 0

    x2 = 0
    y2 = 0

    x3 = 0
    y3 = 0

    x4 = 0
    y4 = 0

    levelSpacing = 0

    direction = null

    get isVertical() {
        return this.direction === Direction.TOP || this.direction === Direction.BOTTOM
    }

    constructor(direction, startNode, endNode, levelSpacing) {
        const { x: x1, y: y1 } = startNode
        const { x: x2, y: y2 } = endNode
        this.direction = direction
        this.levelSpacing = levelSpacing
        this.x1 = x1
        this.y1 = y1

        this.x4 = x2
        this.y4 = y2

        if (this.isVertical) {
            this.x2 = x1
            this.y2 = (y1 + y2) / 2

            this.x3 = x2
            this.y3 = (y1 + y2) / 2
            if (startNode.isRoot) {
                this.y2 = y2 + endNode.height / 2 + this.levelSpacing / 2
                this.y3 = y2 + endNode.height / 2 + this.levelSpacing / 2
                if (direction === Direction.BOTTOM) {
                    this.y2 = y2 - endNode.height / 2 - this.levelSpacing / 2
                    this.y3 = y2 - endNode.height / 2 - this.levelSpacing / 2
                }
            }
        } else {
            this.x2 = (x1 + x2) / 2
            this.y2 = y1

            this.x3 = (x1 + x2) / 2
            this.y3 = y2
            if (startNode.isRoot) {
                this.x2 = x2 + endNode.width / 2 + this.levelSpacing / 2
                this.x3 = x2 + endNode.width / 2 + this.levelSpacing / 2

                if (direction === Direction.RIGHT) {
                    this.x2 = x2 - endNode.width / 2 - this.levelSpacing / 2
                    this.x3 = x2 - endNode.width / 2 - this.levelSpacing / 2
                }
            }
        }
    }

    draw(ctx) {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.lineTo(this.x3, this.y3)
        ctx.lineTo(this.x4, this.y4)
        ctx.stroke()
        ctx.restore()
    }
}