import { DialogModel } from "../modals/dialog-models";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";



export default function ChangeEmailDialog({ t, isOpen, setIsOpen }: DialogModel) {

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("settingsPage.change_email")}</DialogTitle>
                    <DialogDescription>
                        {t("settingsPage.enter_your_email_address")}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-email">{t("settingsPage.new_email")}</Label>
                        <Input id="new-email" type="email" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">{t("settingsPage.change_email")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}