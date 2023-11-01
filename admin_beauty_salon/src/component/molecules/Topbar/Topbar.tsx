import { useNavigate } from 'react-router-dom'
import { DevicesProvider, WithEditor } from '@grapesjs/react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { useGlobalContext } from '@/contexts/globalContext'
import Button from '@/component/atoms/Button'
import TopbarButtons from '../TopbarButtons'

type Props = {
  className?: string
  setArrayImage: (data: string[]) => void
}

const Topbar = ({ className, setArrayImage }: Props) => {
  const router = useNavigate()

  const { setProjectData } = useGlobalContext()

  const handleSaveContent = () => {
    setProjectData({
      projectData: JSON.stringify((window as any).editor.getProjectData()),
      html: (window as any).editor.getHtml(),
      css: (window as any).editor.getCss(),
    })
    router(-1)
  }

  const handleUploadImage = () => {
    setArrayImage([])
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
            onClick={handleUploadImage}
          >
            <i className='ri-upload-line text-lg'></i>
            <p>Tải ảnh</p>
            <input id='uploadFiles' type='file' multiple hidden />
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
