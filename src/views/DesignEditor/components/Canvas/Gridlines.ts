//@ts-nocheck
import Base from "@layerhub-io/core/dist/controllers/Base"
import { fabric } from "fabric"
export default class Gridlines extends Base {
  constructor(props: HandlerOptions) {
    super(props)
    this.initGridlines(this.canvas)
  }

  initGridlines(canvas) {

    function draw_grid(grid_size) {
      grid_size || (grid_size = 25)
      let currentCanvas = canvas.getElement()

      let grid_context = currentCanvas.getContext("2d")

      let currentCanvasWidth = canvas.getWidth()
      let currentCanvasHeight = canvas.getHeight()

      // Drawing vertical lines
      let x
      for (x = 0; x <= currentCanvasWidth; x += grid_size) {
        grid_context.moveTo(x + 0.5, 0)
        grid_context.lineTo(x + 0.5, currentCanvasHeight)
      }

      // Drawing horizontal lines
      let y
      for (y = 0; y <= currentCanvasHeight; y += grid_size) {
        grid_context.moveTo(0, y + 0.5)
        grid_context.lineTo(currentCanvasWidth, y + 0.5)
      }
      grid_context.strokeStyle = "#0000002b"
      grid_context.stroke()
    }

    canvas.on("before:render", function(ctx:any) {
      console.log("before:render 2")
      // canvas.clearContext(canvas.contextTop)
    })
    canvas.on("after:render", function(ctx:any) {
      draw_grid(25)
      console.log("after:render 2")
    })
  }
}