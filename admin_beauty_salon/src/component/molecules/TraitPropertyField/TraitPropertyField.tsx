import { useEditor } from '@grapesjs/react'
import type { Trait } from 'grapesjs'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait
}

const TraitPropertyField = ({ trait, ...rest }: StylePropertyFieldProps) => {
  const editor = useEditor()
  const handleChange = (value: string) => {
    trait.setValue(value)
  }

  const onChange = (ev: any) => {
    handleChange(ev.target.value)
  }

  const handleButtonClick = () => {
    const command = trait.get('command')
    if (command) {
      typeof command === 'string'
        ? editor.runCommand(command)
        : command(editor, trait)
    }
  }

  const type = trait.getType()
  const defValue = trait.getDefault() || trait.attributes.placeholder
  const value = trait.getValue()
  const valueWithDef = typeof value !== 'undefined' ? value : defValue

  let inputToRender = (
    <TextField
      placeholder={defValue}
      value={value}
      onChange={onChange}
      size='medium'
      fullWidth
      color='error'
    />
  )

  switch (type) {
    case 'select':
      {
        inputToRender = (
          <FormControl fullWidth size='small'>
            <Select value={value} onChange={onChange}>
              {trait.getOptions().map((option) => (
                <MenuItem
                  key={trait.getOptionId(option)}
                  value={trait.getOptionId(option)}
                >
                  {trait.getOptionLabel(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }
      break
    case 'color':
      {
        inputToRender = (
          <TextField
            fullWidth
            placeholder={defValue}
            value={value}
            onChange={onChange}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <div
                    className='h-[15px] w-[15px] rounded border border-primaryColor'
                    style={{ backgroundColor: valueWithDef }}
                  >
                    <input
                      type='color'
                      className='h-[15px] w-[15px] cursor-pointer opacity-0'
                      value={valueWithDef}
                      onChange={(ev) => handleChange(ev.target.value)}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />
        )
      }
      break
    case 'checkbox':
      {
        inputToRender = (
          <Checkbox
            checked={value}
            onChange={(ev) => trait.setValue(ev.target.checked)}
            size='small'
          />
        )
      }
      break
    case 'button':
      {
        inputToRender = (
          <Button fullWidth onClick={handleButtonClick}>
            {trait.getLabel()}
          </Button>
        )
      }
      break
  }

  return (
    <div {...rest} className='mb-3 w-full px-1'>
      <div className='mb-2 flex items-center'>
        <div className='flex-grow capitalize'>{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </div>
  )
}

export default TraitPropertyField
