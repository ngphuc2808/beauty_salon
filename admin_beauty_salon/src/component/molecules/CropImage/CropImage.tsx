import { useState } from "react";
import { useSelector } from "react-redux";
import Cropper from "react-easy-crop";

import styles from "./CropImage.module.css";

import getCroppedImg from "@/helpers";
import CropImage from ".";

const CropImagePost = ({
  image,
  setModalCrop,
  setFileImage,
  setPreviewImg,
}: ICropImageUser) => {
  const component = useSelector(
    (state: {
      component: {
        navigationComponent: boolean;
        authComponent: boolean;
      };
    }) => state.component
  );

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();

  const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImage: any = await getCroppedImg(
      image,
      croppedAreaPixels,
      rotation
    );
    setFileImage(croppedImage.file);
    setPreviewImg(croppedImage.url);
    setModalCrop(false);
  };

  return (
    <div className={`${styles.modal}`}>
      <div
        className={`${styles.modalOverlay}`}
        onClick={() => setModalCrop(false)}
      ></div>
      <div className={`${styles.modalBody}`}>
        <h1 className={`${styles.title}`}>Cắt hình ảnh</h1>
        <div className={`${styles.content}`}>
          <Cropper
            image={image as string | undefined}
            crop={crop}
            zoom={zoom}
            maxZoom={10}
            rotation={rotation}
            aspect={component.authComponent ? 1 : 2}
            cropShape={component.authComponent ? "round" : "rect"}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </div>
        <div className={`${styles.action}`}>
          <div className="w-full font-bold">
            <p>Zoom: {zoom * 10}%</p>
            <input
              className={`${styles.slider}`}
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
              className={`${styles.slider}`}
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onInput={(e) => setRotation(Number(e.currentTarget.value))}
            />
          </div>
          <div className={`${styles.buttonCropZone}`}>
            <button className={`${styles.button}`} onClick={onCrop}>
              Cắt
            </button>
            <button
              className={`${styles.button}`}
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

export default CropImagePost;
