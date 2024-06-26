import { useEditor } from '@grapesjs/react'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from 'grapesjs'

import Button from '@/component/atoms/Button'

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property
}
const StylePropertyField = ({ prop, ...rest }: StylePropertyFieldProps) => {
  const editor = useEditor()
  const handleChange = (value: string) => {
    prop.upValue(value)
  }

  const onChange = (ev: any) => {
    handleChange(ev.target.value)
  }

  const openAssets = () => {
    const { Assets } = editor
    Assets.open({
      select: (asset, complete) => {
        console.log({ complete })
        prop.upValue(asset.getSrc(), { partial: !complete })
        complete && Assets.close()
      },
      types: ['image'],
      accept: 'image/*',
    })
  }

  const type = prop.getType()
  const defValue = prop.getDefaultValue()
  const canClear = prop.canClear()
  const hasValue = prop.hasValue()
  const value = prop.getValue()
  const valueString = hasValue ? value : ''
  const valueWithDef = hasValue ? value : defValue

  let inputToRender = (
    <TextField
      placeholder={defValue}
      value={valueString}
      onChange={onChange}
      size='small'
      fullWidth
    />
  )

  switch (type) {
    case 'radio':
      {
        const radioProp = prop as PropertyRadio
        inputToRender = (
          <RadioGroup value={value} onChange={onChange} row>
            {radioProp.getOptions().map((option) => (
              <FormControlLabel
                key={radioProp.getOptionId(option)}
                value={radioProp.getOptionId(option)}
                label={radioProp.getOptionLabel(option)}
                control={<Radio size='small' />}
              />
            ))}
          </RadioGroup>
        )
      }
      break
    case 'select':
      {
        const selectProp = prop as PropertySelect
        inputToRender = (
          <FormControl fullWidth size='small'>
            <Select value={value} onChange={onChange}>
              {selectProp.getOptions().map((option) => (
                <MenuItem
                  key={selectProp.getOptionId(option)}
                  value={selectProp.getOptionId(option)}
                >
                  {selectProp.getOptionLabel(option)}
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
            value={valueString}
            onChange={onChange}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <div
                    className={`h-[15px] w-[15px] rounded border border-primaryColor`}
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
    case 'slider':
      {
        const sliderProp = prop as PropertySlider
        inputToRender = (
          <Slider
            size='small'
            value={parseFloat(value)}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onChange={onChange}
            valueLabelDisplay='auto'
          />
        )
      }
      break
    case 'file':
      {
        inputToRender = (
          <div className='flex flex-col items-center gap-3'>
            {value && value !== defValue && (
              <div
                className='inline-block h-[50px] w-[50px] cursor-pointer rounded bg-cover bg-center'
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange('')}
              />
            )}
            <Button
              onClick={openAssets}
              className='w-full rounded border px-2 py-1'
            >
              Select Image
            </Button>
          </div>
        )
      }
      break
    case 'composite':
      {
        const compositeProp = prop as PropertyComposite
        inputToRender = (
          <div className='flex flex-wrap rounded border border-primaryColor bg-white p-2'>
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        )
      }
      break
    case 'stack':
      {
        const stackProp = prop as PropertyStack
        const layers = stackProp.getLayers()
        const isTextShadow = stackProp.getName() === 'text-shadow'
        inputToRender = (
          <div className='flex min-h-[54px] flex-col gap-2 rounded border border-primaryColor bg-white p-2'>
            {layers.map((layer) => (
              <div
                key={layer.getId()}
                className='rounded border border-primaryColor'
              >
                <div className='flex items-center gap-1 bg-red-200 px-2 py-1'>
                  <IconButton
                    size='small'
                    onClick={() => layer.move(layer.getIndex() - 1)}
                  >
                    <i className='ri-arrow-up-circle-line text-xl'></i>
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() => layer.move(layer.getIndex() + 1)}
                  >
                    <i className='ri-arrow-down-circle-line text-xl'></i>
                  </IconButton>
                  <Button className='flex-grow' onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </Button>
                  <div
                    className='flex min-h-[17px] min-w-[17px] justify-center rounded border border-primaryColor bg-black text-sm text-white'
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && 'T'}
                  </div>
                  <IconButton size='small' onClick={() => layer.remove()}>
                    <i className='ri-delete-bin-6-line text-xl'></i>
                  </IconButton>
                </div>
                {layer.isSelected() && (
                  <div className='flex flex-wrap p-2'>
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }
      break
  }

  return (
    <div
      {...rest}
      className={`mb-3 px-1 ${prop.isFull() ? 'w-full' : 'w-1/2'}`}
    >
      <div
        className={`mb-2 flex items-center ${
          canClear && 'text-textHeadingColor'
        }`}
      >
        <div className='flex-grow capitalize'>{prop.getLabel()}</div>
        {canClear && (
          <Button onClick={() => prop.clear()}>
            <i className='ri-close-line text-xl'></i>
          </Button>
        )}
        {type === 'stack' && (
          <IconButton
            size='small'
            className='!ml-2'
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <i className='ri-add-line text-xl'></i>
          </IconButton>
        )}
      </div>
      {inputToRender}
    </div>
  )
}

export default StylePropertyField
