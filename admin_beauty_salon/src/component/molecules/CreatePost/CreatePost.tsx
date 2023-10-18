import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Font } from "@ckeditor/ckeditor5-font";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Underline, Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Link as LinkEditor } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import {
  Image,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
} from "@ckeditor/ckeditor5-image";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";

import CropImage from "../CropImage";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CreatePost = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState(false);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [fileImage, setFileImage] = useState<Blob>(new Blob());
  const [file, setFile] = useState<File>();
  const [formValue, setFormValue] = useState<PostType>({
    title: "",
    content: "",
    thumbnail: "",
    status: false,
  });

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImg);
    };
  }, [previewImg]);

  useEffect(() => {
    let reader: FileReader,
      isCancel: boolean = false;
    if (file) {
      reader = new FileReader();
      reader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setCropImage(result);
          setModalCrop(true);
        }
      };
      reader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (reader && reader.readyState === 2) {
        reader.abort();
        reader.onload = null;
      }
    };
  }, [file]);

  const handleCrop = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget;
    if (input.files?.length) {
      const file = input.files[0];
      if (!file.type.match(imageMimeType)) {
        toast.error("Vui lòng chọn đúng định dạng hình ảnh!");
        return;
      }
      setFile(file);
    }
    e.currentTarget.value = "";
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handlePost = () => {
    console.log(formValue);
  };

  // const uploadPlugin = (editor: ClassicEditor) => {
  //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //     return uploadAdapter(loader);
  //   };
  // }

  return (
    <Fragment>
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-3">
          <Link to={"/create-category"}>
            <i className="lg:text-2xl text-xl ml-5 w-10 h-10 flex items-center justify-center text-white bg-red-400 hover:bg-red-500 cursor-pointer rounded-md ri-arrow-left-line"></i>
          </Link>
          <h1 className="text-xl text-textHeadingColor">Tạo trang SEO</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-12 lg:col-span-8 order-2 lg:order-none">
          <div className="bg-white shadow rounded-lg p-5 mb-5">
            <h1 className="text-lg text-textHeadingColor">Tên bài viết</h1>
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập tên danh mục"
              className="mt-3 w-full border rounded p-3 text-sm focus:outline-none focus:border-red-500 focus:ring focus:ring-red-500/20"
              name="title"
              value={formValue.title}
              onChange={handleInput}
            />
          </div>
          <div className="shadow rounded-lg mb-5 bg-white w-full p-4">
            <CKEditor
              editor={ClassicEditor}
              config={{
                plugins: [
                  Autoformat,
                  Essentials,
                  Paragraph,
                  Bold,
                  Italic,
                  Heading,
                  Indent,
                  IndentBlock,
                  Underline,
                  BlockQuote,
                  Font,
                  Alignment,
                  List,
                  LinkEditor,
                  MediaEmbed,
                  PasteFromOffice,
                  Image,
                  ImageStyle,
                  ImageToolbar,
                  ImageUpload,
                  ImageResize,
                  Base64UploadAdapter,
                  Table,
                  TableToolbar,
                  TextTransformation,
                ],
                toolbar: [
                  "undo",
                  "redo",
                  "|",
                  "heading",
                  "|",
                  "fontFamily",
                  "fontSize",
                  "fontColor",
                  "fontBackgroundColor",
                  "|",
                  "bold",
                  "italic",
                  "underline",
                  "|",
                  "alignment",
                  "outdent",
                  "indent",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                  "|",
                  "link",
                  "insertTable",
                  "imageUpload",
                  "mediaEmbed",
                ],
                heading: {
                  options: [
                    {
                      model: "paragraph",
                      title: "Paragraph",
                      class: "ck-heading_paragraph",
                    },
                    {
                      model: "heading1",
                      view: "h1",
                      title: "Heading 1",
                      class: "ck-heading_heading1",
                    },
                    {
                      model: "heading2",
                      view: "h2",
                      title: "Heading 2",
                      class: "ck-heading_heading2",
                    },
                    {
                      model: "heading3",
                      view: "h3",
                      title: "Heading 3",
                      class: "ck-heading_heading3",
                    },
                  ],
                },
                fontSize: {
                  options: [
                    9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25,
                    27, 29, 31, 33, 35,
                  ],
                },
                fontFamily: {
                  options: [
                    "default",
                    "Arial, Helvetica, sans-serif",
                    "Courier New, Courier, monospace",
                    "Georgia, serif",
                    "Lucida Sans Unicode, Lucida Grande, sans-serif",
                    "Tahoma, Geneva, sans-serif",
                    "Times New Roman, Times, serif",
                    "Trebuchet MS, Helvetica, sans-serif",
                    "Verdana, Geneva, sans-serif",
                  ],
                },
                alignment: {
                  options: ["justify", "left", "center", "right"],
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                  ],
                },
                image: {
                  resizeUnit: "px",
                  toolbar: [
                    "imageStyle:alignLeft",
                    "imageStyle:alignCenter",
                    "imageStyle:alignRight",
                    "|",
                    "imageTextAlternative",
                  ],
                },
                typing: {
                  transformations: {
                    include: [
                      "quotes",
                      "typography",
                      { from: "CKE", to: "CKEditor" },
                    ],
                    remove: [
                      "enDash",
                      "emDash",
                      "oneHalf",
                      "oneThird",
                      "twoThirds",
                      "oneForth",
                      "threeQuarters",
                    ],
                  },
                },
                placeholder: "Nhập nội dung...",
              }}
              onChange={(_event, editor) => {
                const newData = editor.getData();
                setFormValue({ ...formValue, content: newData });
              }}
            />
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <div className="flex items-center justify-between">
              <button
                className="text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md w-[48%] lg:w-[200px]"
                onClick={handlePost}
              >
                Lưu
              </button>
              <Link
                to={"/create-category"}
                className="flex justify-center text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md w-[48%] lg:w-[200px]"
              >
                Thoát
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 [&>*]:mb-5">
          <div className="bg-white shadow rounded-lg p-5 mt-0">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-textHeadingColor">Ảnh bài viết</h1>
              <div className="flex items-center gap-3 text-sm">
                <label
                  htmlFor="dropZone"
                  className="cursor-pointer text-blue-500"
                >
                  Thay thế ảnh
                </label>
                <span
                  className="cursor-pointer text-red-500"
                  onClick={() => setPreviewImg("")}
                >
                  Xóa
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropZone"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden rounded-lg">
                  {previewImg ? (
                    <figure className="w-full h-full">
                      <img
                        className="max-h-full max-w-full"
                        src={previewImg}
                        alt="image"
                      />
                    </figure>
                  ) : (
                    <>
                      <i className="ri-upload-cloud-2-line mb-1 text-4xl text-textPrimaryColor"></i>
                      <p className="mb-2 text-sm text-textPrimaryColor">
                        <span className="font-semibold">
                          Bấm hoặc kéo thả để chọn ảnh của bạn
                        </span>
                      </p>
                      <p className="text-xs text-textPrimaryColor">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input id="dropZone" type="file" onChange={handleCrop} hidden />
              </label>
            </div>
          </div>
        </div>
      </div>
      {modalCrop && (
        <CropImage
          image={cropImage}
          setModalCrop={setModalCrop}
          setFileImage={setFileImage}
          setPreviewImg={setPreviewImg}
        />
      )}
    </Fragment>
  );
};

export default CreatePost;
