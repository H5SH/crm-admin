import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogModel } from "../modals/dialog-models";


export default function ChangePasswordDialog({ t, isOpen, setIsOpen }: DialogModel) {

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("settingsPage.change_password")}</DialogTitle>
                    <DialogDescription>
                        {t("settingsPage.enter_your_current_and_new_password")}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">{t("settingsPage.current_password")}</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">{t("settingsPage.new_password")}</Label>
                        <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">{t("settingsPage.confirm_new_password")}</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">{t("settingsPage.change_password")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}