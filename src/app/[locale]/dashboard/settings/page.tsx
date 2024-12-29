"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTranslations } from 'next-intl'
import ChangePasswordDialog from '@/components/utilities/change-password-dialog'
import ChangeEmailDialog from '@/components/utilities/change-email-dialog'
import { logout } from '@/lib/firebase/auth'

export default function SettingsPage() {

    const [currentPlan, setCurrentPlan] = useState('basic')
    const [isOpenPassword, setIsOpenPassword] = useState(false)
    const [isOpenEmail, setIsOpenEmail] = useState(false)
    const t = useTranslations("DashboardPage")

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">{t("settings")}</h1>

            <ChangePasswordDialog t={t} isOpen={isOpenPassword} setIsOpen={setIsOpenPassword}/>
            <ChangeEmailDialog t={t} isOpen={isOpenEmail} setIsOpen={setIsOpenEmail}/>

            <div className="space-y-8">
                {/* Payment Plan */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t("settingsPage.payment_plan")}</CardTitle>
                        <CardDescription>{`${t("settingsPage.your_current_plan_is")}: ${currentPlan}`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select onValueChange={(value: any) => setCurrentPlan(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="basic">{t("settingsPage.basic")}</SelectItem>
                                <SelectItem value="pro">{t("settingsPage.pro")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                    <CardFooter>
                        <Button>{t("settingsPage.upgrade_plan")}</Button>
                    </CardFooter>
                </Card>

                {/* Account Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t("settingsPage.account_settings")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t("settingsPage.name")}</Label>
                            <Input id="name" placeholder="Your Name" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>{t("settingsPage.save_changes")}</Button>
                    </CardFooter>
                </Card>

                {/* Domain Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t("settingsPage.domain_settings")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="domain">{t("settingsPage.custom_domain")}</Label>
                            <Input id="domain" placeholder="yourdomain.com" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>{t("settingsPage.update_domain")}</Button>
                    </CardFooter>
                </Card>

                {/* Account Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t("settingsPage.account_actions")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button onClick={()=> setIsOpenPassword(true)} variant="outline">{t("settingsPage.change_password")}</Button>
                        <Button onClick={()=> setIsOpenEmail(true)} variant="outline">{t("settingsPage.change_email")}</Button>
                        <Button onClick={()=> logout()} variant="destructive">{t("settingsPage.logout")}</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

