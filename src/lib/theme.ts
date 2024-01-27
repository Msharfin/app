import { writable } from "svelte/store"
import { browser } from "$app/environment"

const detectTheme = browser && localStorage.getItem("theme")
export const theme = writable(detectTheme)


export const changeTheme = () => {
  theme.update((oldTheme) => {
    const newTheme = oldTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("theme", newTheme)
    localStorage.setItem("theme", newTheme)
    return newTheme
  })
}