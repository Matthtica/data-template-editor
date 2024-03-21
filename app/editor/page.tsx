import NovelEditor from "@/components/editor";
import Tiptap from "@/components/tiptap/tiptap";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  return <div className="flex flex-col h-screen">
    <Tiptap />
    <div className="m-3 mt-0 flex justify-end">
      <Button>Save</Button>
    </div>
  </div>
}
