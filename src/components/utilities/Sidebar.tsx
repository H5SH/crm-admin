"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Salad, Settings, GitBranch, Users, ShoppingBag, Globe, Smartphone, Coffee, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Menu', href: '/dashboard/menu', icon: Salad },
  { name: 'Branches', href: '/dashboard/branches', icon: GitBranch },
  { name: 'Registered Users', href: '/dashboard/users', icon: Users },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Website', href: '/dashboard/website', icon: Globe },
  { name: 'App', href: '/dashboard/app', icon: Smartphone },
  { name: 'Restaurant Manager', href: '/dashboard/manager', icon: Coffee },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },

]

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity duration-200 md:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between px-4 mb-6">
          <span className="text-2xl font-semibold">Dashboard</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav>
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
                pathname.endsWith(item.href) ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}>
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

