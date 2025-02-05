'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { getCurrentUser, onAuthStateChange } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { LoadingScreen } from "../utilities/Loader";
import { useLocale } from "next-intl";
import { useAppContext } from "../context/AppContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/config";
import { UserModal } from "../modals/utilities";

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter()
    const locale = useLocale();
    const [loading, setLoading] = useState(true)
    const { setUser } = useAppContext()

    useEffect(() => {
      const unsubscribe = onAuthStateChange(async (user: User | null) => {
        const _user = await getDoc(doc(firestore, `users/${user?.uid}`))
        const userData: UserModal | undefined = _user.data()
        if (!user && userData?.role !== "resturant_admin") {
          router.push('/sign-in')
        } else {
          setLoading(false)
        }
      })

      return () => unsubscribe()
    }, [router])

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const currentUser = await getCurrentUser();
          if (!currentUser) {
            router.push('/sign-in'); // Redirect if not authenticated
          } else if (!currentUser.emailVerified) {
            setUser(currentUser);
            router.push('/verify-email'); // Redirect if email not verified
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
          router.push('/sign-in'); // Redirect on error
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, [router, locale]);

    if (loading) {
      return <LoadingScreen />
    }

    return <Component {...props} />
  }
};