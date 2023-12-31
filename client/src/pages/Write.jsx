import { useRef, useState } from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import Publish from "../components/Publish";
import Submitbar from "../components/layout/Submitbar";
import MoonLoader from "../components/common/MoonLoader";
const Write = () => {
  
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [publishMode, setPublishMode] = useState(false);
  const editorRef = useRef(null);

  if (publishMode) {
    return (
      <Publish
        content={editorRef.current ? editorRef.current.getContent() : ""}
        setPublishMode={setPublishMode}
      ></Publish>
    );
  } else {
    return (
      <>
        {!editorLoaded && <MoonLoader />}
        <Submitbar
          color={"transparent"}
          action="submit"
          bordered={false}
          setPublishMode={setPublishMode}
        >
          {" "}
        </Submitbar>
        <div className="px-6 py-4 lg:px-28">
          <MarkdownEditor
            editorRef={editorRef}
            setEditorLoaded={setEditorLoaded}
          ></MarkdownEditor>
        </div>
      </>
    );
  }
};

export default Write;
