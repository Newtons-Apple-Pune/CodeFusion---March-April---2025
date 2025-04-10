"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/clerk-react"
import { PlusCircle, ChevronDown, ChevronUp, Globe, Calendar, AlertCircle, Settings, Users } from "lucide-react"
import { THEME_COLORS } from "@/lib/theme"
import { useRole } from "@/hooks/use-role"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Announcements = () => {
  const { user } = useUser()
  const { toast } = useToast()
  const { isAdminOrHR } = useRole()
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null)
  const [showNewAnnouncementDialog, setShowNewAnnouncementDialog] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    category: "Event",
    priority: "Medium"
  })
  
  // Mock announcements data
  const [announcements, setAnnouncements] = useState([
    // ... keep existing code (the announcements array)
  ]);

  const toggleExpand = (id: number) => {
    if (expandedAnnouncement === id) {
      setExpandedAnnouncement(null)
    } else {
      setExpandedAnnouncement(id)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Security":
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      case "HR":
        return <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      case "Event":
        return <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      case "Maintenance":
        return <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
      default:
        return <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
    }
  }

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    
    const announcement = {
      id: Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      category: newAnnouncement.category,
      priority: newAnnouncement.priority,
      date: formattedDate,
      author: user?.fullName ? `${user.fullName}, ${isAdminOrHR() ? "Admin" : "Employee"}` : "Anonymous",
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: "",
      content: "",
      category: "Event",
      priority: "Medium"
    });
    setShowNewAnnouncementDialog(false);

    toast({
      title: "Announcement published",
      description: "Your announcement has been published successfully",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 text-black dark:text-white">
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className={`text-2xl font-bold ${THEME_COLORS.textPrimary} bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400`}>
            Announcements
          </h1>
          {isAdminOrHR() && (
            <Dialog open={showNewAnnouncementDialog} onOpenChange={setShowNewAnnouncementDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 animate-slide-in-right">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} max-w-lg text-black dark:text-white`}>
                <DialogHeader>
                  <DialogTitle className="text-black dark:text-white">Create Announcement</DialogTitle>
                  <DialogDescription className="text-gray-700 dark:text-gray-300">
                    Create a new announcement to share with all employees.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-black dark:text-white">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Announcement title" 
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                      className="bg-white dark:bg-gray-800 text-black dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-black dark:text-white">Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Announcement details..." 
                      rows={5}
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                      className="bg-white dark:bg-gray-800 text-black dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-black dark:text-white">Category</Label>
                      <Select 
                        value={newAnnouncement.category}
                        onValueChange={(value) => setNewAnnouncement({...newAnnouncement, category: value})}
                      >
                        <SelectTrigger id="category" className="bg-white dark:bg-gray-800 text-black dark:text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Security">Security</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-black dark:text-white">Priority</Label>
                      <Select 
                        value={newAnnouncement.priority}
                        onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}
                      >
                        <SelectTrigger id="priority" className="bg-white dark:bg-gray-800 text-black dark:text-white">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewAnnouncementDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={handleAddAnnouncement}
                  >
                    Publish Announcement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="space-y-4 animate-fade-in">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg ${announcement.priority === "Urgent" ? "border-l-4 border-l-red-600 dark:border-l-red-500" : ""}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(announcement.category)}
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{announcement.category}</span>
                    </div>
                    <CardTitle className="mt-2 text-black dark:text-white">{announcement.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {announcement.date} • {announcement.author}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(announcement.id)}
                    aria-label={expandedAnnouncement === announcement.id ? "Collapse" : "Expand"}
                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    {expandedAnnouncement === announcement.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className={`text-gray-700 dark:text-gray-300 ${expandedAnnouncement === announcement.id ? "" : "line-clamp-2"}`}>
                  {announcement.content}
                </p>
              </CardContent>
              {expandedAnnouncement === announcement.id && (
                <CardFooter className="pt-0 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  >
                    Mark as Read
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default Announcements
