import * as React from "react";
import {
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from "@grapesjs/react";
import {
  mdiBrush,
  mdiLayers,
  mdiViewGridPlus,
  mdiTextBoxMultiple,
  mdiCog,
} from "@mdi/js";
import Icon from "@mdi/react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import CustomBlockManager from "./CustomBlockManager";
import { cx } from "./common";
import CustomPageManager from "./CustomPageManager";
import CustomLayerManager from "./CustomLayerManager";
import CustomSelectorManager from "./CustomSelectorManager";
import CustomStyleManager from "./CustomStyleManager";
import CustomTraitManager from "./CustomTraitManager";

const defaultTabProps = {
  className: "!min-w-0",
};

export default function RightSidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={cx("gjs-right-sidebar flex flex-col", className)}>
      <Tabs
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
        variant="fullWidth"
        className="flex items-center"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#f87171",
          },
        }}
        style={{
          minHeight: "64px",
        }}
      >
        <Tab
          {...defaultTabProps}
          label={
            <Icon
              size={1}
              path={mdiBrush}
              className="text-red-400 hover:text-red-500"
            />
          }
        />
        <Tab
          {...defaultTabProps}
          label={
            <Icon
              size={1}
              path={mdiCog}
              className="text-red-400 hover:text-red-500"
            />
          }
        />
        <Tab
          {...defaultTabProps}
          label={
            <Icon
              size={1}
              path={mdiLayers}
              className="text-red-400 hover:text-red-500"
            />
          }
        />
        <Tab
          {...defaultTabProps}
          label={
            <Icon
              size={1}
              path={mdiViewGridPlus}
              className="text-red-400 hover:text-red-500"
            />
          }
        />
      </Tabs>
      <div className={cx("overflow-y-auto flex-grow border-t border-red-400")}>
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
  );
}
