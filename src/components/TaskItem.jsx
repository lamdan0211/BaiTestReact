import { useState } from "react"
import { useProjectsDispatch } from "@/context/ProjectsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, X, Check } from "lucide-react"

export default function TaskItem({ task, projectId }) {
  const dispatch = useProjectsDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(task.name)

  const handleToggle = () => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: { projectId, taskId: task.id },
    })
  }

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: { projectId, taskId: task.id },
    })
  }

  const handleEdit = () => {
    if (editedName.trim() !== task.name) {
      dispatch({
        type: "EDIT_TASK",
        payload: { projectId, taskId: task.id, name: editedName.trim() }
      })
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit()
    }
    if (e.key === "Escape") {
      setEditedName(task.name)
      setIsEditing(false)
    }
  }

  return (
    <li className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors group">
      <div className="flex items-center flex-1 min-w-0">
        <Checkbox 
          id={`task-${task.id}`} 
          checked={task.completed} 
          onCheckedChange={handleToggle}
          className="h-4 w-4"
        />
        {isEditing ? (
          <div className="ml-3 flex-1 flex space-x-2">
            <Input 
              value={editedName} 
              onChange={(e) => setEditedName(e.target.value)} 
              className="h-8 text-sm" 
              autoFocus 
              onBlur={handleEdit} 
              onKeyDown={handleKeyDown}
            />
            <Button size="sm" onClick={handleEdit} className="h-8 px-3">
              <Check className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="h-8 px-3">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={`ml-3 flex-1 text-sm truncate cursor-pointer text-left ${
              task.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {task.name}
          </label>
        )}
      </div>

      {!isEditing && (
        <div className="flex space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsEditing(true)} 
            className="h-7 w-7 p-0"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleDelete}
            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </li>
  )
}
