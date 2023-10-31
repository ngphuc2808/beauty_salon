import { SelectorsResultProps } from '@grapesjs/react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import Button from '@/component/atoms/Button'

const CustomSelectorManager = ({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, 'Container'>) => {
  const addNewSelector = () => {
    const next = selectors.length + 1
    addSelector({ name: `new-${next}`, label: `New ${next}` })
  }

  const targetStr = targets.join(', ')

  return (
    <div className='gjs-custom-selector-manager flex flex-col gap-2 p-2 text-left'>
      <div className='flex items-center'>
        <div className='flex-grow'>Selectors</div>
        <FormControl size='small'>
          <Select
            value={selectedState}
            onChange={(ev) => setState(ev.target.value)}
            displayEmpty
          >
            <MenuItem value=''>- State -</MenuItem>
            {states.map((state) => (
              <MenuItem value={state.id} key={state.id}>
                {state.getName()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='flex min-h-[64px] flex-wrap items-center gap-2 rounded border border-primaryColor bg-white p-2'>
        {targetStr ? (
          <Button onClick={addNewSelector} className='rounded border px-2 py-1'>
            <i className='ri-add-line text-2xl text-textHeadingColor' />
          </Button>
        ) : (
          <div className='opacity-70'>Select a component</div>
        )}
        {selectors.map((selector) => (
          <div
            key={selector.toString()}
            className='flex items-center gap-1 whitespace-nowrap rounded px-2 py-1'
          >
            <div>{selector.getLabel()}</div>
            <Button onClick={() => removeSelector(selector)}>
              <i className='ri-close-line text-2xl text-textHeadingColor' />
            </Button>
          </div>
        ))}
      </div>
      <div>
        Selected: <span className='opacity-70'>{targetStr || 'None'}</span>
      </div>
    </div>
  )
}

export default CustomSelectorManager
