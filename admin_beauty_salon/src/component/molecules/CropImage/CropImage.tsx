import { useContext, useState } from "react";
import Cropper from "react-easy-crop";

import getCroppedImg from "@/helpers/listFunction";
import { GlobalContext } from "@/contexts/globalContext";

type Props = {
  image: string | ArrayBuffer | null;
  setModalCrop: (modalCrop: boolean) => void;
  setFileImage: (fileImage: Blob) => void;
  setPreviewImg: (previewImg: string) => void;
};

const CropImage = ({
  image,
  setModalCrop,
  setFileImage,
  setPreviewImg,
}: Props) => {
  const { selectMainComponent } = useContext(GlobalContext);

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropPixel>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const cropComplete = ({}, croppedAreaPixels: CropPixel) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImage = await getCroppedImg(
      image,
      croppedAreaPixels,
      rotation
    );

    const result = croppedImage as {
      file: Blob;
      url: string;
    };

    setFileImage(result.file);
    setPreviewImg(result.url);
    setModalCrop(false);
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-[999]">
      <div
        className="w-full h-full absolute bg-black opacity-40 z-0"
        onClick={() => setModalCrop(false)}
      ></div>
      <div className="fixed top-[50%] left-[50%] bg-[#fff] w-full max-w-[90%] sm:max-w-lg rounded-lg flex justify-start flex-col z-[999] -translate-x-1/2 -translate-y-1/2 shadow">
        <h1 className="py-[18px] px-6 text-xl">Cắt hình ảnh</h1>
        <div className="w-full h-[400px] relative bg-[#000] z-10">
          <Cropper
            image={image as string | undefined}
            crop={crop}
            zoom={zoom}
            maxZoom={10}
            rotation={rotation}
            aspect={
              selectMainComponent !== "createPost" &&
              selectMainComponent !== "detailCategory"
                ? 1
                : 2
            }
            cropShape={
              selectMainComponent !== "createPost" &&
              selectMainComponent !== "detailCategory"
                ? "round"
                : "rect"
            }
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </div>
        <div className="flex items-center p-2 justify-end flex-col my-4 mx-6 flex-[0_0_auto]">
          <div className="w-full font-bold">
            <p>Zoom: {zoom * 10}%</p>
            <input
              className="w-full h-2.5 my-5 mx-0 rounded-xl bg-[#d3d3d3] outline-none cursor-pointer appearance-none accent-red-400"
              type="range"
              min={1}
              max={10}
              step={1}
              value={zoom}
              onInput={(e) => setZoom(Number(e.currentTarget.value))}
            />
          </div>
          <div className="w-full font-bold">
            <p>Rotation: {rotation * 10}%</p>
            <input
              className="w-full h-2.5 my-5 mx-0 rounded-xl bg-[#d3d3d3] outline-none cursor-pointer appearance-none accent-red-400"
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onInput={(e) => setRotation(Number(e.currentTarget.value))}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="w-[125px] rounded mx-2 bg-red-400 py-1.5 px-0 text-white mt-6 tracking-[1px] hover:bg-red-500"
              onClick={onCrop}
            >
              Cắt
            </button>
            <button
              className="w-[125px] rounded mx-2 bg-red-400 py-1.5 px-0 text-white mt-6 tracking-[1px] hover:bg-red-500"
              onClick={() => setModalCrop(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropImage;
