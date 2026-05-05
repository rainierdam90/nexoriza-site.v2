"use server"

import {
  checkAdminPassword,
  setAdminSession,
  clearAdminSession,
} from "@/lib/admin-auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "")

  if (!checkAdminPassword(password)) {
    // Server-action error: redirect with a flag in the URL.
    redirect("/admin/login?error=1")
  }

  await setAdminSession()
  redirect("/admin")
}

export async function logoutAction() {
  await clearAdminSession()
  redirect("/admin/login")
}
