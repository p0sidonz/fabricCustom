import React from "react"
import { SIZE } from "baseui/button"
import { textComponents } from "~/constants/editor"
import { useStyletron } from "styletron-react"
import { useEditor, useFrame, useObjects } from "@layerhub-io/react"
import { FontItem } from "~/interfaces/common"
import { loadFonts } from "~/utils/fonts"
import { ILayer, IStaticText } from "@layerhub-io/types"
import { nanoid } from "nanoid"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { useSelector } from "react-redux"
import { selectPublicComponents } from "~/store/slices/components/selectors"
import api from "~/services/api"
import { IComponent } from "~/interfaces/DesignEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"

import {
  Stack,
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Alert,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material"

const LIST_VIEW = [
  {
    label: "Prefix",
  },
  {
    label: "Suffix",
  },
  {
    label: "Fullname",
  },
  {
    label: "Firstname",
  },
  {
    label: "Lastname",
  },
  {
    label: "Email",
  },
  {
    label: "Company",
  },
  {
    label: "Title",
  },
  {
    label: "Ticket",
  },
  {
    label: "type",
  },
  {
    label: "BadgeLabel",
  },
  {
    label: "BadgeStatus",
  },
  {
    label: "SeatNo",
  },
  {
    label: "BuyerName",
  },
  {
    label: "OrderId",
  },
  {
    label: "TicketId",
  },
  {
    label: "Scan",
  },
  {
    label: "Id",
  },
  {
    label: "WorkAddress1",
  },
  {
    label: "WorkAddress2",
  },
  {
    label: "WorkCity",
  },
  {
    label: "WorkStateLongName",
  },
  {
    label: "WorkState",
  },
  {
    label: "ShortName",
  },
  {
    label: "WorkCountryLongName",
  },
  {
    label: "WorkCountryShortName",
  },
  {
    label: "WorkZipCode",
  },
  {
    label: "Work",
  },
  {
    label: "Phone",
  },
  {
    label: "Age",
  },
  {
    label: "Blogger",
  },
  {
    label: "BlogURL",
  },
  {
    label: "BusinessStructure",
  },
  {
    label: "CompanyWebsiteURL",
  },
  {
    label: "DOB",
  },
  {
    label: "DunsNumber",
  },
  {
    label: "EstablishedDate",
  },
  {
    label: "FaceBookId",
  },
  {
    label: "Gender",
  },
  {
    label: "LinkedInId",
  },
  {
    label: "Mobile",
  },
  {
    label: "Primary",
  },
  {
    label: "Business",
  },
  {
    label: "Category",
  },
  {
    label: "Revenue",
  },
  {
    label: "SecondaryBusinessCategory",
  },
  {
    label: "TaxId",
  },
  {
    label: "TwitterId",
  },
  {
    label: "Home",
  },
  {
    label: "Address1",
  },
  {
    label: "HomeAddress2",
  },
  {
    label: "HomeCity",
  },
  {
    label: "HomeStateLongName",
  },
  {
    label: "HomeStateShortName",
  },
  {
    label: "HomeCountryLongName",
  },
  {
    label: "HomeCountryShortName",
  },
  {
    label: "HomeZipCode",
  },
  {
    label: "HomePhone",
  },
  {
    label: "BillingAddress1",
  },
  {
    label: "BillingAddress2",
  },
  {
    label: "BillingCity",
  },
  {
    label: "BillingStateLongName",
  },
  {
    label: "BillingStateShortName",
  },
  {
    label: "BillingCountryLongName",
  },
  {
    label: "BillingCountryShortName",
  },
  {
    label: "BillingZipCode",
  },
  {
    label: "EventName",
  },
  {
    label: "EventLocation",
  },
  {
    label: "StartDate",
  },
  {
    label: "EndDate",
  },
  {
    label: "Commodities",
  },
]

const textOptions = {
  id: nanoid(),
  type: "StaticText",
  width: 420,
  text: "Add some text",
  fontSize: 92,
  fontFamily: "OpenSans-Regular",
  textAlign: "center",
  fontStyle: "normal",
  fontURL:
    "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
  fill: "#ffffff",
  metadata: {},
}

export default function () {
  const { setDisplayPreview, setScenes, setCurrentDesign, currentDesign, scenes } = useDesignEditorContext()

  const frame = useFrame()
  const obb = useObjects()

  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const components = useSelector(selectPublicComponents)

  // @ts-ignore
  window.editor=editor;
  const handleChange = async (e) => {
    const { label } = e.target.value
    if (editor) {
      const font: FontItem = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 420,
        text: label,
        fontSize: 60,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: {},
      }
      editor.objects.add(options)
    }
  }
  const addFullName = async () => {
    if (editor) {
      const font: FontItem = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 420,
        text: "Ankit Singh",
        fontSize: 30,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: {},
      }
      editor.objects.add(options)
    }
  }
  const addObject = async () => {
    if (editor) {
      const font: FontItem = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 420,
        text: "Add some text",
        fontSize: 92,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: {},
      }
      editor.objects.add(options)
    }
  }

  const addQrCode = () => {
    if (editor) {
      const options = {
        type: "StaticImage",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png",
      }
      editor.objects.add(options)
    }
  }

  const showGrid = () => {
    if (editor) {
      // A possible solution that I found for question 1. It seems to work.
      // const XX = currentDesign
      // console.log(currentDesign)
      //
      //       const filtedDAta = scenes[0].layers.filter((obj) => console.log(obj))
      //
      //       for (let i in filtedDAta) {
      //         editor.objects.bringToFront(obb[i])
      //       }
    }
  }

  const addGrid = () => {
    if (editor) {
      var grid = 10
      // create grid
      // TODO: after everything else we'll be able to do this.
      //   editor.objects.add({type:'GridObjet',gridsize:20})

      for (var i = 0; i < 500 / grid; i++) {
        editor.objects.add(
          new fabric.Line([i * grid, 0, i * grid, 500], {
            stroke: "#ccc",
            selectable: false,
          })
        )
        editor.objects.add(
          new fabric.Line([0, i * grid, 500, i * grid], {
            stroke: "#ccc",
            selectable: false,
          })
        )
      }
    }

    //     var grid = 500
    //     console.log( editor?.objects)
    //     // create grid
    //     for (var i = 0; i < 1200 / grid; i++) {
    //       editor?.objects.add(
    //         new fabric.Line([i * grid, 0, i * grid, 1200], {
    //           stroke: "#ccc",
    //           selectable: false,
    //         })
    //       )
    //       editor?.objects?.add(
    //         new fabric.Line([0, i * grid, 1200, i * grid], {
    //           stroke: "#ccc",
    //           selectable: false,
    //         })
    //       )
    //     }
    //

    if (editor) {
      // var gridsize = 10,
      //   cellWidth = 30
      // for (var x = 1; x < 100 / gridsize; x++) {
      //   editor.objects.add(
      //     new fabric.Line([cellWidth * x, 0, cellWidth * x, 600], {
      //       stroke: "#000000",
      //       strokeWidth: 1,
      //       selectable: false,
      //     })
      //   )
      //   editor.objects.add(
      //     new fabric.Line([0, cellWidth * x, 600, cellWidth * x], {
      //       stroke: "#000000",
      //       strokeWidth: 1,
      //       selectable: false,
      //     })
      //   )
      // const gridSize= 100
      // for (var i = 0; i < 600 / gridSize; i++) {
      //   editor.objects.add(new fabric.Line([i * gridSize, 0, i * gridSize, 600], { stroke: "#ccc", selectable: false }))
      //   editor.objects.add(new fabric.Line([0, i * gridSize, 600, i * gridSize], { stroke: "#ccc", selectable: false }))
      // }

      var grid = 20
      // create grid
      for (var i = 0; i < 1200 / grid; i++) {
        editor?.editor?.objects?.add(
          new fabric.Line([i * grid, 0, i * grid, 1200], {
            stroke: "#ccc",
            selectable: false,
          })
        )
        editor?.editor?.objects?.add(
          new fabric.Line([0, i * grid, 1200, i * grid], {
            stroke: "#ccc",
            selectable: false,
          })
        )
      }
    }
  }

  const addComponent = async (component: any) => {
    if (editor) {
      const fontItemsList: FontItem[] = []
      if (component.objects) {
        component.objects.forEach((object: any) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fontItemsList.push({
              name: object.fontFamily,
              url: object.fontURL,
            })
          }
        })
        const filteredFonts = fontItemsList.filter((f) => !!f.url)
        await loadFonts(filteredFonts)
      } else {
        if (component.type === "StaticText" || component.type === "DynamicText") {
          fontItemsList.push({
            name: component.fontFamily,
            url: component.fontURL,
          })
          await loadFonts(fontItemsList)
        }
      }
      editor.objects.add(component)
    }
  }

  const makeAddComponent = async (id: string) => {
    if (editor) {
      const component = await api.getComponentById(id)
      const fontItemsList: FontItem[] = []
      const object: any = component.layers[0] as ILayer
      if (object.type === "Group") {
        object.objects.forEach((object: any) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fontItemsList.push({
              name: object.fontFamily,
              url: object.fontURL,
            })
          }
        })
        const filteredFonts = fontItemsList.filter((f) => !!f.url)
        await loadFonts(filteredFonts)
      } else {
        if (object.type === "StaticText") {
          fontItemsList.push({
            name: object.fontFamily,
            url: object.fontURL,
          })
          await loadFonts(fontItemsList)
        }
      }

      editor.objects.add(object)
    }
  }

  const loadComponentFonts = async (component: any) => {
    if (editor) {
      const fontItemsList: FontItem[] = []
      if (component.objects) {
        component.objects.forEach((object: any) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fontItemsList.push({
              name: object.fontFamily,
              url: object.fontURL,
            })
          }
        })
        const filteredFonts = fontItemsList.filter((f) => !!f.url)
        await loadFonts(filteredFonts)
      } else {
        if (component.type === "StaticText" || component.type === "DynamicText") {
          fontItemsList.push({
            name: component.fontFamily,
            url: component.fontURL,
          })
          await loadFonts(fontItemsList)
        }
      }
    }
  }

  const onDragStart = React.useCallback(async (ev: React.DragEvent<HTMLDivElement>, item: any) => {
    let img = new Image()
    img.src = item.preview
    ev.dataTransfer.setDragImage(img, img.width / 2, img.height / 2)
    // editor.dragger.onDragStart(item)
  }, [])

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Text</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>
          <Stack spacing={2}>
            <Button variant="outlined" onClick={addObject}>
              Add text
            </Button>

            <Button variant="outlined" onClick={addFullName}>
              Add Full Name
            </Button>

            <Button variant="outlined" onClick={addQrCode}>
              Add Qr Code
            </Button>

            <Button variant="outlined" onClick={addGrid}>
              Add Grid
            </Button>

            <Button variant="outlined" onClick={showGrid}>
              Show Grid
            </Button>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Predefind fields</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                label="Predefind fields"
                onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                {LIST_VIEW.map((item, index) => {
                  return <MenuItem value={item}>{item.label}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Stack>

          <Block
            $style={{
              paddingTop: "0.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8px",
            }}
          >
            {components?.map((component) => (
              <TextComponentItem
                onDragStart={(ev: React.DragEvent<HTMLDivElement>) => onDragStart(ev, component)}
                onClick={makeAddComponent}
                key={component.id}
                component={component}
              />
            ))}
          </Block>
        </Block>
      </Scrollable>
    </Block>
  )
}

function TextComponentItem({
  component,
  onClick,
  onDragStart,
}: {
  component: IComponent
  onDragStart: (ev: React.DragEvent<HTMLDivElement>) => void
  onClick: (option: any) => void
}) {
  const [css] = useStyletron()
  return (
    <div
      onClick={() => onClick(component.id)}
      onDragStart={onDragStart}
      className={css({
        position: "relative",
        height: "84px",
        background: "#f8f8fb",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
        userSelect: "all",
      })}
    >
      <img
        src={component.preview.src}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}
