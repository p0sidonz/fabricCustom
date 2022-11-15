import { Editor } from "@layerhub-io/core"
import Gridlines from "./Gridlines"

export default class CustomEditor extends Editor{
  protected gridlines:Gridlines;
  constructor(props:any) {
    super(props);
    this.initializeCustomControllers();
  }


  initializeCustomControllers = () => {
    console.log('Initializing controllers3',this)
    // super.initializeControllers()
    const options = {
      canvas: this.canvas.canvas,
      editor: this,
      config: this.config,
      state: this.state,
    }

    this.gridlines = new Gridlines(options)
  }
}