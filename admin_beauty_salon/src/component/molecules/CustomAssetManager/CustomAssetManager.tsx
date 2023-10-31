import { AssetsResultProps, useEditor } from '@grapesjs/react'
import type { Asset } from 'grapesjs'

import Button from '@/component/atoms/Button'

type CustomAssetManagerProps = Pick<
  AssetsResultProps,
  'assets' | 'close' | 'select'
>

const CustomAssetManager = ({ assets, select }: CustomAssetManagerProps) => {
  const editor = useEditor()

  const remove = (asset: Asset) => {
    editor.Assets.remove(asset)
  }

  return (
    <div className='grid grid-cols-3 gap-2 pr-2'>
      {assets.map((asset) => (
        <div
          key={asset.getSrc()}
          className='group relative overflow-hidden rounded'
        >
          <img className='display-block' src={asset.getSrc()} />
          <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-end bg-zinc-700/75 p-5 opacity-0 transition-opacity group-hover:opacity-100'>
            <Button
              className='w-full rounded border px-2 py-1'
              onClick={() => select(asset, true)}
            >
              Select
            </Button>
            <Button
              className='absolute right-2 top-2'
              onClick={() => remove(asset)}
            >
              <i className='ri-close-line text-2xl text-white' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomAssetManager
