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

    direction = null

    get isVertical() {
        return this.direction === Direction.TOP || this.direction === Direction.BOTTOM
    }

    constructor(direction, startNode, endNode) {
        const { x: x1, y: y1 } = startNode
        const { x: x2, y: y2 } = endNode
        this.direction = direction
        this.x1 = x1
        this.y1 = y1

        this.x4 = x2
        this.y4 = y2

        if (this.isVertical) {
            this.x2 = x1
            this.y2 = (y1 + y2) / 2

            this.x3 = x2
            this.y3 = (y1 + y2) / 2
        } else {
            this.x2 = (x1 + x2) / 2
            this.y2 = y1

            this.x3 = (x1 + x2) / 2
            this.y3 = y2
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