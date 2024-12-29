import { Dispatch, SetStateAction } from "react"

export interface DialogModel{
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    t: (s: string)=> string
}