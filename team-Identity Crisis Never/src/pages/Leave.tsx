"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/clerk-react"
import {
  PlusCircle,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  ArrowRightLeft
} from "lucide-react"
import { THEME_COLORS } from "@/lib/theme"
import { useRole } from "@/hooks/use-role"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type LeaveStatus = "Pending" | "Approved" | "Rejected";
type LeaveType = "Annual Leave" | "Sick Leave" | "Personal Leave" | "Bereavement" | "Parental Leave" | "Other";

interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  reviewedBy?: string;
  reviewComments?: string;
}

const Leave = () => {
  const { user } = useUser()
  const { toast } = useToast()
  const { isAdminOrHR } = useRole()
  const [activeTab, setActiveTab] = useState("all")
  const [showNewLeaveDialog, setShowNewLeaveDialog] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null)
  const [reviewComment, setReviewComment] = useState("")
  
  // Sample leave requests data
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: "John Smith",
      employeeId: "EMP001",
      type: "Annual Leave",
      startDate: "2023-06-15",
      endDate: "2023-06-22",
      reason: "Family vacation to Hawaii",
      status: "Approved",
      appliedDate: "2023-05-20",
      reviewedBy: "David Johnson",
      reviewComments: "Enjoy your vacation!"
    },
    {
      id: 2,
      employeeName: "Sarah Wilson",
      employeeId: "EMP002",
      type: "Sick Leave",
      startDate: "2023-05-29",
      endDate: "2023-05-31",
      reason: "Down with flu. Doctor advised 3 days rest.",
      status: "Approved",
      appliedDate: "2023-05-28",
      reviewedBy: "David Johnson",
      reviewComments: "Get well soon. Submit medical certificate when you return."
    },
    {
      id: 3,
      employeeName: "Michael Brown",
      employeeId: "EMP003",
      type: "Personal Leave",
      startDate: "2023-06-05",
      endDate: "2023-06-05",
      reason: "Need to attend my daughter's school event",
      status: "Pending",
      appliedDate: "2023-05-25"
    },
    {
      id: 4,
      employeeName: "Emily Johnson",
      employeeId: "EMP004",
      type: "Bereavement",
      startDate: "2023-05-22",
      endDate: "2023-05-26",
      reason: "Attending grandmother's funeral",
      status: "Approved",
      appliedDate: "2023-05-21",
      reviewedBy: "David Johnson",
      reviewComments: "Our condolences on your loss. Take the time you need."
    },
    {
      id: 5,
      employeeName: "James Williams",
      employeeId: "EMP005",
      type: "Annual Leave",
      startDate: "2023-07-10",
      endDate: "2023-07-21",
      reason: "Summer vacation with family",
      status: "Pending",
      appliedDate: "2023-05-15"
    }
  ]);

  const [newLeaveRequest, setNewLeaveRequest] = useState<Omit<LeaveRequest, "id" | "employeeName" | "employeeId" | "status" | "appliedDate">>({
    type: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const getStatusBadge = (status: LeaveStatus) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const getLeaveTypeBadge = (type: LeaveType) => {
    let bgColor, textColor;
    switch (type) {
      case "Annual Leave":
        bgColor = "bg-blue-100 dark:bg-blue-900/50";
        textColor = "text-blue-800 dark:text-blue-300";
        break;
      case "Sick Leave":
        bgColor = "bg-purple-100 dark:bg-purple-900/50";
        textColor = "text-purple-800 dark:text-purple-300";
        break;
      case "Personal Leave":
        bgColor = "bg-indigo-100 dark:bg-indigo-900/50";
        textColor = "text-indigo-800 dark:text-indigo-300";
        break;
      case "Bereavement":
        bgColor = "bg-gray-100 dark:bg-gray-800";
        textColor = "text-gray-800 dark:text-gray-300";
        break;
      case "Parental Leave":
        bgColor = "bg-pink-100 dark:bg-pink-900/50";
        textColor = "text-pink-800 dark:text-pink-300";
        break;
      default:
        bgColor = "bg-gray-100 dark:bg-gray-800";
        textColor = "text-gray-800 dark:text-gray-300";
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {type}
      </span>
    );
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end dates
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  const handleSubmitLeave = () => {
    if (!newLeaveRequest.startDate || !newLeaveRequest.endDate || !newLeaveRequest.reason) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate dates
    const startDate = new Date(newLeaveRequest.startDate);
    const endDate = new Date(newLeaveRequest.endDate);
    const today = new Date();
    
    if (startDate < today && newLeaveRequest.type !== "Sick Leave") {
      toast({
        title: "Invalid date",
        description: "Start date cannot be in the past except for Sick Leave",
        variant: "destructive",
      });
      return;
    }
    
    if (endDate < startDate) {
      toast({
        title: "Invalid date range",
        description: "End date cannot be earlier than start date",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const leaveRequest: LeaveRequest = {
      id: Date.now(),
      employeeName: user?.fullName || "Current User",
      employeeId: user?.id || "unknown",
      status: "Pending",
      appliedDate: now.toISOString().split('T')[0],
      ...newLeaveRequest,
    };

    setLeaveRequests([leaveRequest, ...leaveRequests]);
    setNewLeaveRequest({
      type: "Annual Leave",
      startDate: "",
      endDate: "",
      reason: "",
    });
    setShowNewLeaveDialog(false);

    toast({
      title: "Leave request submitted",
      description: "Your leave request has been submitted for approval",
    });
  };

  const handleReviewLeave = (status: LeaveStatus) => {
    if (!selectedLeave) return;
    
    const updatedLeaveRequests = leaveRequests.map((leave) => {
      if (leave.id === selectedLeave.id) {
        return {
          ...leave,
          status,
          reviewedBy: user?.fullName || "Admin",
          reviewComments: reviewComment,
        };
      }
      return leave;
    });
    
    setLeaveRequests(updatedLeaveRequests);
    setSelectedLeave(null);
    setReviewComment("");
    setShowReviewDialog(false);
    
    toast({
      title: `Request ${status.toLowerCase()}`,
      description: `The leave request has been ${status.toLowerCase()}`,
    });
  };

  const openReviewDialog = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setShowReviewDialog(true);
  };

  const filteredLeaveRequests = (() => {
    // Filter based on active tab
    let filtered = leaveRequests;
    
    if (activeTab !== "all") {
      filtered = leaveRequests.filter((leave) => leave.status.toLowerCase() === activeTab);
    }
    
    // If user is not admin/HR, only show their own leave requests
    if (!isAdminOrHR()) {
      // In a real app, filter by user ID. For now just match by name if available
      filtered = filtered.filter((leave) => 
        leave.employeeName === user?.fullName || 
        leave.employeeId === user?.id
      );
    }
    
    return filtered;
  })();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 animate-fade-in">
          <div>
            <h1 className={`text-2xl font-bold ${THEME_COLORS.textPrimary} bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400`}>
              Leave Management
            </h1>
            <p className={THEME_COLORS.textSecondary}>Request and manage employee leave</p>
          </div>
          
          <Dialog open={showNewLeaveDialog} onOpenChange={setShowNewLeaveDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                <PlusCircle className="h-4 w-4 mr-2" />
                Request Leave
              </Button>
            </DialogTrigger>
            <DialogContent className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} max-w-lg`}>
              <DialogHeader>
                <DialogTitle className={THEME_COLORS.textPrimary}>Request Leave</DialogTitle>
                <DialogDescription className={THEME_COLORS.textSecondary}>
                  Submit a new leave request for approval
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="leave-type" className={THEME_COLORS.textSecondary}>Leave Type</Label>
                  <Select 
                    value={newLeaveRequest.type}
                    onValueChange={(value: LeaveType) => setNewLeaveRequest({...newLeaveRequest, type: value})}
                  >
                    <SelectTrigger id="leave-type" className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                      <SelectItem value="Bereavement">Bereavement</SelectItem>
                      <SelectItem value="Parental Leave">Parental Leave</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className={THEME_COLORS.textSecondary}>Start Date</Label>
                    <Input 
                      id="start-date" 
                      type="date" 
                      value={newLeaveRequest.startDate}
                      onChange={(e) => setNewLeaveRequest({...newLeaveRequest, startDate: e.target.value})}
                      className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className={THEME_COLORS.textSecondary}>End Date</Label>
                    <Input 
                      id="end-date" 
                      type="date" 
                      value={newLeaveRequest.endDate}
                      onChange={(e) => setNewLeaveRequest({...newLeaveRequest, endDate: e.target.value})}
                      className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason" className={THEME_COLORS.textSecondary}>Reason</Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Please provide a reason for your leave request..."
                    rows={4}
                    value={newLeaveRequest.reason}
                    onChange={(e) => setNewLeaveRequest({...newLeaveRequest, reason: e.target.value})}
                    className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewLeaveDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  onClick={handleSubmitLeave}
                >
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredLeaveRequests.length === 0 ? (
                <Card className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow}`}>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Calendar className={`${THEME_COLORS.iconColor} h-16 w-16 mb-4 opacity-50`} />
                    <p className={`${THEME_COLORS.textPrimary} text-xl font-semibold mb-2`}>No leave requests found</p>
                    <p className={`${THEME_COLORS.textSecondary} text-center max-w-md`}>
                      {isAdminOrHR() 
                        ? `There are no ${activeTab === "all" ? "" : activeTab + " "}leave requests at the moment.` 
                        : `You don't have any ${activeTab === "all" ? "" : activeTab + " "}leave requests.`}
                    </p>
                    {!isAdminOrHR() && (
                      <Button 
                        className="mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        onClick={() => setShowNewLeaveDialog(true)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Request Leave
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredLeaveRequests.map((leave) => (
                  <Card
                    key={leave.id}
                    className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {getStatusBadge(leave.status)}
                            {getLeaveTypeBadge(leave.type)}
                          </div>
                          <CardTitle className={`${THEME_COLORS.textPrimary}`}>
                            {leave.employeeName}
                          </CardTitle>
                          <CardDescription className={`flex items-center mt-1 ${THEME_COLORS.textSecondary}`}>
                            <User className="h-3 w-3 mr-1" />
                            Employee ID: {leave.employeeId}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${THEME_COLORS.textSecondary}`}>
                            <span className="inline-flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {leave.startDate} to {leave.endDate}
                            </span>
                          </div>
                          <div className={`text-sm mt-1 ${THEME_COLORS.textSecondary}`}>
                            Duration: {calculateDuration(leave.startDate, leave.endDate)}
                          </div>
                          <div className={`text-xs mt-1 ${THEME_COLORS.textSecondary}`}>
                            <span className="inline-flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Applied: {leave.appliedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-sm font-medium mb-1 ${THEME_COLORS.textSecondary}`}>Reason</h4>
                          <p className={`${THEME_COLORS.textPrimary}`}>{leave.reason}</p>
                        </div>
                        
                        {leave.reviewComments && (
                          <div className="mt-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800">
                            <h4 className={`text-sm font-medium mb-1 ${THEME_COLORS.textSecondary}`}>
                              Review Comments from {leave.reviewedBy}
                            </h4>
                            <p className={`${THEME_COLORS.textPrimary}`}>{leave.reviewComments}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    {isAdminOrHR() && leave.status === "Pending" && (
                      <CardFooter className="pt-0 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openReviewDialog(leave)}
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                        >
                          <ArrowRightLeft className="h-4 w-4 mr-2" />
                          Review Request
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Leave Review Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} max-w-lg`}>
            <DialogHeader>
              <DialogTitle className={THEME_COLORS.textPrimary}>Review Leave Request</DialogTitle>
              <DialogDescription className={THEME_COLORS.textSecondary}>
                Approve or reject this leave request
              </DialogDescription>
            </DialogHeader>
            {selectedLeave && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${THEME_COLORS.textSecondary}`}>Employee</h4>
                    <p className={`${THEME_COLORS.textPrimary}`}>{selectedLeave.employeeName}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${THEME_COLORS.textSecondary}`}>Leave Type</h4>
                    <p className={`${THEME_COLORS.textPrimary}`}>{selectedLeave.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${THEME_COLORS.textSecondary}`}>Start Date</h4>
                    <p className={`${THEME_COLORS.textPrimary}`}>{selectedLeave.startDate}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium mb-1 ${THEME_COLORS.textSecondary}`}>End Date</h4>
                    <p className={`${THEME_COLORS.textPrimary}`}>{selectedLeave.endDate}</p>
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm font-medium mb-1 ${THEME_COLORS.textSecondary}`}>Reason</h4>
                  <p className={`${THEME_COLORS.textPrimary}`}>{selectedLeave.reason}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-comments" className={THEME_COLORS.textSecondary}>Comments</Label>
                  <Textarea 
                    id="review-comments" 
                    placeholder="Add your comments for this review..."
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className={`${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} ${THEME_COLORS.inputText}`}
                  />
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-between">
              <Button 
                variant="destructive"
                onClick={() => handleReviewLeave("Rejected")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={() => handleReviewLeave("Approved")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}

export default Leave