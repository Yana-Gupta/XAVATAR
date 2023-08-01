import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

const Image = () => {
  const location = useLocation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)

  const queryParams = new URLSearchParams(location.search)

  const getNameLetters = (name: string | null): string | null => {
    let letter = ""
    if (name) {
      const words = name.split(" ").map((word) => word[0])
      for (var i = 0; i < words.length; i++) {
        letter += words[i]
      }
    }
    return letter
  }

  useEffect(() => {
    if (queryParams.get("name") != null) {
      setName(getNameLetters(queryParams.get("name")))
      console.log(name)
    }

    if (queryParams.get("color") != null) {
      setColor(queryParams.get("color"))
    }

    const divElement = document.createElement("div")

    if (name) {
      divElement.innerHTML = name
    }

    divElement.style.borderRadius = "50%"
    divElement.style.width = "100px"
    divElement.style.height = "100px"
    divElement.style.background =
      `linear-gradient(to right, ${color} 0%, #cecaca 65%, #B496C5 100%)`
    divElement.style.textAlign = "center"
    divElement.style.display = "flex"
    divElement.style.justifyContent = "center"
    divElement.style.alignItems = "center"
    document.body.appendChild(divElement)
  })

  return (
    <>
      <div ref={divRef} />
      <canvas ref={canvasRef} />
    </>
  )
}

export default Image
