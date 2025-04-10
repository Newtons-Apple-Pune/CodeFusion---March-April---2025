"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/clerk-react"
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  ClipboardList,
  UserCog,
  GraduationCap,
  BriefcaseBusiness,
  MoreHorizontal,
  AlertCircle
} from "lucide-react"
import { THEME_COLORS } from "@/lib/theme"
import { useRole } from "@/hooks/use-role"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Employee {
  id: string;
  name: string;
  profileImage: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: "Active" | "On Leave" | "Terminated" | "Contract";
  manager: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  experience: {
    position: string;
    company: string;
    duration: string;
  }[];
}

const Employees = () => {
  const { user } = useUser()
  const { toast } = useToast()
  const { isAdminOrHR } = useRole()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false)
  
  // Sample employees data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "EMP001",
      name: "John Smith",
      profileImage: "https://i.pravatar.cc/150?img=1",
      role: "Senior Developer",
      department: "Engineering",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: "2020-03-15",
      status: "Active",
      manager: "David Johnson",
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"],
      education: [
        {
          degree: "B.S. Computer Science",
          institution: "Stanford University",
          year: "2018"
        }
      ],
      experience: [
        {
          position: "Mid-level Developer",
          company: "Tech Solutions Inc.",
          duration: "2018-2020"
        }
      ]
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      profileImage: "https://i.pravatar.cc/150?img=5",
      role: "Product Manager",
      department: "Product",
      email: "sarah.wilson@company.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      joinDate: "2019-07-10",
      status: "Active",
      manager: "Michael Chen",
      skills: ["Product Strategy", "Market Research", "User Experience", "Agile Methodologies", "JIRA"],
      education: [
        {
          degree: "MBA",
          institution: "NYU Stern",
          year: "2017"
        },
        {
          degree: "B.A. Business Administration",
          institution: "Columbia University",
          year: "2015"
        }
      ],
      experience: [
        {
          position: "Associate Product Manager",
          company: "InnovateTech",
          duration: "2017-2019"
        }
      ]
    },
    {
      id: "EMP003",
      name: "Michael Brown",
      profileImage: "https://i.pravatar.cc/150?img=3",
      role: "UX Designer",
      department: "Design",
      email: "michael.brown@company.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      joinDate: "2021-01-20",
      status: "On Leave",
      manager: "Emily Johnson",
      skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping", "UI Design"],
      education: [
        {
          degree: "M.F.A. Design",
          institution: "Rhode Island School of Design",
          year: "2020"
        }
      ],
      experience: [
        {
          position: "Junior Designer",
          company: "Creative Solutions",
          duration: "2020-2021"
        }
      ]
    },
    {
      id: "EMP004",
      name: "Emily Johnson",
      profileImage: "https://i.pravatar.cc/150?img=6",
      role: "HR Manager",
      department: "Human Resources",
      email: "emily.johnson@company.com",
      phone: "+1 (555) 567-8901",
      location: "Chicago, IL",
      joinDate: "2018-05-05",
      status: "Active",
      manager: "David Johnson",
      skills: ["Recruiting", "Employee Relations", "Benefits Administration", "Performance Management", "HR Policy"],
      education: [
        {
          degree: "B.S. Human Resources Management",
          institution: "University of Illinois",
          year: "2016"
        }
      ],
      experience: [
        {
          position: "HR Specialist",
          company: "Global Enterprises",
          duration: "2016-2018"
        }
      ]
    },
    {
      id: "EMP005",
      name: "James Williams",
      profileImage: "https://i.pravatar.cc/150?img=4",
      role: "Marketing Specialist",
      department: "Marketing",
      email: "james.williams@company.com",
      phone: "+1 (555) 234-5678",
      location: "Seattle, WA",
      joinDate: "2022-02-15",
      status: "Active",
      manager: "Sarah Wilson",
      skills: ["Digital Marketing", "Social Media", "Content Creation", "SEO", "Analytics", "Campaign Management"],
      education: [
        {
          degree: "B.A. Marketing",
          institution: "University of Washington",
          year: "2021"
        }
      ],
      experience: [
        {
          position: "Marketing Intern",
          company: "Digital Marketers Inc.",
          duration: "2021-2022"
        }
      ]
    }
  ]);

  // New employee form state
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id" | "profileImage">>({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    status: "Active",
    manager: "",
    skills: [],
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ position: "", company: "", duration: "" }]
  });

  const getStatusBadge = (status: Employee["status"]) => {
    let bgColor, textColor;
    switch (status) {
      case "Active":
        bgColor = "bg-green-100 dark:bg-green-900/50";
        textColor = "text-green-800 dark:text-green-300";
        break;
      case "On Leave":
        bgColor = "bg-yellow-100 dark:bg-yellow-900/50";
        textColor = "text-yellow-800 dark:text-yellow-300";
        break;
      case "Terminated":
        bgColor = "bg-red-100 dark:bg-red-900/50";
        textColor = "text-red-800 dark:text-red-300";
        break;
      case "Contract":
        bgColor = "bg-blue-100 dark:bg-blue-900/50";
        textColor = "text-blue-800 dark:text-blue-300";
        break;
      default:
        bgColor = "bg-gray-100 dark:bg-gray-800";
        textColor = "text-gray-800 dark:text-gray-300";
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.email || !newEmployee.department) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const employee: Employee = {
      id: `EMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, // Generate random ID
      profileImage: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`, // Random avatar
      ...newEmployee
    };

    setEmployees([...employees, employee]);
    setNewEmployee({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      location: "",
      joinDate: "",
      status: "Active",
      manager: "",
      skills: [],
      education: [{ degree: "", institution: "", year: "" }],
      experience: [{ position: "", company: "", duration: "" }]
    });
    setShowAddEmployeeDialog(false);

    toast({
      title: "Employee added",
      description: "New employee has been added successfully",
    });
  };

  const filteredEmployees = (() => {
    let filtered = employees;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        employee =>
          employee.name.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.role.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query) ||
          employee.id.toLowerCase().includes(query)
      );
    }
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(employee => employee.status.toLowerCase() === activeTab.toLowerCase());
    }
    
    return filtered;
  })();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 animate-fade-in">
          <div>
            <h1 className={`text-2xl font-bold ${THEME_COLORS.textPrimary} bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400`}>
              Employee Directory
            </h1>
            <p className={THEME_COLORS.textSecondary}>Manage your company's employees</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search employees..."
                className={`pl-9 ${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isAdminOrHR() && (
              <Dialog open={showAddEmployeeDialog} onOpenChange={setShowAddEmployeeDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} max-w-2xl`}>
                  <DialogHeader>
                    <DialogTitle className={THEME_COLORS.textPrimary}>Add New Employee</DialogTitle>
                    <DialogDescription className={THEME_COLORS.textSecondary}>
                      Add a new employee to your organization
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employee-name" className={THEME_COLORS.textSecondary}>Full Name <span className="text-red-500">*</span></Label>
                        <Input 
                          id="employee-name" 
                          placeholder="John Doe" 
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employee-email" className={THEME_COLORS.textSecondary}>Email <span className="text-red-500">*</span></Label>
                        <Input 
                          id="employee-email" 
                          type="email"
                          placeholder="john.doe@company.com" 
                          value={newEmployee.email}
                          onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employee-role" className={THEME_COLORS.textSecondary}>Job Title <span className="text-red-500">*</span></Label>
                        <Input 
                          id="employee-role" 
                          placeholder="Software Engineer" 
                          value={newEmployee.role}
                          onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employee-department" className={THEME_COLORS.textSecondary}>Department <span className="text-red-500">*</span></Label>
                        <Select 
                          value={newEmployee.department}
                          onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}
                        >
                          <SelectTrigger id="employee-department" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Product">Product</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Human Resources">Human Resources</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Operations">Operations</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employee-phone" className={THEME_COLORS.textSecondary}>Phone Number</Label>
                        <Input 
                          id="employee-phone" 
                          placeholder="+1 (555) 123-4567" 
                          value={newEmployee.phone}
                          onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employee-location" className={THEME_COLORS.textSecondary}>Location</Label>
                        <Input 
                          id="employee-location" 
                          placeholder="San Francisco, CA" 
                          value={newEmployee.location}
                          onChange={(e) => setNewEmployee({...newEmployee, location: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employee-join-date" className={THEME_COLORS.textSecondary}>Join Date</Label>
                        <Input 
                          id="employee-join-date" 
                          type="date"
                          value={newEmployee.joinDate}
                          onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                          className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employee-status" className={THEME_COLORS.textSecondary}>Status</Label>
                        <Select 
                          value={newEmployee.status}
                          onValueChange={(value: "Active" | "On Leave" | "Terminated" | "Contract") => 
                            setNewEmployee({...newEmployee, status: value})}
                        >
                          <SelectTrigger id="employee-status" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="On Leave">On Leave</SelectItem>
                            <SelectItem value="Terminated">Terminated</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employee-manager" className={THEME_COLORS.textSecondary}>Manager</Label>
                      <Input 
                        id="employee-manager" 
                        placeholder="Manager's name" 
                        value={newEmployee.manager}
                        onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employee-skills" className={THEME_COLORS.textSecondary}>Skills (comma-separated)</Label>
                      <Input 
                        id="employee-skills" 
                        placeholder="JavaScript, React, Python" 
                        value={newEmployee.skills.join(", ")}
                        onChange={(e) => setNewEmployee({...newEmployee, skills: e.target.value.split(",").map(skill => skill.trim())})}
                        className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddEmployeeDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      onClick={handleAddEmployee}
                    >
                      Add Employee
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All Employees</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="on leave">On Leave</TabsTrigger>
            <TabsTrigger value="contract">Contract</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredEmployees.length === 0 ? (
                <Card className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow}`}>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <AlertCircle className={`${THEME_COLORS.iconColor} h-16 w-16 mb-4 opacity-50`} />
                    <p className={`${THEME_COLORS.textPrimary} text-xl font-semibold mb-2`}>No employees found</p>
                    <p className={`${THEME_COLORS.textSecondary} text-center max-w-md`}>
                      {searchQuery 
                        ? "No employees match your search criteria. Try a different search term." 
                        : `No ${activeTab === "all" ? "" : activeTab + " "}employees found.`}
                    </p>
                    {isAdminOrHR() && (
                      <Button 
                        className="mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        onClick={() => setShowAddEmployeeDialog(true)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Employee
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEmployees.map((employee) => (
                    <Card
                      key={employee.id}
                      className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200 dark:border-blue-800">
                              <img
                                src={employee.profileImage}
                                alt={employee.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <CardTitle className={`${THEME_COLORS.textPrimary} text-lg`}>
                                {employee.name}
                              </CardTitle>
                              <div className="flex items-center space-x-2">
                                <p className={`text-sm font-medium ${THEME_COLORS.textSecondary}`}>
                                  {employee.role}
                                </p>
                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                <p className={`text-sm ${THEME_COLORS.textSecondary}`}>
                                  {employee.department}
                                </p>
                              </div>
                              <p className={`text-xs mt-1 ${THEME_COLORS.textSecondary}`}>
                                ID: {employee.id}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                aria-label="More options"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              {isAdminOrHR() && (
                                <>
                                  <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center mt-2">
                          {getStatusBadge(employee.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2 pb-3 space-y-3">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center">
                            <Mail className={`h-4 w-4 mr-2 ${THEME_COLORS.iconColor}`} />
                            <p className={`text-sm truncate ${THEME_COLORS.textSecondary}`}>{employee.email}</p>
                          </div>
                          {employee.phone && (
                            <div className="flex items-center">
                              <Phone className={`h-4 w-4 mr-2 ${THEME_COLORS.iconColor}`} />
                              <p className={`text-sm ${THEME_COLORS.textSecondary}`}>{employee.phone}</p>
                            </div>
                          )}
                          {employee.location && (
                            <div className="flex items-center">
                              <MapPin className={`h-4 w-4 mr-2 ${THEME_COLORS.iconColor}`} />
                              <p className={`text-sm ${THEME_COLORS.textSecondary}`}>{employee.location}</p>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar className={`h-4 w-4 mr-2 ${THEME_COLORS.iconColor}`} />
                            <p className={`text-sm ${THEME_COLORS.textSecondary}`}>Joined: {employee.joinDate}</p>
                          </div>
                          {employee.manager && (
                            <div className="flex items-center">
                              <UserCog className={`h-4 w-4 mr-2 ${THEME_COLORS.iconColor}`} />
                              <p className={`text-sm ${THEME_COLORS.textSecondary}`}>Manager: {employee.manager}</p>
                            </div>
                          )}
                        </div>

                        {employee.skills.length > 0 && (
                          <div>
                            <div className="flex items-center mb-1">
                              <GraduationCap className={`h-4 w-4 mr-2 ${THEME_COLORS.iconColor}`} />
                              <p className={`text-sm font-medium ${THEME_COLORS.textSecondary}`}>Skills</p>
                            </div>
                            <div className="flex flex-wrap gap-1 ml-6">
                              {employee.skills.slice(0, 5).map((skill, index) => (
                                <span 
                                  key={index} 
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                >
                                  {skill}
                                </span>
                              ))}
                              {employee.skills.length > 5 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                  +{employee.skills.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                        >
                          <ClipboardList className="h-4 w-4 mr-2" />
                          View Full Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

export default Employees