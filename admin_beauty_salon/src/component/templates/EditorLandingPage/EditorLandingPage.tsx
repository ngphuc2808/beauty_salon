import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import editorPlugin from "grapesjs-plugin-ckeditor";
import flexBoxPlugin from "grapesjs-blocks-flexbox";
import timerPlugin from "grapesjs-component-countdown";
import customCodePlugin from "grapesjs-custom-code";
import navbarPlugin from "grapesjs-navbar";
import tooltipsPlugin from "grapesjs-tooltip";
import imagePlugin from "grapesjs-tui-image-editor";

import { PostApi } from "@/services/api/post";

const EditorLandingPage = () => {
  const editorRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const router = useNavigate();

  useEffect(() => {
    const editor = grapesjs.init({
      width: "100%",
      height: "100vh",
      container: editorRef.current,
      fromElement: true,
      plugins: [
        websitePlugin,
        basicBlockPlugin,
        formPlugin,
        editorPlugin,
        flexBoxPlugin,
        timerPlugin,
        customCodePlugin,
        navbarPlugin,
        tooltipsPlugin,
        imagePlugin,
      ],
      storageManager: false,
    });

    const eConfig: any = editor.getConfig();
    eConfig.showDevices = 0;

    const pn = editor.Panels;

    pn.getPanels().reset([
      {
        id: "commands",
        buttons: [
          {
            id: "back-page",
            command: () => router(-1),
            className: "fa fa-arrow-left",
          },
        ],
      },
      {
        id: "options",
        buttons: [
          {
            id: "sw-visibility",
            command: "sw-visibility",
            className: "fa fa-square-o",
          },
          {
            id: "preview",
            command: () => editor.runCommand("preview"),
            className: "fa fa-eye",
          },
          {
            id: "fullscreen",
            command: "fullscreen",
            className: "fa fa-arrows-alt",
          },
          {
            id: "undo",
            className: "fa fa-undo",
            command: () => editor.runCommand("core:undo"),
          },
          {
            id: "redo",
            className: "fa fa-repeat",
            command: () => editor.runCommand("core:redo"),
          },
          {
            id: "core:canvas-clear",
            className: "fa fa-trash",
            command: () => {
              const confrm = window.confirm("Delete template?");
              if (confrm) {
                window.alert("Deleted!");
                return editor.runCommand("core:canvas-clear");
              }
              return;
            },
          },
          {
            id: "save-db",
            className: "fa fa-floppy-o",
            command: async (
              editor: Editor,
              sender: { set: (arg0: string, arg1: number) => void }
            ) => {
              sender && sender.set("active", 0); // turn off the button

              const post = {
                title: "Test",
                content: JSON.stringify(editor.getProjectData()),
                thumbnail: "",
                status: true,
              };

              try {
                const result = await PostApi.createPost(post);
                if (result) {
                  console.log(result);
                }
              } catch (error: any) {
                console.log(error);
              }
              return;
            },
            attributes: { title: "Save DB" },
          },
          {
            id: "load-db",
            className: "fa fa-rocket",
            command: async (
              editor: Editor,
              sender: { set: (arg0: string, arg1: number) => void }
            ) => {
              sender && sender.set("active", 0);
              const result = await PostApi.getPost();
              await editor.loadProjectData(
                JSON.parse(result.results._doc.content)
              );

              return;
            },
            attributes: { title: "Load DB" },
          },
          {
            id: "set-device-mobile",
            command: () => {
              return editor.setDevice("Mobile portrait");
            },
            className: "fa fa-mobile",
          },
          {
            id: "set-device-tablet",
            command: () => {
              return editor.setDevice("Tablet");
            },
            className: "fa fa-tablet",
          },
          {
            id: "set-device-desktopa",
            command: () => {
              return editor.setDevice("Desktop");
            },
            className: "fa fa-desktop",
            active: 1,
          },
        ],
      },
      {
        id: "views",
        buttons: [
          {
            id: "open-sm",
            command: "open-sm",
            active: true,
            className: "fa fa-paint-brush",
          },
          {
            id: "open-tm",
            command: "open-tm",
            className: "fa fa-cog",
          },
          {
            id: "open-layers",
            command: "open-layers",
            className: "fa fa-bars",
          },
          {
            id: "open-blocks",
            command: "open-blocks",
            className: "fa fa-th-large",
          },
        ],
      },
    ]);

    return () => editor.destroy();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Create Landing Page</title>
      </Helmet>
      <div ref={editorRef} />
    </HelmetProvider>
  );
};

export default EditorLandingPage;
