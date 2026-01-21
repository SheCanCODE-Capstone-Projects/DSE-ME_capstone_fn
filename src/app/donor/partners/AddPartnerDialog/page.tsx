"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface Branch {
  id: string
  name: string
  city: string
  address: string
  managerName: string
  managerPhone: string
  managerEmail: string
  enrollment: string
  attendanceRate: string
}

export function AddPartnerDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [activeTab, setActiveTab] = useState("organization")
  const [branches, setBranches] = useState<Branch[]>([])
  const [branchForm, setBranchForm] = useState<Omit<Branch, 'id'>>({
    name: "",
    city: "",
    address: "",
    managerName: "",
    managerPhone: "",
    managerEmail: "",
    enrollment: "",
    attendanceRate: ""
  })

  const [orgForm, setOrgForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    region: "North America", // Default value
    staff: ""
  })

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setOrgForm(prev => ({ ...prev, [name]: value }))
  }

  const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBranchForm(prev => ({ ...prev, [name]: value }))
  }

  const addBranch = () => {
    if (!branchForm.name || !branchForm.city) return
    setBranches([...branches, { ...branchForm, id: Date.now().toString() }])
    setBranchForm({
      name: "",
      city: "",
      address: "",
      managerName: "",
      managerPhone: "",
      managerEmail: "",
      enrollment: "",
      attendanceRate: ""
    })
  }

  const removeBranch = (id: string) => {
    setBranches(branches.filter(branch => branch.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ orgForm, branches })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold">Add New Partner Organization</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="organization" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-md"
            >
              Organization
            </TabsTrigger>
            <TabsTrigger 
              value="branches" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-md"
            >
              Branches ({branches.length})
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-6">
            <TabsContent value="organization" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Organization Name</label>
                  <input
                    name="name"
                    value={orgForm.name}
                    onChange={handleOrgChange}
                    placeholder="e.g., Klab (K-Lab Ltd)"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={orgForm.email}
                    onChange={handleOrgChange}
                    placeholder="contact@org.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orgForm.phone}
                    onChange={handleOrgChange}
                    placeholder="+250-XXX-XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Head Office Address</label>
                  <input
                    name="address"
                    value={orgForm.address}
                    onChange={handleOrgChange}
                    placeholder="Street address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Region</label>
                  <select
                    name="region"
                    value={orgForm.region}
                    onChange={handleOrgChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Europe">Europe</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Total Staff Members</label>
                  <input
                    type="number"
                    name="staff"
                    value={orgForm.staff}
                    onChange={handleOrgChange}
                    placeholder="Across all branches"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 text-sm font-medium border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab('branches')}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  disabled={!orgForm.name || !orgForm.email}
                >
                  Next: Add Branches
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="branches" className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Add Branch</h3>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Branch Name</label>
                      <input
                        name="name"
                        value={branchForm.name}
                        onChange={handleBranchChange}
                        placeholder="e.g., Main Branch"
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        name="city"
                        value={branchForm.city}
                        onChange={handleBranchChange}
                        placeholder="City"
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div className="space-y-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        name="address"
                        value={branchForm.address}
                        onChange={handleBranchChange}
                        placeholder="Full address"
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Manager Name</label>
                      <input
                        name="managerName"
                        value={branchForm.managerName}
                        onChange={handleBranchChange}
                        placeholder="Manager's full name"
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Manager Phone</label>
                      <input
                        name="managerPhone"
                        value={branchForm.managerPhone}
                        onChange={handleBranchChange}
                        placeholder="+250-XXX-XXX"
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Manager Email</label>
                      <input
                        type="email"
                        name="managerEmail"
                        value={branchForm.managerEmail}
                        onChange={handleBranchChange}
                        placeholder="manager@example.com"
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Enrollment</label>
                      <input
                        type="number"
                        name="enrollment"
                        value={branchForm.enrollment}
                        onChange={handleBranchChange}
                        placeholder="Number of students"
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Attendance Rate</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="attendanceRate"
                          value={branchForm.attendanceRate}
                          onChange={handleBranchChange}
                          placeholder="0"
                          min="0"
                          max="100"
                          className="w-full text-sm pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="absolute left-3 top-2 text-gray-500 text-sm">%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      onClick={addBranch}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center space-x-2"
                      disabled={!branchForm.name || !branchForm.city}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Branch</span>
                    </Button>
                  </div>
                
                {branches.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-base font-medium text-gray-900 mb-3">Added Branches</h3>
                    <div className="space-y-3">
                      {branches.map((branch) => (
                        <div key={branch.id} className="p-4 border border-gray-200 rounded-md flex justify-between items-center bg-white hover:bg-gray-50">
                          <div>
                            <p className="font-medium text-sm text-gray-900">{branch.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{branch.city}, {branch.address}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeBranch(branch.id)}
                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab('organization')}
                  className="px-4 py-2 text-sm font-medium border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  disabled={!orgForm.name || !orgForm.email}
                >
                  Create Partner
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
