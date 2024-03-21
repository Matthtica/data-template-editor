import ModeToggle from "@/components/custom/mode-toggle"
import NovelEditor from "@/components/editor"
import { Button } from "@/components/ui/button"

export default function Home() {
  return <div className="mx-auto max-w-[40rem] flex flex-col">
    <div className="p-2 flex justify-between">
      <ModeToggle variant="ghost" />
      <Button>New Template</Button>
    </div>
    <h1 className="text-2xl font-bold m-3">List of template</h1>
    <div className="border border-input rounded-md shadow-md min-h-40">
    </div>
  </div>
}
