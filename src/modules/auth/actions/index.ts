"use server"

import {auth} from "../../../../auth"
import { db } from "@/lib/db"


export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      },
      include:{
        accounts: true
      }
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

export const getAccountByUseriId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId
      }
    })
    return account
  } catch (error) {
    console.log(error)
  }
}

export const currentUser = async () => {
  try {
    const user = await auth();
    return user?.user
  } catch (error) {
    console.log(error)
  }
}





