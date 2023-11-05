import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { DevicesProvider, WithEditor } from '@grapesjs/react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGlobalContext } from '@/contexts/globalContext'
import Button from '@/component/atoms/Button'
import TopbarButtons from '../TopbarButtons'
import { useDeleteImages, usePostImages } from '@/hooks/hooks'

const imageMimeType = /image\/(png|jpg|jpeg)/i

interface Props {
  className?: string
  setArrayImage: (data: string[]) => void
  listImageDeleted: string[]
}

const Topbar = ({ className, setArrayImage, listImageDeleted }: Props) => {
  const router = useNavigate()

  const { setProjectData } = useGlobalContext()

  const uploadImagesApi = usePostImages('ImagesLandingPage')

  const deleteImagesApi = useDeleteImages('ImagesLandingPage')

  const handleSaveContent = () => {
    setProjectData({
      projectData: JSON.stringify((window as any).editor.getProjectData()),
      html: (window as any).editor.getHtml(),
      css: (window as any).editor.getCss(),
    })

    if (listImageDeleted.length > 0)
      deleteImagesApi.mutate(listImageDeleted.toString())

    router(-1)
  }

  const fileListToArray = (fileList: FileList) => {
    const filesArray = []
    for (const file of fileList) {
      filesArray.push(file)
    }
    return filesArray
  }

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget
    if (input.files?.length) {
      const files = fileListToArray(input.files)

      const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match(imageMimeType)) {
          toast.error('Vui lòng chọn đúng định dạng hình ảnh!')
          return
        } else {
          formData.append('images', files[i])
        }
      }

      try {
        const images = await uploadImagesApi.mutateAsync(formData)
        setArrayImage(images.data.results)
        toast.success('Upload ảnh thành công!')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div
      className={`gjs-top-sidebar flex items-center justify-between px-[10px] ${className}`}
    >
      <div className='flex items-center'>
        <Button to={'/danh-muc-cap-1'} className='h-full w-[90px]'>
          <figure>
            <img src='../../logoText.png' />
          </figure>
        </Button>
      </div>
      <div className='flex items-center'>
        <DevicesProvider>
          {({ selected, select, devices }) => (
            <FormControl size='small'>
              <Select
                value={selected}
                onChange={(ev) => select(ev.target.value)}
              >
                {devices.map((device) => (
                  <MenuItem value={device.id} key={device.id}>
                    {device.getName()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DevicesProvider>
        <WithEditor>
          <TopbarButtons className='ml-auto px-2' />
        </WithEditor>
        <div className='flex gap-2'>
          <label
            htmlFor='uploadFiles'
            className='flex max-h-[45.8px] min-w-[98px] cursor-pointer items-center gap-2 rounded-md border border-primaryColor px-4 py-3 text-sm text-primaryColor'
          >
            <i className='ri-upload-line text-lg'></i>
            <p>Tải ảnh</p>
            <input
              id='uploadFiles'
              type='file'
              onChange={handleUploadImage}
              accept='image/*'
              multiple
              hidden
            />
          </label>
          <Button
            className='max-h-[45.8px] min-w-[98px] rounded-md bg-primaryColor px-4 py-3 text-sm text-white hover:bg-secondColor'
            onClick={handleSaveContent}
          >
            Lưu trang
          </Button>
          <Button
            onClick={() => router(-1)}
            className='max-h-[45.8px] min-w-[98px] rounded-md bg-primaryColor px-4 py-3 text-sm text-white hover:bg-secondColor'
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
