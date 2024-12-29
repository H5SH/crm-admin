'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { onAuthStateChange, logout as signOutUser } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { LoadingScreen } from "../utilities/Loader";
import { useAppContext } from "../context/AppContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/config";
import { UserModal } from "../modals/utilities";


export function withPublicRoute(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)
    const { setUser } = useAppContext();

    useEffect(() => {
      const unsubscribe = onAuthStateChange(async (user: User | null) => {
        if (user) {
          const _user = await getDoc(doc(firestore, `users/${user.uid}`))
          const userData: UserModal | undefined = _user.data()
          if (user.emailVerified && userData?.role === "resturant_admin"){
            setUser(user)
            const from = searchParams.get('from')
            router.push(from || "/dashboard")
          } else if (!user.emailVerified) {
            setUser(user)
            await signOutUser()
            router.push("/verify-email")
          }
        } else {
          setLoading(false)
        }
      })

      return () => unsubscribe()
    }, [router, searchParams])

    if (loading) {
      return <LoadingScreen />
    }

    return <Component {...props} />
  }
};