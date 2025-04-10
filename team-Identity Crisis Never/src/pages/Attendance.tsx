"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/clerk-react"
import { CalendarDays, UserCheck, Clock, CalendarClock } from "lucide-react"
import { THEME_COLORS } from "@/lib/theme"

const Attendance = () => {
  const { user } = useUser()
  const { toast } = useToast()
  const [currentTab, setCurrentTab] = useState("daily")
  const [clockedIn, setClockedIn] = useState(false)
  const userRole = (user?.publicMetadata?.role as string) || "Employee"

  const handleClockIn = () => {
    setClockedIn(true)
    toast({
      title: "Clocked In",
      description: `You clocked in at ${new Date().toLocaleTimeString()}`,
    })
  }

  const handleClockOut = () => {
    setClockedIn(false)
    toast({
      title: "Clocked Out",
      description: `You clocked out at ${new Date().toLocaleTimeString()}`,
    })
  }

  // Mock data for attendance records
  const attendanceData = [
    { date: "2023-04-01", clockIn: "09:00 AM", clockOut: "05:30 PM", status: "Present", workHours: 8.5 },
    { date: "2023-04-02", clockIn: "08:45 AM", clockOut: "05:15 PM", status: "Present", workHours: 8.5 },
    { date: "2023-04-03", clockIn: "N/A", clockOut: "N/A", status: "Absent", workHours: 0 },
    { date: "2023-04-04", clockIn: "09:15 AM", clockOut: "06:00 PM", status: "Present", workHours: 8.75 },
    { date: "2023-04-05", clockIn: "09:00 AM", clockOut: "05:30 PM", status: "Present", workHours: 8.5 },
  ]

  // Mock data for monthly summary
  const monthlySummary = [
    { month: "January", daysWorked: 22, totalHours: 176, leavesTaken: 0, avgHoursPerDay: 8 },
    { month: "February", daysWorked: 20, totalHours: 160, leavesTaken: 0, avgHoursPerDay: 8 },
    { month: "March", daysWorked: 21, totalHours: 168, leavesTaken: 2, avgHoursPerDay: 8 },
    { month: "April", daysWorked: 15, totalHours: 120, leavesTaken: 1, avgHoursPerDay: 8 },
  ]

  // Mock team attendance data (for managers/admins)
  const teamAttendance = [
    { employee: "John Smith", attendance: "95%", onTime: "92%", leavesUsed: 2, avgHoursPerDay: 8.2 },
    { employee: "Emily Johnson", attendance: "98%", onTime: "100%", leavesUsed: 1, avgHoursPerDay: 8.5 },
    { employee: "Michael Brown", attendance: "90%", onTime: "85%", leavesUsed: 3, avgHoursPerDay: 7.9 },
    { employee: "Sarah Wilson", attendance: "100%", onTime: "98%", leavesUsed: 0, avgHoursPerDay: 8.3 },
    { employee: "David Lee", attendance: "92%", onTime: "90%", leavesUsed: 2, avgHoursPerDay: 8.0 },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Attendance Management
          </h1>
          <div className="flex items-center space-x-2 animate-slide-in-right">
            <span className="text-sm text-slate-500 px-3 py-1.5 rounded-full bg-white border border-blue-200/60 shadow-sm">
              {new Date().toLocaleDateString()}
            </span>
            {!clockedIn ? (
              <Button
                onClick={handleClockIn}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all duration-300"
              >
                <Clock className="h-4 w-4 mr-2" />
                Clock In
              </Button>
            ) : (
              <Button
                onClick={handleClockOut}
                variant="destructive"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-300"
              >
                <Clock className="h-4 w-4 mr-2" />
                Clock Out
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          <Card
            className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${THEME_COLORS.textSecondary} mb-1`}>Total Work Days</p>
                  <p className={`text-2xl font-bold ${THEME_COLORS.textPrimary} animate-pulse-subtle`}>78</p>
                  <p className="text-xs text-slate-500">Last 90 days</p>
                </div>
                <div
                  className={`h-12 w-12 ${THEME_COLORS.inputBg} rounded-full flex items-center justify-center ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-transform duration-300 hover:scale-110`}
                >
                  <CalendarDays className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${THEME_COLORS.textSecondary} mb-1`}>Attendance Rate</p>
                  <p className={`text-2xl font-bold ${THEME_COLORS.textPrimary} animate-pulse-subtle`}>96%</p>
                  <p className="text-xs text-green-600">+2% since last quarter</p>
                </div>
                <div
                  className={`h-12 w-12 ${THEME_COLORS.inputBg} rounded-full flex items-center justify-center ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-transform duration-300 hover:scale-110`}
                >
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${THEME_COLORS.textSecondary} mb-1`}>Average Work Hours</p>
                  <p className={`text-2xl font-bold ${THEME_COLORS.textPrimary} animate-pulse-subtle`}>8.2</p>
                  <p className="text-xs text-slate-500">Hours per day</p>
                </div>
                <div
                  className={`h-12 w-12 ${THEME_COLORS.inputBg} rounded-full flex items-center justify-center ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-transform duration-300 hover:scale-110`}
                >
                  <CalendarClock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="daily" className="w-full animate-fade-in" onValueChange={setCurrentTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-3 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200/60">
            <TabsTrigger value="daily" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
              Daily Records
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
              Monthly Summary
            </TabsTrigger>
            {(userRole === "Admin" || userRole === "Manager") && (
              <TabsTrigger value="team" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                Team Overview
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="daily" className="mt-6">
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-slate-800">Daily Attendance Records</CardTitle>
                <CardDescription className="text-slate-600">Your clock-in and clock-out history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Clock In</TableHead>
                      <TableHead>Clock Out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Work Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record, index) => (
                      <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.clockIn}</TableCell>
                        <TableCell>{record.clockOut}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              record.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.status}
                          </span>
                        </TableCell>
                        <TableCell>{record.workHours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-slate-800">Monthly Attendance Summary</CardTitle>
                <CardDescription className="text-slate-600">Your attendance statistics by month</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Days Worked</TableHead>
                      <TableHead>Total Hours</TableHead>
                      <TableHead>Leaves Taken</TableHead>
                      <TableHead>Avg Hours/Day</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlySummary.map((month, index) => (
                      <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell>{month.daysWorked}</TableCell>
                        <TableCell>{month.totalHours}</TableCell>
                        <TableCell>{month.leavesTaken}</TableCell>
                        <TableCell>{month.avgHoursPerDay}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {(userRole === "Admin" || userRole === "Manager") && (
            <TabsContent value="team" className="mt-6">
              <Card
                className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardGradientHover} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="text-slate-800">Team Attendance Overview</CardTitle>
                  <CardDescription className="text-slate-600">
                    Attendance statistics for your team members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Attendance Rate</TableHead>
                        <TableHead>On-Time Rate</TableHead>
                        <TableHead>Leaves Used</TableHead>
                        <TableHead>Avg Hours/Day</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamAttendance.map((employee, index) => (
                        <TableRow key={index} className="hover:bg-blue-50/50 transition-colors">
                          <TableCell className="font-medium">{employee.employee}</TableCell>
                          <TableCell>{employee.attendance}</TableCell>
                          <TableCell>{employee.onTime}</TableCell>
                          <TableCell>{employee.leavesUsed}</TableCell>
                          <TableCell>{employee.avgHoursPerDay}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  )
}

export default Attendance
