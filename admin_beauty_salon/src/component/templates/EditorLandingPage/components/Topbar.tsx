import { Link, useNavigate } from "react-router-dom";
import { DevicesProvider, WithEditor } from "@grapesjs/react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { cx } from "./common";
import TopbarButtons from "./TopbarButtons";
import { useGlobalContext } from "@/contexts/globalContext";

export default function Topbar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useNavigate();

  const { setProjectData } = useGlobalContext();

  const handleSaveContent = () => {
    setProjectData({
      projectData: JSON.stringify((window as any).editor.getProjectData()),
      html: (window as any).editor.getHtml(),
      css: (window as any).editor.getCss(),
    });
    router(-1);
  };

  return (
    <div
      className={cx(
        "gjs-top-sidebar flex items-center justify-between p-1",
        className
      )}
    >
      <div className="flex items-center">
        <Link to={"/danh-muc-cap-1"} className="w-[90px] h-full">
          <figure>
            <img src="../../logoText.png" />
          </figure>
        </Link>
      </div>
      <div className="flex items-center">
        <DevicesProvider>
          {({ selected, select, devices }) => (
            <FormControl size="small">
              <Select
                value={selected}
                onChange={(ev) => select(ev.target.value)}
              >
                {devices.map((device) => (
                  <MenuItem value={device.id} key={device.id}>
                    {device.getName()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DevicesProvider>
        <WithEditor>
          <TopbarButtons className="ml-auto px-2" />
        </WithEditor>
        <div className="flex gap-2">
          <button
            className="min-w-[88px] text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md"
            onClick={handleSaveContent}
          >
            Lưu trang
          </button>
          <button
            onClick={() => router(-1)}
            className="min-w-[88px] text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
