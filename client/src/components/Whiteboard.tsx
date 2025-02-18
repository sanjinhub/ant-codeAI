
import React, {useState} from "react";
import { FaHourglass } from "react-icons/fa";
import { Excalidraw, exportToCanvas } from "@excalidraw/excalidraw";
import { Cross2Icon } from "@radix-ui/react-icons"


interface Props {
    doCreate: (urls: string[]) => void;
    closeWhiteboardDialog: () => void;
}

const initialData = {
    appState: {}
};

function Whiteboard({doCreate, closeWhiteboardDialog}: Props) {

  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  
  const exportImg = async () => {
      if (!excalidrawAPI) {
        return
      }
      const elements = (excalidrawAPI as any).getSceneElements();
      if (!elements || !elements.length) {
        return
      }
      const canvas = await exportToCanvas({
        elements,
        appState: {
          ...initialData.appState,
          exportWithDarkMode: false,
        },
        files: (excalidrawAPI as any).getFiles(),
        getDimensions: () => { return {width: 750, height: 750}}
      });
      doCreate([canvas.toDataURL()])
      closeWhiteboardDialog();
    }

  return (
      <div className="fixed top-0 z-[1000] w-full h-full">
          <Excalidraw   
              renderTopRightUI={() => (
                  <>
                    <FaHourglass  
                        className="mt-[10px]"
                        onClick={exportImg}
                    />
                    <span 
                        onClick={() => {
                          closeWhiteboardDialog();
                        }}
                        className="absolute right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <Cross2Icon />
                    </span>
                  </>
              )}
              // @ts-ignore
              excalidrawAPI={(api) => setExcalidrawAPI(api)}/>
      </div>
  );
}

export default Whiteboard;