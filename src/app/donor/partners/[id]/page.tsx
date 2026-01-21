"use client"

import { useRouter } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowLeft, Edit2, Trash2, Plus } from "lucide-react"
import { useState } from "react"

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border ${className}`}>{children}</div>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

const Button = ({ children, onClick, variant = "default", size = "default", className = "", ...props }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm"
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded font-medium transition ${
      variant === "outline" ? "border border-gray-300 text-gray-700 hover:bg-gray-50" :
      variant === "ghost" ? "hover:bg-gray-100" :
      "bg-blue-600 text-white hover:bg-blue-700"
    } ${
      size === "sm" ? "px-3 py-1 text-sm" : ""
    } ${className}`}
    {...props}
  >
    {children}
  </button>
)

const partnersData: Record<number, any> = {
  1: { id: 1, name: "Tech Skills Academy", email: "contact@techskills.org", phone: "+1-555-0101", address: "123 Tech Street, Silicon Valley, CA 94025", enrollment: 450, attendance: 92, employment: 87, gender_f: 210, disability: 18, status: "Active", region: "North America", programs: 5, staff: 24, branches: [{ id: "branch-1", name: "Tech Skills Academy - Kigali", location: "Kigali", address: "KN 4 Ave, Kigali, Rwanda", managerName: "Jean Claude Muhirwa", managerPhone: "+250-788-123-456", managerEmail: "jean@techskills.rw", enrollment: 250, attendance: 93 }, { id: "branch-2", name: "Tech Skills Academy - Huye", location: "Huye", address: "Huye Town Centre, Huye, Rwanda", managerName: "Alice Mukamana", managerPhone: "+250-788-987-654", managerEmail: "alice@techskills.rw", enrollment: 200, attendance: 91 }] },
  2: { id: 2, name: "Digital Future Initiative", email: "info@digitalfuture.org", phone: "+1-555-0102", address: "456 Digital Ave, New York, NY 10001", enrollment: 380, attendance: 88, employment: 82, gender_f: 195, disability: 14, status: "Active", region: "North America", programs: 4, staff: 18, branches: [] },
  3: { id: 3, name: "Youth Empowerment Center", email: "admin@youthcenter.org", phone: "+1-555-0103", address: "789 Youth Blvd, Los Angeles, CA 90001", enrollment: 520, attendance: 90, employment: 85, gender_f: 280, disability: 25, status: "Active", region: "North America", programs: 6, staff: 32, branches: [] },
  4: { id: 4, name: "Enterprise Solutions Ltd", email: "contact@enterprise.org", phone: "+1-555-0104", address: "321 Enterprise Dr, Chicago, IL 60601", enrollment: 290, attendance: 89, employment: 80, gender_f: 140, disability: 12, status: "Active", region: "North America", programs: 3, staff: 16, branches: [] },
  5: { id: 5, name: "Community Development Hub", email: "info@commdev.org", phone: "+1-555-0105", address: "654 Community Way, Houston, TX 77001", enrollment: 410, attendance: 87, employment: 78, gender_f: 220, disability: 20, status: "Onboarding", region: "North America", programs: 4, staff: 20, branches: [] },
}

const monthlyData = [
  { month: "Jan", enrollment: 35, attendance: 33, employment: 30 },
  { month: "Feb", enrollment: 38, attendance: 35, employment: 31 },
  { month: "Mar", enrollment: 42, attendance: 38, employment: 34 },
  { month: "Apr", enrollment: 45, attendance: 41, employment: 36 },
  { month: "May", enrollment: 48, attendance: 44, employment: 38 },
  { month: "Jun", enrollment: 50, attendance: 46, employment: 40 },
]

const BranchCard = ({ branch, onEdit, onDelete }: any) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">{branch.name}</CardTitle>
          <p className="text-sm text-gray-600 mt-1">{branch.location}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit}><Edit2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm" onClick={onDelete}><Trash2 className="w-4 h-4 text-red-600" /></Button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div>
        <p className="text-sm text-gray-600">Address</p>
        <p className="text-sm font-medium">{branch.address}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Manager</p>
        <p className="text-sm font-medium">{branch.managerName}</p>
        <p className="text-sm text-gray-600">{branch.managerEmail}</p>
        <p className="text-sm text-gray-600">{branch.managerPhone}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
        <div>
          <p className="text-sm text-gray-600">Enrollment</p>
          <p className="text-lg font-bold">{branch.enrollment}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Attendance</p>
          <p className="text-lg font-bold">{branch.attendance}%</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function PartnerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const partner = partnersData[Number.parseInt(params.id)]
  const [branches, setBranches] = useState(partner?.branches || [])

  if (!partner) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partner not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    )
  }

  const demographicsData = [
    { name: "Female", value: partner.gender_f, fill: "#0B609D" },
    { name: "Male", value: partner.enrollment - partner.gender_f, fill: "#34597E" },
  ]

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{partner.name}</h1>
            <p className="text-gray-600 mt-1">{partner.region} • {partner.programs} Programs • {branches.length} Branches</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{partner.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{partner.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Head Office Address</p>
              <p className="font-medium text-gray-900">{partner.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block mt-1 ${partner.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {partner.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Programs</p>
              <p className="font-medium text-gray-900">{partner.programs} Active Programs</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Staff Members</p>
              <p className="font-medium text-gray-900">{partner.staff} Staff</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Enrollments</p>
            <p className="text-3xl font-bold text-gray-900">{partner.enrollment}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
            <p className="text-3xl font-bold text-gray-900">{partner.attendance}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Employment Rate</p>
            <p className="text-3xl font-bold text-gray-900">{partner.employment}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Female Participants</p>
            <p className="text-3xl font-bold text-gray-900">{Math.round((partner.gender_f / partner.enrollment) * 100)}%</p>
          </CardContent>
        </Card>
      </div>

      {branches.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Branches ({branches.length})</h2>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Branch
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                onEdit={() => console.log("Edit branch:", branch.id)}
                onDelete={() => setBranches(branches.filter((b) => b.id !== branch.id))}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enrollment" stroke="#0B609D" strokeWidth={2} />
                <Line type="monotone" dataKey="attendance" stroke="#34597E" strokeWidth={2} />
                <Line type="monotone" dataKey="employment" stroke="#EEF3FD" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demographics Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={demographicsData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} dataKey="value">
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
