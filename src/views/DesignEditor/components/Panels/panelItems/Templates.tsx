import React from "react"
import { useEditor } from "@layerhub-io/react"
import { useDispatch } from "react-redux"
import { useModal } from "~/hooks/useModal"
import CustomModal from "../../custom-ui/CustomModal"

import { Block } from "baseui/block"
import { loadFonts, loadTemplateFonts } from "~/utils/fonts"
import Scrollable from "~/components/Scrollable"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import { useStyletron } from "baseui"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { loadVideoEditorAssets } from "~/utils/video"
import { IScene } from "@layerhub-io/types"
import { selectPublicDesigns } from "~/store/slices/designs/selectors"
import { addToExistingDesign, setCurrentDesign2 } from "~/store/slices/designs/actions"

import { useSelector } from "react-redux"
import { IDesign } from "~/interfaces/DesignEditor"
import { nanoid } from "nanoid"
import api from "~/services/api"
import useEditorType from "~/hooks/useEditorType"
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Alert,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material"

const Templates = () => {
  const editor = useEditor()
  const dispatch = useDispatch()

  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { setCurrentScene, currentScene, setScenes, setCurrentDesign } = useDesignEditorContext()
  const designs = useSelector((state) => state.designs.designs)
  const existing = useSelector((state) => state.designs.existing)
  const editorType = useEditorType()
  const [editModal, setEditModal, toggleEditModal] = useModal()
  const [editItem, setEditItem] = React.useState({})

  const loadTemplate = React.useCallback(
    async (template: any) => {
      if (editor) {
        const fonts: any[] = []
        template.layers.forEach((object: any) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fonts.push({
              name: object.fontFamily,
              url: object.fontURL,
              options: { style: "normal", weight: 400 },
            })
          }
        })
        const filteredFonts = fonts.filter((f) => !!f.url)
        if (filteredFonts.length > 0) {
          await loadFonts(filteredFonts)
        }

        setCurrentScene({ ...template, id: currentScene?.id })
      }
    },
    [editor, currentScene]
  )

  const loadGraphicTemplate = async (payload: IDesign): Promise<{ scenes: IScene[]; design: IDesign }> => {
    const scenes: IScene[] = []
    const { scenes: scns, ...design } = payload

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id || nanoid(),
        layers: scn.layers,
        metadata: {},
      }
      await loadTemplateFonts(scene)

      const preview = (await editor.renderer.render(scene)) as string
      scenes.push({ ...scene, preview })
    }

    return { scenes, design: design as IDesign }
  }

  const loadDesignById = React.useCallback(
    async (designId: string) => {
      if (editor) {
        const design = await api.getPublicDesignById(designId)
        console.log(design)
        const loadedDesign = await loadGraphicTemplate(design)
        setScenes(loadedDesign.scenes)
        setCurrentScene(loadedDesign.scenes[0])
        setCurrentDesign(loadedDesign.design)
      }
    },
    [editor, currentScene]
  )

  const loadExistingDesignById = React.useCallback(
    async (designId: any) => {
      if (editor) {
        const loadedDesign = await loadGraphicTemplate(designId.FULL)
        setScenes(loadedDesign.scenes)
        setCurrentScene(loadedDesign.scenes[0])
        setCurrentDesign(loadedDesign.design)
      }
      dispatch(setCurrentDesign2(designId))
    },
    [editor, currentScene]
  )

  const createDuplicate = (design: any) => {
    dispatch(addToExistingDesign([...existing, { label: `${design.id} 2`, id: nanoid(), FULL: design.FULL[0] }]))
  }

  const handleEditField = (e) => {
    setEditItem({ ...editItem, label: e.target.value })
  }

  const renameExistingTemplate = () => {
    console.log("rename")
    console.log(editItem.id)
    let LOCAL = existing.map((item) => {
      if (item.id === editItem.id) {
        return { ...item, label: editItem?.label }
      }
      return item
    })
    dispatch(addToExistingDesign([...LOCAL]))
    toggleEditModal()
  }

  const deleteExistingTemplate = (id: string) => {
    if (confirm("You sure you want to delete?")) {
      const arr2 = existing.filter((item) => item.id !== id)
      dispatch(addToExistingDesign([...arr2]))
    }
  }
  const DuplicateTemplate = (design) => {
    console.log(design)
    const C_index = existing.findIndex((item) => item.id == design.id)
    console.log(C_index)
    dispatch(
      addToExistingDesign([
        ...existing,
        { label: `${design.label} DUPLICATE 2`, id: nanoid(), FULL: existing[C_index]["FULL"] },
      ])
    )
  }

  const setEmptyCanvas = async () => {
    var grid60 = 116.6 //divide 700 by 6 in order to get 60'x60' grid
    var grid50 = 140 //divide 700 by 5 in order to get a 50'x50 grid
    var grid40 = 175 //divide 700 by 4 in order to get a 40'x40 grid

    // create grid
    //horizontal lines

    const emptyCanvas = {
      id: "dsg_XAerMoWOkY",
      type: "GRAPHIC",
      name: "Untitled project",
      frame: { width: 500, height: 500 },
      scenes: [],
      metadata: {},
      preview: "",
    }
    if (confirm("You sure you want to create a new blank design?")) {
      const loadedDesign = await loadGraphicTemplate(emptyCanvas)
      setScenes(loadedDesign.scenes)
      // setCurrentScene(loadedDesign.scenes[0])
      setCurrentDesign(loadedDesign.design)
    }

    // for (var i = 0; i < 700 / grid40; i++) {
    //   editor.objects.add(
    //     new fabric.Line([i * grid40, 0, i * grid40, 700], {
    //       stroke: "#ccc",
    //       selectable: false,
    //     })
    //   )
    //   //vertical lines
    //   editor.objects.add(
    //     new fabric.Line([0, i * grid40, 700, i * grid40], {
    //       stroke: "#ccc",
    //       selectable: false,
    //     })
    //   )
    // }

    console.log(emptyCanvas)
  }

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
        <Block>Templates</Block>

        <Block onClick={() => setEmptyCanvas()} $style={{ cursor: "pointer", display: "flex" }}>
          <Button variant="outlined" color="success" size="small">
            Create Blank
          </Button>
        </Block>
        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={16} />
        </Block>
      </Block>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr" }}>
            {designs
              .filter((d) => d.type === editorType)
              .map((design, index) => {
                return (
                  <div key={index}>
                    <ImageItem
                      onClick={() => loadDesignById(design.id)}
                      key={index}
                      preview={`${design.previews[0].src}?tr=w-320`}
                    />
                    <div
                      onClick={() => createDuplicate(design)}
                      style={{
                        padding: 1,
                        fontSize: 13,
                        cursor: "pointer",
                        textShadow: "10px",
                        textDecoration: "underline",
                      }}
                    >
                      Duplicate
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </Scrollable>
      <Block
        $style={{
          display: "row",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Custom Badges</Block>
      </Block>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {existing.length ? (
              <>
                {" "}
                {existing.map((item, index) => {
                  return (
                    <ListItem key={index} component="div" disablePadding>
                      <ListItemButton>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                onClick={() => loadExistingDesignById(item)}
                                color="black"
                                sx={{ mr: 2 }}
                                variant="button"
                              >
                                {item.label}
                              </Typography>
                            </>
                          }
                          secondary={
                            <>
                              <Typography
                                onClick={() => DuplicateTemplate(item)}
                                color="primary"
                                sx={{ mr: 2 }}
                                variant="overline"
                              >
                                Duplicate
                              </Typography>
                              <Typography
                                sx={{ mr: 2 }}
                                variant="overline"
                                onClick={() => {
                                  setEditItem(item)
                                  toggleEditModal()
                                }}
                              >
                                Rename
                              </Typography>

                              <Typography
                                onClick={() => {
                                  deleteExistingTemplate(item.id)
                                }}
                                color="error"
                                sx={{ mr: 2 }}
                                variant="overline"
                              >
                                Delete
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}{" "}
              </>
            ) : (
              <>
                <Alert severity="info">You don't have any custom badges.</Alert>
              </>
            )}
          </div>
        </div>
      </Scrollable>

      <CustomModal
        handleClose={() => setEditModal(false)}
        isActive={editModal}
        title="Rename"
        closeText="Cancel"
        saveText="Save"
        handleSave={renameExistingTemplate}
      >
        <TextField value={editItem.label} onChange={handleEditField} />
      </CustomModal>
    </Block>
  )
}

function ImageItem({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      ></div>
      <img
        src={preview}
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

export default Templates
