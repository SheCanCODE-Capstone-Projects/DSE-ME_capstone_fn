"use client"
import PrimaryButton from '@/components/PrimaryButton'
import { Plus } from 'lucide-react' 

function Participant() {
  const router = useRouter()

  return (
    <div className="h-screen flex flex-col">
      <header className="mt-6">{/* <Topbar /> */}</header>

      <div className="flex mt-8 gap-8">
        <aside className="hidden lg:block">
          {/* <Sidebar /> */}
          <p>sidebar</p>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Participants Management</h1>
              <p className="text-gray-600">Manage and track all participants in your cohort.</p>
            </div>

            <PrimaryButton
              label="Add Participant"
              icon={<Plus className="w-5 h-5" strokeWidth={2.5} />}
              onClick={() => router.push('/add-participant')} 
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Participant