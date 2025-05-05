import { useState } from "react"
import { useProjectsDispatch } from "@/context/ProjectsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export default function AddProject() {
  const dispatch = useProjectsDispatch()
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      dispatch({
        type: "ADD_PROJECT",
        payload: { name: name.trim(), description: description.trim() }
      })
      setName("")
      setDescription("")
      setIsAdding(false)
    }
  }

  return (
    <div>
      {isAdding ? (
        <div className="space-y-4 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project Name"
                className="w-full bg-transparent border-gray-300"
                required
              />
            </div>
            
            <div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project Description"
                className="w-full bg-transparent border-gray-300"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false)
                  setName("")
                  setDescription("")
                }}
                className="bg-white hover:bg-gray-50 text-black"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-black hover:bg-black/90 text-white">
                Add Project
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full justify-center py-6 bg-black hover:bg-black/90 text-white text-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Project
        </Button>
      )}
    </div>
  )
}
