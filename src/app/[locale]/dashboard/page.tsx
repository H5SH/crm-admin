// src/app/[locale]/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { getCurrentUser, logout as signOutUser } from "@/lib/firebase/auth"; // Firebase helpers
import { withAuth } from "@/components/hoc/withAuth";
import { LoadingScreen } from "@/components/utilities/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Users, Menu, GitBranch } from 'lucide-react'

const DashboardPage = () => {
  const t = useTranslations("DashboardPage");
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
          try {
              const currentUser = await getCurrentUser();
              if (currentUser) {
                setLoading(false);
                setUser(currentUser);
              }
          } catch (err) {
              console.error(err);
              router.push('/sign-in'); // Redirect on error
          } 
          finally {
              setLoading(false);
          }
        };

        fetchUser();
    }, [router, locale]);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/sign-in'); // Redirect after logout
  };

  if (loading) {
    return (
      // <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingScreen />
      // </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <Menu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Branches</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);
