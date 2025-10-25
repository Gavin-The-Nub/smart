import { useEffect, useState } from "react";
import { useAuthReal as useAuth } from "@/hooks/useAuthReal";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  AlertTriangle,
  Plus,
  Download,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  MessageSquare,
  DollarSign,
  Users,
  BarChart3,
  BookOpen,
  Star,
  CheckCircle,
  XCircle,
  Upload,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";
import FileManager from "@/components/FileManager";
import AvailabilityEditor from "@/components/tutors/AvailabilityEditor";
import CalendarAvailabilityEditor from "@/components/tutors/CalendarAvailabilityEditor";
import BookingRequestsPanel from "@/components/tutors/BookingRequestsPanel";
import TutorSelector from "@/components/booking/TutorSelector";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";

export default function Dashboard() {
  const { profile, user, signOut } = useAuth();
  const { toast } = useToast();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState<boolean>(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [showBilling, setShowBilling] = useState(false);
  const [billingPassword, setBillingPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Booking form state
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    // Static mock data for frontend-only development
    setBalance(10); // Mock credit balance
    setSessions([
      {
        id: "mock-session-1",
        start_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        end_at: new Date(
          Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000
        ).toISOString(),
        status: "booked",
        duration_min: 60,
        credits_charged: 2,
      },
    ]);
    setActivities([]);
    setLoading(false);
  }, []);

  const handleBillingAccess = () => {
    if (billingPassword === "billing123") {
      // Demo password
      setShowBilling(true);
      toast({
        title: "Billing access granted",
        description: "You can now view billing information.",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please enter the correct billing password.",
        variant: "destructive",
      });
    }
  };

  const handleBookSession = () => {
    setBookingMessage(null);
    if (!selectedTutor) {
      setBookingMessage("Please select a tutor.");
      return;
    }
    if (!selectedSlot) {
      setBookingMessage("Please select a time slot.");
      return;
    }
    if (!selectedSlot.startTime || !selectedSlot.endTime) {
      setBookingMessage("Please select both start and end times.");
      return;
    }

    // Mock booking request for frontend-only development
    setBookingMessage(
      `Demo: Booking request sent! This would create a real booking in a live app.`
    );
    // Reset form
    setSelectedTutor(null);
    setSelectedSlot(null);
  };

  const handleFileUpload = (files: File[]) => {
    // Mock file upload for frontend-only development
    const uploadedFileData = files.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      uploadedBy: profile?.full_name || user?.email || "Unknown",
      url: URL.createObjectURL(file), // Temporary URL for demo
    }));

    setUploadedFiles((prev) => [...prev, ...uploadedFileData]);
    setShowUploadModal(false);

    toast({
      title: "Files uploaded successfully",
      description: `${files.length} file(s) uploaded (demo mode)`,
    });
  };

  const handleFileDelete = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    toast({
      title: "File deleted",
      description: "File has been removed",
    });
  };

  const handleFileView = (fileId: string) => {
    const file = uploadedFiles.find((f) => f.id === fileId);
    if (file) {
      window.open(file.url, "_blank");
    }
  };

  const cancelSession = (sessionId: string) => {
    setActionMsg(null);

    // Mock session cancellation for frontend-only development
    setActionMsg(
      "Demo: Session cancelled and credits refunded (if 24h notice)."
    );

    // Update mock data
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    setBalance((prev) => (prev || 0) + 2); // Refund credits
  };

  const isLowCredits = balance !== null && balance < 5;
  const isExpiringSoon = false; // TODO: Check credit expiry dates

  // Role-based navigation
  const getNavigation = () => {
    switch (profile?.role) {
      case "student":
        return [
          { name: "Dashboard", icon: Home, current: activeTab === "dashboard" },
          {
            name: "Book Session",
            icon: Plus,
            current: activeTab === "book",
          },
          {
            name: "Activities",
            icon: FileText,
            current: activeTab === "activities",
          },
          {
            name: "Schedule",
            icon: Calendar,
            current: activeTab === "schedule",
          },
          {
            name: "Credits",
            icon: CreditCard,
            current: activeTab === "credits",
          },
          {
            name: "Feedback",
            icon: MessageSquare,
            current: activeTab === "feedback",
          },
          {
            name: "Settings",
            icon: Settings,
            current: activeTab === "settings",
          },
        ];
      case "tutor":
        return [
          { name: "Dashboard", icon: Home, current: activeTab === "dashboard" },
          {
            name: "Setup",
            icon: Settings,
            current: activeTab === "setup",
          },
          {
            name: "Schedule",
            icon: Calendar,
            current: activeTab === "schedule",
          },
          { name: "Students", icon: User, current: activeTab === "students" },
          {
            name: "Earnings",
            icon: DollarSign,
            current: activeTab === "earnings",
          },
          { name: "Feedback", icon: Star, current: activeTab === "feedback" },
          {
            name: "Settings",
            icon: Settings,
            current: activeTab === "settings",
          },
        ];
      case "admin":
      case "ops_admin":
        return [
          { name: "Dashboard", icon: Home, current: activeTab === "dashboard" },
          { name: "Users", icon: Users, current: activeTab === "users" },
          {
            name: "Bookings",
            icon: Calendar,
            current: activeTab === "bookings",
          },
          { name: "Tutors", icon: User, current: activeTab === "tutors" },
          {
            name: "Analytics",
            icon: BarChart3,
            current: activeTab === "analytics",
          },
          {
            name: "Settings",
            icon: Settings,
            current: activeTab === "settings",
          },
        ];
      default:
        return [
          { name: "Dashboard", icon: Home, current: activeTab === "dashboard" },
          {
            name: "Settings",
            icon: Settings,
            current: activeTab === "settings",
          },
        ];
    }
  };

  // Content rendering functions
  const renderStudentContent = () => {
    switch (activeTab) {
      case "book":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Book a Session
              </h3>
              <p className="text-gray-600 mb-6">
                Select a tutor and choose from their available time slots.
              </p>

              <div className="space-y-6">
                <TutorSelector
                  onTutorSelect={setSelectedTutor}
                  selectedTutor={selectedTutor}
                />

                {selectedTutor && (
                  <>
                    <TimeSlotPicker
                      tutorId={selectedTutor.user_id}
                      tutorName={selectedTutor.display_name}
                      onSlotSelect={setSelectedSlot}
                      selectedSlot={selectedSlot}
                    />
                  </>
                )}

                {selectedTutor && selectedSlot && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Booking Summary
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <strong>Tutor:</strong> {selectedTutor.display_name}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedSlot.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p>
                        <strong>Tutor Available:</strong> {selectedSlot.time}
                      </p>
                      {selectedSlot.startTime && selectedSlot.endTime ? (
                        <>
                          <p>
                            <strong>Your Session:</strong>{" "}
                            {selectedSlot.startTime} - {selectedSlot.endTime}
                          </p>
                        </>
                      ) : (
                        <p className="text-amber-600">
                          <strong>
                            ⚠️ Please select your start and end times above
                          </strong>
                        </p>
                      )}
                      <p>
                        <strong>Duration:</strong> {selectedSlot.duration}{" "}
                        minutes
                      </p>
                      <p>
                        <strong>Credits:</strong>{" "}
                        {selectedSlot.duration === 30 ? "1" : "2"} credit
                        {selectedSlot.duration === 60 ? "s" : ""}
                      </p>
                    </div>

                    <button
                      onClick={handleBookSession}
                      disabled={
                        bookingLoading ||
                        !selectedSlot.startTime ||
                        !selectedSlot.endTime
                      }
                      className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bookingLoading
                        ? "Sending Request..."
                        : "Send Booking Request"}
                    </button>
                  </div>
                )}

                {bookingMessage && (
                  <div
                    className={`p-3 rounded-md text-sm ${
                      bookingMessage.includes("Error")
                        ? "bg-red-50 text-red-800"
                        : "bg-blue-50 text-blue-800"
                    }`}
                  >
                    {bookingMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Credit Warnings */}
            {(isLowCredits || isExpiringSoon) && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                  <div>
                    {isLowCredits && (
                      <p className="text-amber-800 font-medium">
                        Low credits! You have {balance} credits remaining.
                      </p>
                    )}
                    {isExpiringSoon && (
                      <p className="text-amber-800 font-medium">
                        Some credits will expire soon. Use them before they
                        expire!
                      </p>
                    )}
                    <button
                      onClick={() => setActiveTab("credits")}
                      className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Buy Credits
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Credits</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {balance ?? 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Sessions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {sessions.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Activities
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {activities.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Session Card */}
            <div className="bg-white rounded-lg shadow border-2 border-dashed border-gray-300 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Book a Session
                </h3>
                <p className="text-gray-500 mb-4">
                  Schedule a tutoring session with one of our expert tutors
                </p>
                <button
                  onClick={() => setActiveTab("book")}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Book Session
                </button>
              </div>
            </div>

            {/* Recent Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No sessions scheduled</p>
                  <p className="text-sm">
                    Book a session with a tutor to get started
                  </p>
                </div>
              ) : (
                sessions.slice(0, 6).map((session) => (
                  <div
                    key={session.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {new Date(session.start_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(session.start_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.status === "booked"
                            ? "bg-green-100 text-green-800"
                            : session.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {session.duration_min} minutes
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2" />
                        {session.credits_charged} credits
                      </div>
                    </div>
                    {session.status === "booked" && (
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700">
                          Join Meeting
                        </button>
                        <button
                          onClick={() => cancelSession(session.id)}
                          className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "activities":
        return (
          <div className="space-y-6">
            {/* File Upload Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Upload Activities & Assignments
                </h3>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Upload your completed assignments, homework, or activity files.
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF,
                WEBP
              </p>
            </div>

            {/* File Manager */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                My Files
              </h3>
              <FileManager
                files={uploadedFiles}
                onDelete={handleFileDelete}
                onView={handleFileView}
                canDelete={true}
                canDownload={true}
              />
            </div>

            {/* Assigned Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Assigned Activities
              </h3>
              {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No activities assigned yet</p>
                  <p className="text-sm">
                    Your tutors will upload activities here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-gray-600">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            Due: {activity.due_date}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">My Schedule</h3>
            </div>
            <div className="p-6">
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No sessions scheduled</p>
                  <p className="text-sm">
                    Book a session with a tutor to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <p className="font-medium">
                              {new Date(session.start_at).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {session.duration_min} minutes ·{" "}
                              {session.credits_charged} credits
                            </p>
                            <p className="text-xs text-gray-500">
                              Status: {session.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {session.status === "booked" && (
                            <>
                              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                                Join Meeting
                              </button>
                              <button
                                onClick={() => cancelSession(session.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "credits":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Credit Balance
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {balance ?? 0}
                </div>
                <p className="text-gray-600 mb-4">Available Credits</p>
                <div className="space-y-2">
                  <a
                    href="/pricing"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Buy More Credits
                  </a>
                  <p className="text-xs text-gray-500 text-center">
                    Opens pricing page in new tab
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Billing Information
              </h3>
              {!showBilling ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Enter password to view billing details
                  </p>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Billing password"
                      value={billingPassword}
                      onChange={(e) => setBillingPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <button
                      onClick={handleBillingAccess}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                    >
                      Access Billing
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <h4 className="font-medium">Transaction History</h4>
                    <p className="text-sm text-gray-600">No transactions yet</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium">Billing Period</h4>
                    <p className="text-sm text-gray-600">
                      Credits expire in 60 days
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Invoice Name</h4>
                    <p className="text-sm text-gray-600">
                      {profile?.full_name || "Parent Name"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "feedback":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Feedback & Reviews
            </h3>
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No feedback available yet</p>
              <p className="text-sm">
                Your tutors will provide feedback after sessions
              </p>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile?.full_name || ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={profile?.role || ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTutorContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Today's Sessions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      This Month
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">-</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Students
                    </p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Sessions
              </h3>
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No sessions scheduled</p>
                <p className="text-sm">
                  Your upcoming sessions will appear here
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center">
                    <Plus className="h-6 w-6 text-gray-400 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        Set Availability
                      </p>
                      <p className="text-sm text-gray-500">
                        Update your schedule
                      </p>
                    </div>
                  </div>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-gray-400 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        Upload Activity
                      </p>
                      <p className="text-sm text-gray-500">
                        Share materials with students
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  My Availability
                </h3>
              </div>
              <CalendarAvailabilityEditor />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Booking Requests
                </h3>
              </div>
              <BookingRequestsPanel />
            </div>
          </div>
        );

      case "students":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              My Students
            </h3>
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No students yet</p>
              <p className="text-sm">
                Students will appear here after booking sessions
              </p>
            </div>
          </div>
        );

      case "earnings":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Earnings Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">$0.00</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">$0.00</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">$0.00</p>
                  <p className="text-sm text-gray-500">Total Earned</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment History
              </h3>
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No payments yet</p>
                <p className="text-sm">
                  Your earnings will appear here after sessions
                </p>
              </div>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Submit Feedback
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Select a student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Select a session</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Provide feedback on the student's progress..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Submit Feedback
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Feedback
              </h3>
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No feedback submitted yet</p>
                <p className="text-sm">
                  Your feedback submissions will appear here
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tutor Dashboard
            </h3>
            <p className="text-gray-600">
              Tutor dashboard features coming soon...
            </p>
          </div>
        );
    }
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Bookings
                    </p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Tutors</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$0</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Bookings
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent bookings</p>
                  <p className="text-sm">
                    New session bookings will appear here
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Pending Approvals
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No pending approvals</p>
                  <p className="text-sm">
                    Tutor applications and payments will appear here
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center">
                    <User className="h-6 w-6 text-gray-400 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        Review Applications
                      </p>
                      <p className="text-sm text-gray-500">
                        Approve tutor applications
                      </p>
                    </div>
                  </div>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-gray-400 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        Process Payments
                      </p>
                      <p className="text-sm text-gray-500">
                        Approve tutor payouts
                      </p>
                    </div>
                  </div>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <div className="flex items-center">
                    <BarChart3 className="h-6 w-6 text-gray-400 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        Generate Reports
                      </p>
                      <p className="text-sm text-gray-500">
                        Export analytics data
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                User Management
              </h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Add User
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "bookings":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Session Management
              </h3>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md">
                  <option>All Sessions</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>

            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No sessions found</p>
              <p className="text-sm">Session bookings will appear here</p>
            </div>
          </div>
        );

      case "tutors":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Tutor Applications
                </h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-md">
                    <option>All Applications</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>

              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No tutor applications</p>
                <p className="text-sm">Tutor applications will appear here</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Active Tutors
              </h3>
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active tutors</p>
                <p className="text-sm">Approved tutors will appear here</p>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Revenue Analytics
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No revenue data</p>
                  <p className="text-sm">Revenue charts will appear here</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  User Growth
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No growth data</p>
                  <p className="text-sm">User growth charts will appear here</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  System Reports
                </h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2 inline" />
                    Export Excel
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    <Download className="h-4 w-4 mr-2 inline" />
                    Export PDF
                  </button>
                </div>
              </div>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No reports available</p>
                <p className="text-sm">
                  Generate reports to view system analytics
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Admin Dashboard
            </h3>
            <p className="text-gray-600">
              Admin dashboard features coming soon...
            </p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (profile?.role) {
      case "student":
        return renderStudentContent();
      case "tutor":
        return renderTutorContent();
      case "admin":
      case "ops_admin":
        return renderAdminContent();
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Dashboard
            </h3>
            <p className="text-gray-600">Welcome to your dashboard!</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <h1 className="text-xl font-bold text-white">SBTLC</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-3">
            {getNavigation().map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name.toLowerCase())}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                  item.current
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {profile?.full_name || user?.email}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {profile?.role || "User"}
              </p>
              <p className="text-xs text-gray-500 font-mono">ID: {user?.id}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                {activeTab}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {actionMsg && (
              <div className="mb-4 p-3 bg-blue-50 text-blue-800 text-sm rounded-md">
                {actionMsg}
              </div>
            )}
            {renderContent()}
          </div>
        </main>
      </div>

      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setShowUploadModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Upload Files
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <FileUpload
                  onFilesSelected={handleFileUpload}
                  maxFiles={5}
                  maxSize={10}
                  className="w-full"
                />
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
