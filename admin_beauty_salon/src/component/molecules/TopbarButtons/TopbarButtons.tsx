import { useEditor } from '@grapesjs/react'
import { useEffect, useState } from 'react'

type IconButtonType = {
  id: string
  icon: string
  options?: Record<string, any>
  disabled?: () => boolean
}

const TopbarButtons = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const editor = useEditor()
  const [, setUpdateCounter] = useState(0)
  const { UndoManager, Commands } = editor
  const listIconButtons: IconButtonType[] = [
    {
      id: 'core:component-outline',
      icon: '<i class="ri-shape-line"></i>',
    },
    {
      id: 'core:fullscreen',
      icon: '<i class="ri-fullscreen-line"></i>',
      options: { target: '#root' },
    },
    {
      id: 'core:open-code',
      icon: '<i class="ri-code-line"></i>',
    },
    {
      id: 'core:undo',
      icon: '<i class="ri-arrow-go-back-line"></i>',
      disabled: () => !UndoManager.hasUndo(),
    },
    {
      id: 'core:redo',
      icon: '<i class="ri-arrow-go-forward-line"></i>',
      disabled: () => !UndoManager.hasRedo(),
    },
  ]

  useEffect(() => {
    const commandEvent = 'run stop'
    const updateEvent = 'update'
    const updateCounter = () => setUpdateCounter((value) => value + 1)
    const onCommand = (id: string) => {
      listIconButtons.find((btn) => btn.id === id) && updateCounter()
    }
    editor.on(commandEvent, onCommand)
    editor.on(updateEvent, updateCounter)

    return () => {
      editor.off(commandEvent, onCommand)
      editor.off(updateEvent, updateCounter)
    }
  }, [])

  return (
    <div className={`flex gap-3 ${className}`}>
      {listIconButtons.map(({ id, icon, disabled, options = {} }) => (
        <button
          key={id}
          className={`border-primaryColor w-full rounded border px-2 py-1 ${
            Commands.isActive(id) && 'text-sky-300'
          } ${disabled?.() && 'opacity-50'}`}
          onClick={() =>
            Commands.isActive(id)
              ? Commands.stop(id)
              : Commands.run(id, options)
          }
          disabled={disabled?.()}
        >
          <span
            className='text-xl'
            dangerouslySetInnerHTML={{
              __html: `${icon}`,
            }}
          ></span>
        </button>
      ))}
    </div>
  )
}

export default TopbarButtons
