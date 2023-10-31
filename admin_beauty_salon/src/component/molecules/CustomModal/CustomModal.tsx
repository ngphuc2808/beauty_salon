import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal, { ModalProps } from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '90vh',
  p: 2,
}

interface CustomModalProps extends Omit<ModalProps, 'title'> {
  title: ReactNode
  close: () => void
}

const CustomModal = ({
  children,
  title,
  close,
  ...props
}: CustomModalProps) => {
  return (
    <Modal onClose={close} {...props}>
      <Fade in={props.open}>
        <Box sx={style} className='rounded bg-white text-white'>
          <div className='flex pb-3'>
            <div className='flex-grow text-lg'>{title}</div>
            <div onClick={close} className='cursor-pointer'>
              <i className='ri-close-line text-2xl text-textHeadingColor' />
            </div>
          </div>
          <div className='flex-grow overflow-y-auto'>{children}</div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default CustomModal
