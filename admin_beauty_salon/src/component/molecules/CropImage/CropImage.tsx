import { useState } from 'react'
import Cropper from 'react-easy-crop'

import getCroppedImg from '@/helpers/listFunction'

type Props = {
  image: string | ArrayBuffer | null
  setModalCrop: (modalCrop: boolean) => void
  setFileImage: (fileImage: Blob) => void
  setPreviewImg: (previewImg: string) => void
  user?: boolean
}

const CropImage = ({
  image,
  setModalCrop,
  setFileImage,
  setPreviewImg,
  user,
}: Props) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropPixelType>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const cropComplete = ({}, croppedAreaPixels: CropPixelType) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)

    const result = croppedImage as {
      file: Blob
      url: string
    }

    setFileImage(result.file)
    setPreviewImg(result.url)
    setModalCrop(false)
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-[999] flex items-center justify-center'>
      <div
        className='absolute z-0 h-full w-full bg-black opacity-40'
        onClick={() => setModalCrop(false)}
      ></div>
      <div className='fixed left-[50%] top-[50%] z-[999] flex w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col justify-start rounded-lg bg-[#fff] shadow sm:max-w-lg'>
        <h1 className='px-6 py-[18px] text-xl'>Cắt hình ảnh</h1>
        <div className='relative z-10 h-[400px] w-full bg-[#000]'>
          <Cropper
            image={image as string | undefined}
            crop={crop}
            zoom={zoom}
            maxZoom={10}
            rotation={rotation}
            aspect={user ? 1 : 2}
            cropShape={'rect'}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </div>
        <div className='mx-6 my-4 flex flex-[0_0_auto] flex-col items-center justify-end p-2'>
          <div className='w-full font-bold'>
            <p>Zoom: {zoom * 10}%</p>
            <input
              className='mx-0 my-5 h-2.5 w-full cursor-pointer appearance-none rounded-xl bg-[#d3d3d3] accent-red-400 outline-none'
              type='range'
              min={1}
              max={10}
              step={1}
              value={zoom}
              onInput={(e) => setZoom(Number(e.currentTarget.value))}
            />
          </div>
          <div className='w-full font-bold'>
            <p>Rotation: {rotation * 10}%</p>
            <input
              className='mx-0 my-5 h-2.5 w-full cursor-pointer appearance-none rounded-xl bg-[#d3d3d3] accent-red-400 outline-none'
              type='range'
              min={0}
              max={360}
              step={1}
              value={rotation}
              onInput={(e) => setRotation(Number(e.currentTarget.value))}
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='mx-2 mt-6 w-[125px] rounded bg-red-400 px-0 py-1.5 tracking-[1px] text-white hover:bg-red-500'
              onClick={onCrop}
            >
              Cắt
            </button>
            <button
              className='mx-2 mt-6 w-[125px] rounded bg-red-400 px-0 py-1.5 tracking-[1px] text-white hover:bg-red-500'
              onClick={() => setModalCrop(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropImage
