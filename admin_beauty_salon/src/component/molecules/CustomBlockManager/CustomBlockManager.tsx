import { BlocksResultProps } from '@grapesjs/react'

type CustomBlockManagerProps = Pick<
  BlocksResultProps,
  'mapCategoryBlocks' | 'dragStart' | 'dragStop'
>

const CustomBlockManager = ({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlockManagerProps) => {
  return (
    <div className='gjs-custom-block-manager text-left'>
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
        <div key={category}>
          <div className='px-4 py-2'>{category}</div>
          <div className='grid grid-cols-2 gap-2 p-2'>
            {blocks.map((block) => (
              <div
                key={block.getId()}
                draggable
                className='flex cursor-pointer flex-col items-center rounded border border-primaryColor px-5 py-2 transition-colors'
                onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                onDragEnd={() => dragStop(false)}
              >
                <div
                  className='h-10 w-10'
                  dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                />
                <div
                  className='w-full text-center text-sm'
                  title={block.getLabel()}
                >
                  {block.getLabel()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomBlockManager
