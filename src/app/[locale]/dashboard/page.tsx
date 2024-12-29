// src/app/[locale]/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import auth, { getCurrentUser, logout as signOutUser } from "@/lib/firebase/auth"; // Firebase helpers
import { withAuth } from "@/components/hoc/withAuth";
import { LoadingScreen } from "@/components/utilities/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Users, Menu, GitBranch } from 'lucide-react'
import { useAppContext } from "@/components/context/AppContext";

const DashboardPage = () => {
  const t = useTranslations("DashboardPage");
  const locale = useLocale();
  const router = useRouter();
  const { setUser } = useAppContext();
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
              router.push('/sign-in'); // Redirect on error
          } 
          finally {
              setLoading(false);
          }
        };

        fetchUser();
    }, [router, locale]);

  if (loading) {
    return (
        <LoadingScreen />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{t('home')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("total_orders")}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("registered_users")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("menu_items")}</CardTitle>
            <Menu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("branches")}</CardTitle>
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
