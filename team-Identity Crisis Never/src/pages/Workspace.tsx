"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Building2, LayoutGrid, Check, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRole } from "@/hooks/use-role"
import { useToast } from "@/hooks/use-toast"
import WorkspaceEditor, { globalWorkspaceItems } from "@/components/workspace/WorkspaceEditor"
import { THEME_COLORS } from "@/lib/theme"

// Sample bookings data
const myBookings = [
  { id: 1, type: "desk", label: "Desk #24", date: "2025-04-08", timeSlot: "9:00 AM - 5:00 PM" },
  { id: 2, type: "room", label: "Apollo Meeting Room", date: "2025-04-10", timeSlot: "2:00 PM - 3:00 PM" },
  { id: 3, type: "desk", label: "Desk #12", date: "2025-04-12", timeSlot: "9:00 AM - 5:00 PM" },
]

const Workspace = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const { permissions } = useRole()
  const { toast } = useToast()
  const [workspaceItems, setWorkspaceItems] = useState(globalWorkspaceItems.items)

  // Update workspace items when global items change
  useEffect(() => {
    setWorkspaceItems(globalWorkspaceItems.items)
  }, [globalWorkspaceItems.items])

  const handleDeskClick = (deskId: string) => {
    // Don't allow selecting booked or maintenance desks
    const desk = workspaceItems.find((d) => d.id === deskId && d.type === "desk")
    if (desk && desk.status === "available") {
      setSelectedDesk(deskId)
      setConfirmationOpen(true)
    }
  }

  const handleBookingConfirm = () => {
    // In a real app, this would save the booking to a database
    setConfirmationOpen(false)
    // Show success toast
    toast({
      title: "Booking Confirmed",
      description: `You have successfully booked Desk #${selectedDesk?.split("-")[1]} for ${date ? format(date, "MMMM d, yyyy") : "today"}.`,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Workspace Management
          </h1>
          <div className="flex items-center space-x-2 animate-slide-in-right">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span>{date ? format(date, "PPP") : "Select date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs defaultValue="floor-plan" className="animate-fade-in">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200/60">
            <TabsTrigger value="floor-plan" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
              Floor Plan
            </TabsTrigger>
            <TabsTrigger value="list-view" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
              List View
            </TabsTrigger>
            <TabsTrigger value="my-bookings" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
              My Bookings
            </TabsTrigger>
            {permissions.canEditWorkspace && (
              <TabsTrigger value="editor" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                Editor
              </TabsTrigger>
            )}
          </TabsList>

          {/* Floor Plan View */}
          <TabsContent value="floor-plan" className="mt-6">
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-slate-800">Office Floor Plan</CardTitle>
                <CardDescription className="text-slate-600">
                  {date
                    ? `Workspace availability for ${format(date, "MMMM d, yyyy")}`
                    : "Select a date to view availability"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-slate-600">Click on a desk or room to make a booking</div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Booked</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Maintenance</span>
                    </div>
                  </div>
                </div>

                <div
                  className="relative border border-blue-200/60 rounded-lg p-4 bg-white overflow-auto shadow-inner"
                  style={{ height: "500px", minWidth: "600px" }}
                >
                  {/* Office Layout Container */}
                  <div className="relative w-[550px] h-[400px]">
                    {/* Office boundaries */}
                    <div className="absolute inset-0 border-2 border-blue-300/60 rounded-lg"></div>

                    {/* Door */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 border-2 border-blue-400"></div>

                    {/* Display Desks from workspace items */}
                    {workspaceItems
                      .filter((item) => item.type === "desk")
                      .map((desk) => (
                        <div
                          key={desk.id}
                          className={cn(
                            "absolute rounded-sm border-2 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105",
                            desk.status === "available"
                              ? "border-green-500 bg-green-50 hover:bg-green-100"
                              : desk.status === "booked"
                                ? "border-red-500 bg-red-50"
                                : "border-yellow-500 bg-yellow-50",
                            selectedDesk === desk.id && "ring-2 ring-blue-500",
                          )}
                          style={{
                            left: `${desk.x}px`,
                            top: `${desk.y}px`,
                            width: `${desk.width}px`,
                            height: `${desk.height}px`,
                          }}
                          onClick={() => handleDeskClick(desk.id)}
                        >
                          {desk.label}
                        </div>
                      ))}

                    {/* Display Meeting Rooms from workspace items */}
                    {workspaceItems
                      .filter((item) => item.type === "meeting-room")
                      .map((room) => (
                        <div
                          key={room.id}
                          className={cn(
                            "absolute rounded-md border-2 flex flex-col items-center justify-center p-2 transition-all duration-300 shadow-sm",
                            room.status === "available"
                              ? "border-green-500 bg-green-50"
                              : room.status === "booked"
                                ? "border-red-500 bg-red-50"
                                : "border-yellow-500 bg-yellow-50",
                          )}
                          style={{
                            left: `${room.x}px`,
                            top: `${room.y}px`,
                            width: `${room.width}px`,
                            height: `${room.height}px`,
                          }}
                        >
                          <span className="font-medium text-sm">{room.label}</span>
                          <span className="text-xs text-slate-500">Capacity: {room.capacity}</span>
                        </div>
                      ))}

                    {/* Display other workspace items */}
                    {workspaceItems
                      .filter((item) => item.type !== "desk" && item.type !== "meeting-room")
                      .map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "absolute rounded-md border-2 flex items-center justify-center transition-all duration-300",
                            item.status === "available"
                              ? "border-green-500 bg-green-50"
                              : item.status === "booked"
                                ? "border-red-500 bg-red-50"
                                : "border-yellow-500 bg-yellow-50",
                          )}
                          style={{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            width: `${item.width}px`,
                            height: `${item.height}px`,
                          }}
                        >
                          <span className="text-sm">{item.label}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Booking Confirmation Dialog */}
                {confirmationOpen && selectedDesk && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-blue-200/60">
                      <h3 className="text-lg font-semibold mb-2 text-slate-800">Confirm Booking</h3>
                      <p className="mb-4 text-slate-600">
                        You are about to book Desk #{selectedDesk.split("-")[1]} for{" "}
                        {date ? format(date, "MMMM d, yyyy") : "today"}.
                      </p>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setConfirmationOpen(false)}
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleBookingConfirm}
                          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                        >
                          Confirm Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list-view" className="mt-6">
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-slate-800">Available Workspaces</CardTitle>
                <CardDescription className="text-slate-600">
                  {date
                    ? `Available desks and rooms for ${format(date, "MMMM d, yyyy")}`
                    : "Select a date to view availability"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="desks">
                  <TabsList className="grid w-full max-w-md grid-cols-2 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200/60">
                    <TabsTrigger
                      value="desks"
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
                    >
                      Desks
                    </TabsTrigger>
                    <TabsTrigger
                      value="rooms"
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
                    >
                      Meeting Rooms
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="desks" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {workspaceItems
                        .filter((item) => item.type === "desk" && item.status === "available")
                        .map((desk) => (
                          <div
                            key={desk.id}
                            className="border border-blue-200/60 rounded-lg p-4 flex justify-between items-center bg-gradient-to-r from-white to-green-50/30 hover:shadow-md transition-all duration-300 transform hover:scale-102"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3 border border-green-500">
                                <span className="font-medium">{desk.label}</span>
                              </div>
                              <span className="font-medium text-slate-800">Desk #{desk.label}</span>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleDeskClick(desk.id)}
                              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                            >
                              Book
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="rooms" className="mt-4">
                    <div className="grid grid-cols-1 gap-4">
                      {workspaceItems
                        .filter((item) => item.type === "meeting-room" && item.status === "available")
                        .map((room) => (
                          <div
                            key={room.id}
                            className="border border-blue-200/60 rounded-lg p-4 flex justify-between items-center bg-gradient-to-r from-white to-blue-50/30 hover:shadow-md transition-all duration-300 transform hover:scale-102"
                          >
                            <div>
                              <div className="font-medium text-slate-800">{room.label} Room</div>
                              <div className="text-sm text-slate-500">Capacity: {room.capacity} people</div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                            >
                              Book
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Bookings */}
          <TabsContent value="my-bookings" className="mt-6">
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-slate-800">My Bookings</CardTitle>
                <CardDescription className="text-slate-600">Your upcoming workspace reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-blue-200/60 rounded-lg bg-gradient-to-r from-white to-blue-50/30 hover:shadow-md transition-all duration-300 transform hover:scale-102"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-300 shadow-sm">
                          {booking.type === "desk" ? (
                            <LayoutGrid className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Building2 className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{booking.label}</p>
                          <p className="text-sm text-slate-500">
                            {new Date(booking.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            • {booking.timeSlot}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Check In
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 transition-all duration-300"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workspace Editor (Only for Admin and HR) */}
          {permissions.canEditWorkspace && (
            <TabsContent value="editor" className="mt-6">
              <WorkspaceEditor />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  )
}

export default Workspace
