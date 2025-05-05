import { useState } from "react"
import { useProjectsDispatch } from "@/context/ProjectsContext"
import TaskList from "@/components/TaskList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, X, Check } from "lucide-react"

export default function ProjectItem({ project, setMoveTaskData }) {
  const dispatch = useProjectsDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(project.name)
  const [editedDescription, setEditedDescription] = useState(project.description)

  const handleEdit = () => {
    if (editedName.trim() !== project.name || editedDescription.trim() !== project.description) {
      dispatch({
        type: "EDIT_PROJECT",
        payload: {
          id: project.id,
          name: editedName.trim(),
          description: editedDescription.trim()
        }
      })
    }
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${project.name}" and all its tasks?`)) {
      dispatch({
        type: "DELETE_PROJECT",
        payload: { id: project.id },
      })
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label htmlFor={`edit-name-${project.id}`} className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id={`edit-name-${project.id}`}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor={`edit-desc-${project.id}`} className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id={`edit-desc-${project.id}`}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleEdit}>
                <Check className="h-4 w-4 mr-1" /> Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{project.name}</CardTitle>
              {project.description && <p className="text-sm text-gray-500 mt-1">{project.description}</p>}
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="pt-4">
          <h3 className="text-sm font-medium mb-2">Tasks</h3>
          <TaskList projectId={project.id} tasks={project.tasks} setMoveTaskData={setMoveTaskData} />
        </div>
      </CardContent>
    </Card>
  )
}
