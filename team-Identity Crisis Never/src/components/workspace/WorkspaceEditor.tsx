"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRole } from "@/hooks/use-role"
import { Plus, Trash2, Save, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { THEME_COLORS } from "@/lib/theme"

// Workspace item types
type ItemType = "desk" | "meeting-room" | "breakout" | "utilities"

interface WorkspaceItem {
  id: string
  type: ItemType
  label: string
  x: number
  y: number
  width: number
  height: number
  status: "available" | "booked" | "maintenance"
  capacity?: number
}

// Sample initial workspace layout
const initialWorkspaceItems: WorkspaceItem[] = [
  { id: "desk-1", type: "desk", label: "1", status: "available", x: 10, y: 10, width: 40, height: 40 },
  { id: "desk-2", type: "desk", label: "2", status: "available", x: 70, y: 10, width: 40, height: 40 },
  { id: "desk-3", type: "desk", label: "3", status: "booked", x: 130, y: 10, width: 40, height: 40 },
  { id: "desk-4", type: "desk", label: "4", status: "available", x: 190, y: 10, width: 40, height: 40 },
  {
    id: "room-1",
    type: "meeting-room",
    label: "Apollo",
    status: "available",
    x: 10,
    y: 120,
    width: 100,
    height: 80,
    capacity: 4,
  },
  {
    id: "room-2",
    type: "meeting-room",
    label: "Artemis",
    status: "booked",
    x: 130,
    y: 120,
    width: 100,
    height: 80,
    capacity: 8,
  },
  { id: "breakout-1", type: "breakout", label: "Lounge", status: "available", x: 250, y: 10, width: 80, height: 60 },
  { id: "utility-1", type: "utilities", label: "Printer", status: "available", x: 250, y: 120, width: 40, height: 40 },
]

// Create a global storage for workspace items to share between components
// In a real app, this would be saved to a database and shared via a context or state management library
const globalWorkspaceItems = {
  items: [...initialWorkspaceItems],
}

const WorkspaceEditor = () => {
  const { toast } = useToast()
  const { permissions, isAdminOrHR } = useRole()
  const [workspaceItems, setWorkspaceItems] = useState<WorkspaceItem[]>(globalWorkspaceItems.items)
  const [selectedItem, setSelectedItem] = useState<WorkspaceItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [showItemForm, setShowItemForm] = useState(false)
  const [newItem, setNewItem] = useState<Partial<WorkspaceItem>>({
    type: "desk",
    label: "",
    status: "available",
    width: 40,
    height: 40,
  })

  // Load current layout on mount
  useEffect(() => {
    setWorkspaceItems(globalWorkspaceItems.items)
  }, [])

  const handleItemClick = (item: WorkspaceItem) => {
    setSelectedItem(item)
  }

  const handleDeleteItem = (id: string) => {
    setWorkspaceItems((prev) => prev.filter((item) => item.id !== id))
    setSelectedItem(null)
    toast({
      title: "Item Deleted",
      description: "Workspace item has been removed from the layout",
    })
  }

  const handleDragStart = (id: string) => {
    if (!isEditing) return
    setDraggedItem(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    if (!isEditing || !draggedItem) return
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    if (!isEditing || !draggedItem) return
    e.preventDefault()

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setWorkspaceItems((prev) =>
      prev.map((item) => {
        if (item.id === draggedItem) {
          return { ...item, x, y }
        }
        return item
      }),
    )

    setDraggedItem(null)
  }

  const handleAddItem = () => {
    if (!newItem.label) {
      toast({
        title: "Validation Error",
        description: "Please enter a label for the new item",
        variant: "destructive",
      })
      return
    }

    const newId = `${newItem.type}-${Date.now()}`
    const newWorkspaceItem: WorkspaceItem = {
      id: newId,
      type: newItem.type as ItemType,
      label: newItem.label,
      status: "available",
      x: 50,
      y: 50,
      width: newItem.width || 40,
      height: newItem.height || 40,
      ...(newItem.type === "meeting-room" && { capacity: newItem.capacity || 4 }),
    }

    setWorkspaceItems((prev) => [...prev, newWorkspaceItem])
    setShowItemForm(false)
    setNewItem({
      type: "desk",
      label: "",
      status: "available",
      width: 40,
      height: 40,
    })

    toast({
      title: "Item Added",
      description: `New ${newItem.type} has been added to the workspace`,
    })
  }

  const handleSaveLayout = () => {
    // Update the global workspace items
    globalWorkspaceItems.items = [...workspaceItems]

    // In a real app, this would save to a database
    toast({
      title: "Layout Saved",
      description: "Your workspace layout has been saved successfully",
      variant: "default", // Ensure this is set for visibility
    })
    setIsEditing(false)
  }

  const getItemStyle = (item: WorkspaceItem) => {
    let baseStyle = "absolute border-2 flex items-center justify-center transition-all duration-300 shadow-sm"
    let colorStyle = ""

    switch (item.status) {
      case "available":
        colorStyle = "border-green-500 bg-green-50 text-green-800 dark:border-green-600 dark:bg-green-900/40 dark:text-green-300"
        break
      case "booked":
        colorStyle = "border-red-500 bg-red-50 text-red-800 dark:border-red-600 dark:bg-red-900/40 dark:text-red-300"
        break
      case "maintenance":
        colorStyle = "border-yellow-500 bg-yellow-50 text-yellow-800 dark:border-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300"
        break
    }

    // Add selected style
    if (selectedItem?.id === item.id) {
      colorStyle += " ring-2 ring-blue-500 z-10"
    }

    // Add drag style
    if (isEditing) {
      baseStyle += " cursor-move hover:shadow-md"
    }

    return `${baseStyle} ${colorStyle}`
  }

  const renderItem = (item: WorkspaceItem) => {
    return (
      <div
        key={item.id}
        id={item.id}
        className={getItemStyle(item)}
        style={{
          left: `${item.x}px`,
          top: `${item.y}px`,
          width: `${item.width}px`,
          height: `${item.height}px`,
        }}
        onClick={() => handleItemClick(item)}
        draggable={isEditing}
        onDragStart={() => handleDragStart(item.id)}
      >
        <div className="text-center">
          <div className="font-medium">{item.label}</div>
          {item.type === "meeting-room" && <div className="text-xs">Capacity: {item.capacity}</div>}
        </div>
      </div>
    )
  }

  return (
    <Card
      className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg animate-fade-in`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={THEME_COLORS.textPrimary}>Workspace Layout Editor</CardTitle>
            <CardDescription className={THEME_COLORS.textSecondary}>Customize your office layout</CardDescription>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <Button
                onClick={handleSaveLayout}
                className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Layout
              </Button>
            ) : (
              isAdminOrHR() && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="flex items-center border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Layout
                </Button>
              )
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Workspace Layout Canvas */}
          <div
            className="relative border border-blue-200/60 dark:border-blue-900/60 rounded-lg p-4 bg-white dark:bg-gray-800 overflow-auto h-[500px] w-full md:w-3/4 flex-grow shadow-inner"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Office boundaries */}
            <div className="absolute inset-0 border-2 border-blue-300/60 dark:border-blue-700/60 rounded-lg"></div>

            {/* Door */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 border-2 border-blue-400 dark:border-blue-600"></div>

            {/* Workspace Items */}
            {workspaceItems.map((item) => renderItem(item))}
          </div>

          {/* Controls Panel */}
          <div className="w-full md:w-1/4 flex-shrink-0 space-y-4">
            {isEditing && (
              <Card
                className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-md animate-slide-in-right`}
              >
                <CardHeader className="py-3">
                  <CardTitle className={`text-base ${THEME_COLORS.textPrimary}`}>Add New Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog open={showItemForm} onOpenChange={setShowItemForm}>
                    <DialogTrigger asChild>
                      <Button className="w-full flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow}`}
                    >
                      <DialogHeader>
                        <DialogTitle className={THEME_COLORS.textPrimary}>Add Workspace Item</DialogTitle>
                        <DialogDescription className={THEME_COLORS.textSecondary}>
                          Create a new item for your workspace layout.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="item-type" className={THEME_COLORS.textSecondary}>
                            Item Type
                          </Label>
                          <select
                            id="item-type"
                            className={`w-full p-2 border ${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText} rounded-md focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                            value={newItem.type}
                            onChange={(e) => setNewItem({ ...newItem, type: e.target.value as ItemType })}
                          >
                            <option value="desk">Desk</option>
                            <option value="meeting-room">Meeting Room</option>
                            <option value="breakout">Breakout Area</option>
                            <option value="utilities">Utilities (Printer, etc.)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="item-label" className={THEME_COLORS.textSecondary}>
                            Label
                          </Label>
                          <Input
                            id="item-label"
                            placeholder="e.g. Desk 5 or Meeting Room A"
                            value={newItem.label}
                            onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                            className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText} focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="item-width" className={THEME_COLORS.textSecondary}>
                              Width (px)
                            </Label>
                            <Input
                              id="item-width"
                              type="number"
                              value={newItem.width}
                              onChange={(e) => setNewItem({ ...newItem, width: Number.parseInt(e.target.value) })}
                              className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText} focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="item-height" className={THEME_COLORS.textSecondary}>
                              Height (px)
                            </Label>
                            <Input
                              id="item-height"
                              type="number"
                              value={newItem.height}
                              onChange={(e) => setNewItem({ ...newItem, height: Number.parseInt(e.target.value) })}
                              className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText} focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                            />
                          </div>
                        </div>

                        {newItem.type === "meeting-room" && (
                          <div className="space-y-2">
                            <Label htmlFor="item-capacity" className={THEME_COLORS.textSecondary}>
                              Capacity
                            </Label>
                            <Input
                              id="item-capacity"
                              type="number"
                              value={newItem.capacity || 4}
                              onChange={(e) => setNewItem({ ...newItem, capacity: Number.parseInt(e.target.value) })}
                              className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText} focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
                            />
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowItemForm(false)}
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleAddItem}
                          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                        >
                          Add Item
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}

            {/* Selected Item Details */}
            {selectedItem && (
              <Card
                className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-md animate-slide-in-right`}
              >
                <CardHeader className="py-3">
                  <CardTitle className={`text-base ${THEME_COLORS.textPrimary}`}>Selected Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className={`font-medium ${THEME_COLORS.textSecondary}`}>Type:</span>{" "}
                    <span className={THEME_COLORS.textPrimary}>{selectedItem.type}</span>
                  </div>
                  <div>
                    <span className={`font-medium ${THEME_COLORS.textSecondary}`}>Label:</span>{" "}
                    <span className={THEME_COLORS.textPrimary}>{selectedItem.label}</span>
                  </div>
                  <div>
                    <span className={`font-medium ${THEME_COLORS.textSecondary}`}>Status:</span>{" "}
                    <span className={THEME_COLORS.textPrimary}>{selectedItem.status}</span>
                  </div>
                  {selectedItem.type === "meeting-room" && (
                    <div>
                      <span className={`font-medium ${THEME_COLORS.textSecondary}`}>Capacity:</span>{" "}
                      <span className={THEME_COLORS.textPrimary}>{selectedItem.capacity}</span>
                    </div>
                  )}
                  <div>
                    <span className={`font-medium ${THEME_COLORS.textSecondary}`}>Position:</span>{" "}
                    <span className={THEME_COLORS.textPrimary}>
                      X: {Math.round(selectedItem.x)}, Y: {Math.round(selectedItem.y)}
                    </span>
                  </div>
                  <div>
                    <span className={`font-medium ${THEME_COLORS.textSecondary}`}>Size:</span>{" "}
                    <span className={THEME_COLORS.textPrimary}>
                      {selectedItem.width} x {selectedItem.height}
                    </span>
                  </div>

                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteItem(selectedItem.id)}
                      className="mt-2 w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Item
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-md animate-slide-in-right`}
            >
              <CardHeader className="py-3">
                <CardTitle className={`text-base ${THEME_COLORS.textPrimary}`}>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${THEME_COLORS.textSecondary}`}>
                  {isEditing
                    ? "Drag items to reposition them. Click on an item to select it and view details."
                    : isAdminOrHR() 
                      ? "Click the 'Edit Layout' button to customize your workspace layout."
                      : "Only admins and HR can edit the workspace layout. You can view the current layout and select items to see details."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-600 mr-2"></div>
            <span className={`text-sm ${THEME_COLORS.textPrimary}`}>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 dark:bg-red-600 mr-2"></div>
            <span className={`text-sm ${THEME_COLORS.textPrimary}`}>Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 dark:bg-yellow-600 mr-2"></div>
            <span className={`text-sm ${THEME_COLORS.textPrimary}`}>Maintenance</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

// Export the global workspace items so other components can access it
export { globalWorkspaceItems }
export default WorkspaceEditor