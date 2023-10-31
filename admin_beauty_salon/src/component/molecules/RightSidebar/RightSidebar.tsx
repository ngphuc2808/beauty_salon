import { useState } from 'react'
import {
  BlocksProvider,
  LayersProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from '@grapesjs/react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import CustomBlockManager from '../CustomBlockManager'
import CustomLayerManager from '../CustomLayerManager'
import CustomSelectorManager from '../CustomSelectorManager'
import CustomStyleManager from '../CustomStyleManager'
import CustomTraitManager from '../CustomTraitManager'

const defaultTabProps = {
  className: '!min-w-0',
}

const RightSidebar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className={`gjs-right-sidebar flex flex-col ${className}`}>
      <Tabs
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
        variant='fullWidth'
        className='flex items-center'
        TabIndicatorProps={{
          style: {
            backgroundColor: '#f87171',
          },
        }}
        style={{
          minHeight: '64px',
        }}
      >
        <Tab
          {...defaultTabProps}
          label={
            <i className='ri-brush-fill h-full w-full text-xl text-primaryColor hover:text-secondColor'></i>
          }
        />
        <Tab
          {...defaultTabProps}
          label={
            <i className='ri-settings-3-fill h-full w-full text-xl text-primaryColor hover:text-secondColor'></i>
          }
        />
        <Tab
          {...defaultTabProps}
          label={
            <i className='ri-stack-fill h-full w-full text-xl text-primaryColor hover:text-secondColor'></i>
          }
        />
        <Tab
          {...defaultTabProps}
          label={
            <i className='ri-grid-fill h-full w-full text-xl text-primaryColor hover:text-secondColor'></i>
          }
        />
      </Tabs>
      <div className='flex-grow overflow-y-auto border-t border-primaryColor'>
        {selectedTab === 0 && (
          <>
            <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {(props) => <CustomStyleManager {...props} />}
            </StylesProvider>
          </>
        )}
        {selectedTab === 1 && (
          <TraitsProvider>
            {(props) => <CustomTraitManager {...props} />}
          </TraitsProvider>
        )}
        {selectedTab === 2 && (
          <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        )}
        {selectedTab === 3 && (
          <BlocksProvider>
            {(props) => <CustomBlockManager {...props} />}
          </BlocksProvider>
        )}
      </div>
    </div>
  )
}

export default RightSidebar
