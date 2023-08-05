import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { getColor, getUpperWord } from "../helper/getcolor";


var colors: Array<string> = [];
getColor().then(res => { colors = res })



const ConvertToImage = () => {

  const [imageDataURL, setImageDataURL] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name: string = queryParams.get('name') as string
  const color: string = queryParams.get('color') as string


  useEffect(() => {
    const divElement: HTMLDivElement = document.getElementById("generator") as HTMLDivElement
    if (divElement) {
      html2canvas(divElement, { useCORS: true, backgroundColor: "transparent" })
        .then(function (canvas) {
          const dataURL: string = canvas.toDataURL();
          if (dataURL != "data:,") {
            setImageDataURL(dataURL);
          }
        })
        .catch((error: Error) => {
          console.error(error)
        })
      divElement.style.setProperty("display", "none")
    }
  }, []);


  return (
    <div style={{ backgroundColor: "transparent" }}>
      <div id="generator"
        style={{
          height: "200px",
          width: "200px",
          backgroundColor: "transparent",
        }}>
        <div
          style={{
            backgroundColor: "transparent",
            height: "100%",
            borderRadius: "50%",
            background: `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 20%, ${colors[2]} 40%, ${colors[3]} 60%, ${colors[4]} 80%, ${colors[5]} 100%)`,
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            alignContent: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "40px",
            color: `${color && color}`
          }}>
          <p>
            {name && getUpperWord(name)}
          </p>
        </div>

      </div>
      {imageDataURL && <img src={imageDataURL} alt="Captured content" />}
    </div>
  );
};

export default ConvertToImage;
