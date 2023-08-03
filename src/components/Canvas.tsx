import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { getColor, getUpperWord } from "../helper/getcolor";

const ConvertToImage = () => {

  const [imageDataURL, setImageDataURL] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  const name: string = queryParams.get('name') as string
  const color: string = queryParams.get('color') as string

  const [bgColor, setBgColor] = useState<Array<string>>([])

  useEffect(() => {

    const convertHTMLToImg = async () => {
      const divElement: HTMLDivElement = document.getElementById("generator") as HTMLDivElement
      var backgroundColors: Array<string> = await getColor(); 

      if (backgroundColors.length > 0) {
        setBgColor(backgroundColors)
        console.log("from canvas")
        console.log(backgroundColors)
        divElement.style.backgroundColor = bgColor[0]
        if (divElement) {

          html2canvas(divElement)
            .then(function (canvas) {
              const dataURL = canvas.toDataURL();
              if (dataURL != "data:,") {
                setImageDataURL(dataURL);
              }
            })
            .catch((error: Error) => {
              console.error(error)
            })

        }
        divElement.style.setProperty("display", "none")

      }
    }

    convertHTMLToImg()

  }, []);


  return (
    <div>
      <div id="generator"
        style={{
          height: "200px",
          width: "200px",
          borderRadius: "9999px",
          backgroundColor: "transparent",
          // background: `linear-gradient(to right, #ff8177 0%, #ff867a 10%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)`,
          // backgroundColor: bgColor[0],
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
      {imageDataURL && <img src={imageDataURL} alt="Captured content" />}
    </div>
  );
};

export default ConvertToImage;
