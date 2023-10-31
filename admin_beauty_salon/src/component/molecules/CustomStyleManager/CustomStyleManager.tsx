import { StylesResultProps } from '@grapesjs/react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import StylePropertyField from '../StylePropertyField'

const accordionIcon = (
  <i className='ri-arrow-drop-down-fill text-2xl text-white'></i>
)

const CustomStyleManager = ({
  sectors,
}: Omit<StylesResultProps, 'Container'>) => {
  return (
    <div className='gjs-custom-style-manager text-left'>
      {sectors.map((sector) => (
        <Accordion key={sector.getId()} disableGutters>
          <AccordionSummary
            className='!bg-primaryColor'
            expandIcon={accordionIcon}
          >
            <p className='text-white'>{sector.getName()}</p>
          </AccordionSummary>
          <AccordionDetails className={`flex flex-wrap`}>
            {sector.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default CustomStyleManager
