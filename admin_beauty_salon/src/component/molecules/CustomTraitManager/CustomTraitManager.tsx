import { TraitsResultProps } from '@grapesjs/react'

import TraitPropertyField from '../TraitPropertyField'

const CustomTraitManager = ({
  traits,
}: Omit<TraitsResultProps, 'Container'>) => {
  return (
    <div className='gjs-custom-style-manager mt-3 p-1 text-left'>
      {!traits.length ? (
        <div>No properties available</div>
      ) : (
        traits.map((trait) => (
          <TraitPropertyField key={trait.getId()} trait={trait} />
        ))
      )}
    </div>
  )
}

export default CustomTraitManager
