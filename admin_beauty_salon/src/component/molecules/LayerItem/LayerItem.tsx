import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import type { Component } from 'grapesjs'
import { useEditor } from '@grapesjs/react'

declare interface LayerItemProps extends React.HTMLProps<HTMLDivElement> {
  component: Component
  level: number
  draggingCmp?: Component
  dragParent?: Component
}

const itemStyle = { maxWidth: `100%` }

const LayerItem = ({
  component,
  draggingCmp,
  dragParent,
  ...props
}: LayerItemProps) => {
  const editor = useEditor()
  const { Layers } = editor
  const layerRef = useRef<HTMLDivElement>(null)
  const [layerData, setLayerData] = useState(Layers.getLayerData(component))
  const { open, selected, hovered, components, visible, name } = layerData
  const componentsIds = components.map((cmp) => cmp.getId())
  const isDragging = draggingCmp === component
  const cmpHash = componentsIds.join('-')
  const level = props.level + 1
  const isHovered = hovered || dragParent === component

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component))
    if (layerRef.current) {
      ;(layerRef.current as any).__cmp = component
    }
  }, [component])

  useEffect(() => {
    const up = (cmp: Component) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp))
    }
    const ev = Layers.events.component
    editor.on(ev, up)

    return () => {
      editor.off(ev, up)
    }
  }, [editor, Layers, component])

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <LayerItem
        key={cmp.getId()}
        component={cmp}
        level={level}
        draggingCmp={draggingCmp}
        dragParent={dragParent}
      />
    ))
  }, [cmpHash, draggingCmp, dragParent])

  const toggleOpen = (ev: MouseEvent) => {
    ev.stopPropagation()
    Layers.setLayerData(component, { open: !open })
  }

  const toggleVisibility = (ev: MouseEvent) => {
    ev.stopPropagation()
    Layers.setLayerData(component, { visible: !visible })
  }

  const select = (event: MouseEvent) => {
    event.stopPropagation()
    Layers.setLayerData(component, { selected: true }, { event })
  }

  const hover = (hovered: boolean) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered })
    }
  }

  return (
    <div
      className={`layer-item flex flex-col
    ${selected && 'bg-white'}
    ${(!visible || isDragging) && 'opacity-50'}`}
    >
      <div
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        className='group max-w-full'
        data-layer-item
        ref={layerRef}
      >
        <div
          className={`flex cursor-pointer items-center gap-1 border-b border-primaryColor p-1 pr-2 ${
            level === 0 && 'border-t'
          } ${isHovered && 'bg-secondColor'} ${selected && 'bg-primaryColor'}`}
        >
          <div
            style={{ marginLeft: `${level * 10}px` }}
            className={` cursor-pointer ${
              !components.length && 'pointer-events-none opacity-0'
            }`}
            onClick={toggleOpen}
          >
            {!open ? (
              <i className='ri-arrow-drop-right-line text-2xl text-white'></i>
            ) : (
              <i className='ri-arrow-drop-down-line text-2xl text-white'></i>
            )}
          </div>
          <div className='flex-grow truncate' style={itemStyle}>
            {name}
          </div>
          <div
            className={`cursor-pointer group-hover:opacity-100 ${
              visible ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={toggleVisibility}
          >
            {visible ? (
              <i className='ri-eye-line text-xl text-white' />
            ) : (
              <i className='ri-eye-off-line text-xl text-white' />
            )}
          </div>
        </div>
      </div>
      {!!(open && components.length) && (
        <div className={`max-w-full ${!open && 'hidden'}`}>{cmpToRender}</div>
      )}
    </div>
  )
}

export default LayerItem
