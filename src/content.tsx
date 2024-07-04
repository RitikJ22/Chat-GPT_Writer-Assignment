import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"

import { CountButton } from "~features/CountButton"

import Brush from "../assets/brush.png"
import PlasmoModal from "./features/PlasmoModal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [isGenerate, setIsGenerate] = useState(true)

  useEffect(() => {
    const handleFocus = (event: Event) => {
      const activeElement = event.target as HTMLElement
      const isMessageBox = activeElement.matches(
        "div.msg-form__contenteditable"
      )
      const shouldAppendEmoji =
        isMessageBox && !activeElement.textContent?.trim()

      if (shouldAppendEmoji) {
        activeElement.appendChild(createIconElement())
      } else {
        removeIconElement()
      }
    }

    document.addEventListener("focus", handleFocus, true)

    if (isPopupOpen) {
      const dialogElement = document
        .querySelector("html > plasmo-csui")
        ?.shadowRoot?.querySelector("#modal")
      dialogElement?.addEventListener(
        "click",
        handleDialogClick as EventListener
      )
    }

    return () => {
      document.removeEventListener("focus", handleFocus)
      removeIconElement()
    }
  }, [isPopupOpen])

  const handleDialogClick = (event: Event) => {
    const targetElement = event.target as HTMLElement
    if (targetElement.id === "modal") {
      setIsPopupOpen(false)
    }
  }

  const createIconElement = () => {
    const imgElement = document.createElement("img")
    imgElement.src = Brush
    imgElement.alt = "Vector Emoji"
    imgElement.style.position = "absolute"
    imgElement.style.width = "32px"
    imgElement.style.height = "32px"
    imgElement.style.bottom = "2px"
    imgElement.style.right = "4px"
    imgElement.style.cursor = "pointer"
    imgElement.addEventListener("click", handleEmojiClick)
    return imgElement
  }

  const removeIconElement = () => {
    const existingImgElement = document.querySelector("img[alt='Vector Emoji']")
    existingImgElement?.parentNode?.removeChild(existingImgElement)
  }

  const handleEmojiClick = () => {
    setIsPopupOpen(true)
    setInputValue("")
    setChatMessages([])
  }

  const handleGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setChatMessages([
      ...chatMessages,
      inputValue,
      ":Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    ])
    setInputValue("")
    setIsGenerate(false)
  }

  const handleInsert = () => {
    setIsPopupOpen(false)
    const messageBox = document.querySelector("div.msg-form__contenteditable")
    const messageBoxFill = messageBox?.querySelector("p")

    const inputFieldMessage = document.querySelector(
      "#msg-form-ember131 > div.msg-form__msg-content-container.msg-form__message-texteditor.relative.flex-grow-1.display-flex > div > div.flex-grow-1.relative > div.msg-form__placeholder.t-14.t-black--light.t-normal"
    )
    inputFieldMessage?.setAttribute("data-placeholder", "")

    if (messageBoxFill) {
      messageBoxFill.innerText =
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
      messageBox?.appendChild(createIconElement())
    }

    setInputValue("")
    setIsGenerate(true)
  }

  return (
    <div id="main">
      <div className="z-50 flex fixed top-32 right-8">
        <CountButton />
      </div>

      {isPopupOpen && (
        <PlasmoModal
          handleClosePopup={handleDialogClick}
          chatMessages={chatMessages}
          inputValue={inputValue}
          isGenerate={isGenerate}
          handleGenerate={handleGenerate}
          handleInsert={handleInsert}
          setInputValue={setInputValue}
        />
      )}
    </div>
  )
}

export default PlasmoOverlay
