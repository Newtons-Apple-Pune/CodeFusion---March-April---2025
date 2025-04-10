"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/clerk-react"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  FilePlus,
  Users,
  ClipboardList
} from "lucide-react"
import { THEME_COLORS } from "@/lib/theme"
import { useRole } from "@/hooks/use-role"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Types for projects and tasks
type Project = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "On Hold";
  progress: number;
  priority: "Low" | "Medium" | "High" | "Urgent";
  assignedTo: string[];
  tasks: Task[];
  lead: string;
};

type Task = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  dueDate: string;
  status: "To Do" | "In Progress" | "Under Review" | "Completed";
  assignedTo: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
};

const Projects = () => {
  const { user } = useUser()
  const { toast } = useToast()
  const { isAdminOrHR } = useRole()
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Initial project data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesign the company website to improve user experience and conversion rates",
      startDate: "2023-06-01",
      endDate: "2023-08-30",
      status: "In Progress",
      progress: 65,
      priority: "High",
      assignedTo: ["Sarah Johnson", "Mike Williams", "Alex Chen"],
      lead: "Sarah Johnson",
      tasks: [
        {
          id: 101,
          projectId: 1,
          title: "Design homepage mockup",
          description: "Create a mockup design for the new homepage",
          dueDate: "2023-06-15",
          status: "Completed",
          assignedTo: "Sarah Johnson",
          priority: "High",
        },
        {
          id: 102,
          projectId: 1,
          title: "Develop responsive layout",
          description: "Implement the responsive design for different screen sizes",
          dueDate: "2023-07-15",
          status: "In Progress",
          assignedTo: "Mike Williams",
          priority: "Medium",
        },
        {
          id: 103,
          projectId: 1,
          title: "Content migration",
          description: "Migrate existing content to the new website structure",
          dueDate: "2023-08-01",
          status: "To Do",
          assignedTo: "Alex Chen",
          priority: "Medium",
        },
      ],
    },
    {
      id: 2,
      name: "HR Management System",
      description: "Develop an internal HR management system for employee records and performance tracking",
      startDate: "2023-05-15",
      endDate: "2023-11-30",
      status: "In Progress",
      progress: 40,
      priority: "Medium",
      assignedTo: ["David Smith", "Jessica Brown", "Ryan Taylor"],
      lead: "David Smith",
      tasks: [
        {
          id: 201,
          projectId: 2,
          title: "Database schema design",
          description: "Design the database schema for employee records",
          dueDate: "2023-06-01",
          status: "Completed",
          assignedTo: "David Smith",
          priority: "High",
        },
        {
          id: 202,
          projectId: 2,
          title: "User authentication system",
          description: "Implement secure user authentication for the HR system",
          dueDate: "2023-07-01",
          status: "In Progress",
          assignedTo: "Jessica Brown",
          priority: "High",
        },
        {
          id: 203,
          projectId: 2,
          title: "Performance review module",
          description: "Develop the performance review tracking module",
          dueDate: "2023-08-15",
          status: "To Do",
          assignedTo: "Ryan Taylor",
          priority: "Medium",
        },
      ],
    },
  ]);

  // New project form state
  const [newProject, setNewProject] = useState<Omit<Project, "id" | "tasks" | "progress">>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
    priority: "Medium",
    assignedTo: [],
    lead: "",
  });

  // New task form state
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "projectId">>({
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
    assignedTo: "",
    priority: "Medium",
  });

  const toggleExpand = (id: number) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      case "To Do":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "Under Review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-yellow-500";
    if (progress < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.description || !newProject.startDate || !newProject.endDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const project: Project = {
      id: Date.now(),
      ...newProject,
      progress: 0,
      tasks: [],
    };

    setProjects([...projects, project]);
    setNewProject({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Not Started",
      priority: "Medium",
      assignedTo: [],
      lead: "",
    });
    setShowNewProjectDialog(false);

    toast({
      title: "Project created",
      description: "New project has been created successfully",
    });
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate || !selectedProjectId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now(),
      projectId: selectedProjectId,
      ...newTask,
    };

    setProjects(
      projects.map((project) => {
        if (project.id === selectedProjectId) {
          const updatedTasks = [...project.tasks, task];
          // Update progress based on completed tasks
          const completedTasks = updatedTasks.filter((t) => t.status === "Completed").length;
          const progress = Math.round((completedTasks / updatedTasks.length) * 100);
          
          return {
            ...project,
            tasks: updatedTasks,
            progress,
          };
        }
        return project;
      })
    );

    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      status: "To Do",
      assignedTo: "",
      priority: "Medium",
    });
    setShowNewTaskDialog(false);
    setSelectedProjectId(null);

    toast({
      title: "Task added",
      description: "New task has been added to the project",
    });
  };

  const openNewTaskDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    setShowNewTaskDialog(true);
  };

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.status.toLowerCase() === activeTab);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 animate-fade-in">
          <div>
            <h1 className={`text-2xl font-bold ${THEME_COLORS.textPrimary} bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400`}>
              Projects & Tasks
            </h1>
            <p className={THEME_COLORS.textSecondary}>Manage your team's projects and tasks</p>
          </div>
          
          {isAdminOrHR() && (
            <div className="flex space-x-3">
              <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} max-w-lg`}>
                  <DialogHeader>
                    <DialogTitle className={THEME_COLORS.textPrimary}>Create New Task</DialogTitle>
                    <DialogDescription className={THEME_COLORS.textSecondary}>
                      Add a new task to a project
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-select" className={THEME_COLORS.textSecondary}>Project</Label>
                      <Select 
                        value={selectedProjectId?.toString() || ""}
                        onValueChange={(value) => setSelectedProjectId(Number(value))}
                      >
                        <SelectTrigger id="project-select" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-title" className={THEME_COLORS.textSecondary}>Task Title</Label>
                      <Input 
                        id="task-title" 
                        placeholder="Task title" 
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-description" className={THEME_COLORS.textSecondary}>Description</Label>
                      <Textarea 
                        id="task-description" 
                        placeholder="Task description..." 
                        rows={3}
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-due-date" className={THEME_COLORS.textSecondary}>Due Date</Label>
                        <Input 
                          id="task-due-date" 
                          type="date" 
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="task-status" className={THEME_COLORS.textSecondary}>Status</Label>
                        <Select 
                          value={newTask.status}
                          onValueChange={(value: "To Do" | "In Progress" | "Under Review" | "Completed") => 
                            setNewTask({...newTask, status: value})}
                        >
                          <SelectTrigger id="task-status" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-assigned" className={THEME_COLORS.textSecondary}>Assigned To</Label>
                        <Input 
                          id="task-assigned" 
                          placeholder="Team member name" 
                          value={newTask.assignedTo}
                          onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="task-priority" className={THEME_COLORS.textSecondary}>Priority</Label>
                        <Select 
                          value={newTask.priority}
                          onValueChange={(value: "Low" | "Medium" | "High" | "Urgent") => 
                            setNewTask({...newTask, priority: value})}
                        >
                          <SelectTrigger id="task-priority" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
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
                    <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      onClick={handleAddTask}
                    >
                      Add Task
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} max-w-lg`}>
                  <DialogHeader>
                    <DialogTitle className={THEME_COLORS.textPrimary}>Create New Project</DialogTitle>
                    <DialogDescription className={THEME_COLORS.textSecondary}>
                      Add a new project for your team
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name" className={THEME_COLORS.textSecondary}>Project Name</Label>
                      <Input 
                        id="project-name" 
                        placeholder="Project name" 
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description" className={THEME_COLORS.textSecondary}>Description</Label>
                      <Textarea 
                        id="project-description" 
                        placeholder="Project description..." 
                        rows={3}
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-start-date" className={THEME_COLORS.textSecondary}>Start Date</Label>
                        <Input 
                          id="project-start-date" 
                          type="date" 
                          value={newProject.startDate}
                          onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-end-date" className={THEME_COLORS.textSecondary}>End Date</Label>
                        <Input 
                          id="project-end-date" 
                          type="date" 
                          value={newProject.endDate}
                          onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-status" className={THEME_COLORS.textSecondary}>Status</Label>
                        <Select 
                          value={newProject.status}
                          onValueChange={(value: "Not Started" | "In Progress" | "Completed" | "On Hold") => 
                            setNewProject({...newProject, status: value})}
                        >
                          <SelectTrigger id="project-status" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not Started">Not Started</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-priority" className={THEME_COLORS.textSecondary}>Priority</Label>
                        <Select 
                          value={newProject.priority}
                          onValueChange={(value: "Low" | "Medium" | "High" | "Urgent") => 
                            setNewProject({...newProject, priority: value})}
                        >
                          <SelectTrigger id="project-priority" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-lead" className={THEME_COLORS.textSecondary}>Project Lead</Label>
                      <Input 
                        id="project-lead" 
                        placeholder="Lead name" 
                        value={newProject.lead}
                        onChange={(e) => setNewProject({...newProject, lead: e.target.value})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-team" className={THEME_COLORS.textSecondary}>Team Members (comma-separated)</Label>
                      <Input 
                        id="project-team" 
                        placeholder="Team member names" 
                        value={newProject.assignedTo.join(", ")}
                        onChange={(e) => setNewProject({...newProject, assignedTo: e.target.value.split(",").map(name => name.trim())})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      onClick={handleAddProject}
                    >
                      Create Project
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="in progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="not started">Not Started</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredProjects.length === 0 ? (
                <Card className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow}`}>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <ClipboardList className={`${THEME_COLORS.iconColor} h-16 w-16 mb-4 opacity-50`} />
                    <p className={`${THEME_COLORS.textPrimary} text-xl font-semibold mb-2`}>No projects found</p>
                    <p className={`${THEME_COLORS.textSecondary} text-center max-w-md`}>
                      {activeTab === "all" 
                        ? "You don't have any projects yet. Create your first project to get started." 
                        : `You don't have any ${activeTab} projects.`}
                    </p>
                    {isAdminOrHR() && (
                      <Button 
                        className="mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        onClick={() => setShowNewProjectDialog(true)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create New Project
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(project.priority)}`}>
                              {project.priority}
                            </span>
                            <span className={`flex items-center text-sm ${THEME_COLORS.textSecondary}`}>
                              <Calendar className="h-3 w-3 mr-1" />
                              {project.startDate} - {project.endDate}
                            </span>
                          </div>
                          <CardTitle className={`mt-2 ${THEME_COLORS.textPrimary}`}>{project.name}</CardTitle>
                          <CardDescription className={`mt-1 ${THEME_COLORS.textSecondary}`}>
                            {project.description}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(project.id)}
                          aria-label={expandedProject === project.id ? "Collapse" : "Expand"}
                          className={`${THEME_COLORS.accentBlue} ${THEME_COLORS.hoverBg}`}
                        >
                          {expandedProject === project.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-medium ${THEME_COLORS.textSecondary}`}>Progress</span>
                          <span className={`text-sm font-medium ${THEME_COLORS.textSecondary}`}>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className={`h-2 ${getProgressColor(project.progress)}`} />
                      </div>
                    </CardHeader>
                    
                    {expandedProject === project.id && (
                      <>
                        <CardContent className="pt-4 pb-3">
                          <div className="mb-6">
                            <div className="flex items-center gap-4 mb-3">
                              <div className={`flex items-center ${THEME_COLORS.textSecondary}`}>
                                <Users className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium">Team:</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.assignedTo.map((member, index) => (
                                  <span 
                                    key={index} 
                                    className={`text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300`}
                                  >
                                    {member}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className={`flex items-center ${THEME_COLORS.textSecondary}`}>
                              <span className="text-sm font-medium mr-2">Project Lead:</span>
                              <span className={`text-sm ${THEME_COLORS.textPrimary}`}>{project.lead}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className={`font-medium mb-3 ${THEME_COLORS.textPrimary}`}>Tasks</h4>
                            {project.tasks.length === 0 ? (
                              <p className={`text-sm italic ${THEME_COLORS.textSecondary}`}>No tasks yet</p>
                            ) : (
                              <div className="space-y-3">
                                {project.tasks.map((task) => (
                                  <div
                                    key={task.id}
                                    className={`p-3 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700`}
                                  >
                                    <div className="flex justify-between">
                                      <div className={`font-medium ${THEME_COLORS.textPrimary}`}>{task.title}</div>
                                      <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(task.status)}`}>
                                          {task.status}
                                        </span>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                                          {task.priority}
                                        </span>
                                      </div>
                                    </div>
                                    <p className={`text-sm mt-1 ${THEME_COLORS.textSecondary}`}>{task.description}</p>
                                    <div className="flex justify-between items-center mt-2 text-xs">
                                      <div className={`flex items-center ${THEME_COLORS.textSecondary}`}>
                                        <Clock className="h-3 w-3 mr-1" />
                                        Due: {task.dueDate}
                                      </div>
                                      <div className={`flex items-center ${THEME_COLORS.textSecondary}`}>
                                        <Users className="h-3 w-3 mr-1" />
                                        {task.assignedTo}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-end">
                          {isAdminOrHR() && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openNewTaskDialog(project.id)}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                            >
                              <FilePlus className="h-4 w-4 mr-2" />
                              Add Task
                            </Button>
                          )}
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

export default Projects