import { ReactNode } from "react"

export type TUserPaths ={
    name?:string,
    path?:string,
    element?:ReactNode,
    children?:TUserPaths[]
}

export type TRoute = {
    path:string,
    element:ReactNode
}