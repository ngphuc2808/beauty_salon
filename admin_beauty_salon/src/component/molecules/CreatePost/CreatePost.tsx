import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Font } from "@ckeditor/ckeditor5-font";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Underline, Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Link } from "@ckeditor/ckeditor5-link";
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

import styles from "./CreatePost.module.css";
import CropImage from "../CropImage";

const CreatePost = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [nameValue, setNameValue] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handlePost = () => {
    const result = {
      title: nameValue,
      content: data,
      thumbnail: previewImg,
    };
    console.log(result);
  };

  const [previewImg, setPreviewImg] = useState<string>("");
  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState(false);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImg);
    };
  }, [previewImg]);

  const handleCrop = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget;
    if (input.files?.length) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setModalCrop(true);
        setCropImage(reader.result);
      });
      reader.readAsDataURL(input.files[0]);
    }
    e.currentTarget.value = "";
  };

  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <div className={`${styles.descriptionDashBoard}`}>
          <i className={`${styles.customIconBack} ri-arrow-left-line`}></i>
          <h1 className={`${styles.titleDashBoard}`}>Đăng bài</h1>
        </div>
      </div>
      <div className={`${styles.gridContent}`}>
        <div className={`${styles.leftContent}`}>
          <div className={`${styles.itemLeftContent} mb-5`}>
            <h1 className={`${styles.titleItem}`}>Tên bài viết</h1>
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập tên danh mục"
              className={`${styles.inputName}`}
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
          </div>
          <div className={`${styles.mainItemLeftContent}`}>
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
                  Link,
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
                      // Use only the 'quotes' and 'typography' groups.
                      "quotes",
                      "typography",

                      // Plus some custom transformation.
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
                setData(newData);
              }}
            />
          </div>
          <div className={`${styles.itemLeftContent}`}>
            <div className="flex items-center justify-between">
              <button
                className={`${styles.customButton} w-[48%] lg:w-[200px] `}
                onClick={handlePost}
              >
                Lưu
              </button>
              <button className={`${styles.customButton} w-[48%] lg:w-[200px]`}>
                Thoát
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.rightContent}`}>
          <div className={`${styles.banner}`}>
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
              <label htmlFor="dropZone" className={`${styles.labelDropZone}`}>
                <div className={`${styles.dropZone}`}>
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
          setPreviewImg={setPreviewImg}
        />
      )}
    </Fragment>
  );
};

export default CreatePost;
