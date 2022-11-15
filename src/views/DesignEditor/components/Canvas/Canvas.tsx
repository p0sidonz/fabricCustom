import React from "react"
// import { Canvas as LayerhubCanvas } from "@layerhub-io/react"
import { CustomCanvas } from "./CustomCanvas"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ContextMenu from "../ContextMenu"
import { useEditor } from "@layerhub-io/react"
import CustomEditor from "~/views/DesignEditor/components/Canvas/CustomEditor"

const Canvas = () => {
  const editor = useEditor()
  //
  const { displayPlayback } = useDesignEditorContext()
  //.

  // function renderGrid(x_size, y_size, color) {
  // var canvas = document.getElementById("layerhub_io_canvas")
  // var context = canvas?.getContext("2d")
  // if (context) {
  //   context.save()
  //   context.lineWidth = 0.5
  //   context.strokeStyle = color

  //horizontal
  // for (var i = 0; i <= canvas?.width; i = i + x_size) {
  //   context.beginPath()
  //   context.moveTo(0, i)
  //   context.lineTo(canvas?.width, i)
  //   context.closePath()
  //   context.stroke()
  // }

  //vertical
  //     for (var j = 0; j <= canvas.height; j = j + y_size) {
  //       context.beginPath()
  //       context.moveTo(j, 0)
  //       context.lineTo(j, canvas.height)
  //       context.closePath()
  //     }
  //     context.restore()
  //   }
  // }

  // renderGrid(10, 15, "gray")
//   var canvas = new fabric.Canvas("layerhub_io_canvas", { selection: false })
// 
//   var grid = 25
// 
//   // create grid
//   for (var i = 0; i < 1200 / grid; i++) {
//     canvas.add(
//       new fabric.Line([i * grid, 0, i * grid, 1200], {
//         stroke: "#ccc",
//         selectable: false,
//       })
//     )
//     canvas.add(
//       new fabric.Line([0, i * grid, 1200, i * grid], {
//         stroke: "#ccc",
//         selectable: false,
//       })
//     )
//   }

  //A possible solution that I found for question 1. It seems to work.

  //   var snapSize = 20
  //   var gridSize = 20
  //
  //   // create grid
  //
  //   for (var i = 0; i < 600 / gridSize; i++) {
  //     canvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, 600], { stroke: "#ccc", selectable: false }))
  //     canvas.add(new fabric.Line([0, i * gridSize, 600, i * gridSize], { stroke: "#ccc", selectable: false }))
  //   }
  //
  //   //A possible solution that I found for question 1. It seems to work.
  //   var objects = canvas.getObjects("line")
  //   for (let i in objects) {
  //     editor?.objects.sendToBack(objects[i])
  //   }

  // @ts-ignore
  // var currentCanvas = document.getElementById("layerhub_io_canvas")
  // var grid_context = currentCanvas.getContext("2d")
  // console.log(grid_context)
  // const c = document.querySelector("#layerhub_io_canvas")
  // console.log(c)

  //   const drawGrid = async (size = 25) => {
  //     const c = await document.querySelector("#layerhub_io_canvas")
  //     const ctx = c.getContext("2d")
  //     const width = c.width
  //     const height = c.height
  //     console.log(ctx, width, height)
  //
  //     let x, y
  //
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //     ctx.beginPath()
  //     // vertical lines
  //     for (x = 0; x <= width; x += size) {
  //       ctx.moveTo(x + 0.2, 0)
  //       ctx.lineTo(x + 0.2, height)
  //     }
  //     // horizontal lines
  //     for (y = 0; y <= height; y += size) {
  //       ctx.moveTo(0, y + 0.2)
  //       ctx.lineTo(width, y + 0.2)
  //     }
  //     ctx.strokeStyle = "#CCCCCC"
  //     ctx.stroke()
  //     return c.toDataURL()
  //   }
  //   const overlay = async () => {
  //     const editor = useEditor() //editor.scene.canvas
  //
  //     editor?.scene?.canvas.setOverlayImage(
  //       drawGrid(),
  //       () => editor?.scene?.canvas.renderAll(),
  //       { originX: 'left', originY: 'top' }
  //     )
  //   }
  //   overlay()

  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {displayPlayback && <Playback />}
      <ContextMenu />
      <CustomCanvas
        config={{
          guidelines:true,
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "TOP",
          },

          shadow: {
            blur: 4,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}

export default Canvas
