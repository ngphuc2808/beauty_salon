import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import editorPlugin from "grapesjs-plugin-ckeditor";
import flexBoxPlugin from "grapesjs-blocks-flexbox";
import timerPlugin from "grapesjs-component-countdown";
import customCodePlugin from "grapesjs-custom-code";
import navbarPlugin from "grapesjs-navbar";
import tooltipsPlugin from "grapesjs-tooltip";
import imagePlugin from "grapesjs-tui-image-editor";

import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from "@grapesjs/react";
import grapesjs from "grapesjs";
import type { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomModal from "./components/CustomModal";
import CustomAssetManager from "./components/CustomAssetManager";
import Topbar from "./components/Topbar";
import RightSidebar from "./components/RightSidebar";
import { useGetPost } from "@/hooks/hooks";
import he from "he";
import { useGlobalContext } from "@/contexts/globalContext";

const LandingPageEditor = () => {
  const { projectData } = useGlobalContext();

  const { id } = useParams();

  const isUpdate = Boolean(id);

  const landing = useGetPost(id!);

  const [editor, setEditor] = useState<any>();

  const arrayImage = [
    "https://via.placeholder.com/350x250/78c5d6/fff",
    "https://via.placeholder.com/350x250/459ba8/fff",
    "https://via.placeholder.com/350x250/79c267/fff",
    "https://via.placeholder.com/350x250/c5d647/fff",
    "https://via.placeholder.com/350x250/f28c33/fff",
  ];

  useEffect(() => {
    if (editor && projectData.projectData) {
      editor.loadProjectData(JSON.parse(he.decode(projectData.projectData)));
      return;
    }
    if (isUpdate && !landing.isLoading && landing.data) {
      editor.loadProjectData(
        JSON.parse(he.decode(landing.data.results.content.projectData!))
      );
      return;
    }
  }, [editor]);

  const onEditor = (editor: Editor) => {
    setEditor(editor);
    (window as any).editor = editor;
  };

  return (
    <GjsEditor
      className="gjs-custom-editor text-black bg-white"
      grapesjs={grapesjs}
      options={{
        height: "100vh",
        storageManager: false,
        undoManager: { trackSelection: false },
        selectorManager: { componentFirst: true },
        projectData: {
          assets: arrayImage,
          pages: [
            {
              name: "Create Landing Page",
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
      <div className={`flex h-full border-b border-red-400`}>
        <div className="gjs-column-m flex flex-col flex-grow">
          <Topbar className="min-h-[64px] border-b border-red-400 shadow-headerBox" />
          <Canvas className="flex-grow gjs-custom-editor-canvas bg-slate-300" />
        </div>
        <RightSidebar
          className={`gjs-column-r w-[300px] border-l border-red-400`}
        />
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
            <CustomAssetManager assets={assets} select={select} close={close} />
          </Container>
        )}
      </AssetsProvider>
    </GjsEditor>
  );
};

export default LandingPageEditor;
