import React from "react"

import ArrowIcon from "./assets/arrow.svg"

type PlasmoModalProps = {
  handleClosePopup: (e: Event) => void
  chatMessages: string[]
  inputValue: string
  isGenerate: boolean
  handleGenerate: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleInsert: React.DispatchWithoutAction
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const PlasmoModal = ({
  handleClosePopup,
  chatMessages,
  inputValue,
  isGenerate,
  handleGenerate,
  handleInsert,
  setInputValue
}: PlasmoModalProps) => {
  const isInputEmpty = inputValue.trim() === ""

  return (
    <>
      <div
        id="modal"
        className="fixed bottom-0 left-0 w-full h-full flex items-center justify-center p-4 z-50 rounded-3xl"
        onClick={(e) => handleClosePopup(e as unknown as Event)}>
        <div
          id="myDiv"
          className="bg-white p-4 border rounded shadow max-w-xl w-full overflow-y-auto max-h-96 z-50"
          onClick={(e) => e.stopPropagation()}>
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 flex ${message.startsWith(":") ? "justify-start" : "justify-end"}`}>
              <div
                className={`p-2 ${message.startsWith(":") ? "bg-blue-500 text-white mb-2 rounded-md" : "bg-gray-300 text-black mb-2 rounded-md"}`}>
                {message}
              </div>
            </div>
          ))}

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="p-2 border w-full rounded-lg border-[#C1C7D0]"
                placeholder="Your prompt"
              />
            </div>
            <div className="flex items-center justify-end mt-2">
              {isGenerate ? (
                <button
                  onClick={handleGenerate}
                  className={`bg-[#3B82F6] text-white p-2 rounded-md ml-2 flex items-center justify-center gap-2 ${isInputEmpty ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isInputEmpty}>
                  <img src={ArrowIcon} alt="icon" className="w-5 h-5" />
                  <span>Generate</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleInsert}
                    className="bg-blue-500 text-white p-2 rounded-md ml-2">
                    Insert
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="bg-gray-300 text-white p-2 rounded-md ml-2 cursor-pointer">
                    Regenerate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlasmoModal
