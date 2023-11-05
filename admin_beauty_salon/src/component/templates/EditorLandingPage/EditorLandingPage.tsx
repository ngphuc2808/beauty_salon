import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import he from 'he'

import basicBlockPlugin from 'grapesjs-blocks-basic'
import formPlugin from 'grapesjs-plugin-forms'
import editorPlugin from 'grapesjs-plugin-ckeditor'
import flexBoxPlugin from 'grapesjs-blocks-flexbox'
import timerPlugin from 'grapesjs-component-countdown'
import customCodePlugin from 'grapesjs-custom-code'
import navbarPlugin from 'grapesjs-navbar'
import tooltipsPlugin from 'grapesjs-tooltip'
import imagePlugin from 'grapesjs-tui-image-editor'
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from '@grapesjs/react'
import grapesjs from 'grapesjs'
import type { Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'

import CustomModal from '@/component/molecules/CustomModal'
import CustomAssetManager from '@/component/molecules/CustomAssetManager'
import Topbar from '@/component/molecules/Topbar'
import RightSidebar from '@/component/molecules/RightSidebar'

import { useGetAllImages, useGetCategory } from '@/hooks/hooks'
import { useGlobalContext } from '@/contexts/globalContext'

const LandingPageEditor = () => {
  const { id } = useParams()

  const isUpdate = Boolean(id)

  const { projectData } = useGlobalContext()

  const getCategoryApi = useGetCategory(id!, {
    enabled: isUpdate,
  })

  const getAllImagesApi = useGetAllImages('ImagesLandingPage', {
    onSuccess(data) {
      setArrayImage(data.message.urls)
    },
  })

  const [editor, setEditor] = useState<Editor>()

  const [arrayImage, setArrayImage] = useState<string[]>(
    getAllImagesApi.data?.message.urls || [],
  )

  const [listImageDeleted, setListImageDeleted] = useState<string[]>([])

  useEffect(() => {
    if (editor && arrayImage) editor.AssetManager.add(arrayImage)
  }, [arrayImage])

  useEffect(() => {
    if (editor && projectData.projectData) {
      editor.loadProjectData(JSON.parse(he.decode(projectData.projectData)))
      return
    }
    if (
      editor &&
      isUpdate &&
      !getCategoryApi.isLoading &&
      getCategoryApi.data?.message.landingPage.projectData
    ) {
      editor.loadProjectData(
        JSON.parse(
          he.decode(getCategoryApi.data?.message.landingPage.projectData),
        ),
      )
      return
    }
  }, [editor])

  const onEditor = (editor: Editor) => {
    setEditor(editor)
    ;(window as any).editor = editor
  }

  return (
    <Fragment>
      <GjsEditor
        className='gjs-custom-editor hidden bg-white text-textPrimaryColor lg:block'
        grapesjs={grapesjs}
        options={{
          height: '100vh',
          storageManager: false,
          undoManager: { trackSelection: false },
          selectorManager: { componentFirst: true },
          projectData: {
            pages: [
              {
                name: 'Create Landing Page',
              },
            ],
          },
        }}
        plugins={[
          basicBlockPlugin,
          formPlugin,
          editorPlugin,
          flexBoxPlugin,
          timerPlugin,
          customCodePlugin,
          navbarPlugin,
          tooltipsPlugin,
          imagePlugin,
        ]}
        onEditor={onEditor}
      >
        <div className='flex h-full border-b border-primaryColor'>
          <div className='gjs-column-m flex flex-grow flex-col'>
            <Topbar
              className='min-h-[64px] border-b border-primaryColor shadow-headerBox'
              setArrayImage={setArrayImage}
              listImageDeleted={listImageDeleted}
            />
            <Canvas className='gjs-custom-editor-canvas flex-grow bg-slate-200' />
          </div>
          <RightSidebar className='gjs-column-r w-[300px] border-l border-primaryColor' />
        </div>
        <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              children={content}
              close={close}
            />
          )}
        </ModalProvider>
        <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                setListImageDeleted={setListImageDeleted}
                listImageDeleted={listImageDeleted}
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider>
      </GjsEditor>
      <div className='flex h-screen w-screen items-center justify-center lg:hidden'>
        <h1 className='flex max-w-[90%] flex-col items-center gap-5 text-center text-3xl uppercase text-primaryColor'>
          <figure className='block w-[200px]'>
            <img src='../../logoText.png' />
          </figure>
          Vui lòng sử dụng chức năng này trên máy tính!
        </h1>
      </div>
    </Fragment>
  )
}

export default LandingPageEditor
