import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";


const ConvertToImage = () => {

  const [imageDataURL, setImageDataURL] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);



  useEffect(() => {
    const divElement = document.getElementById("generator")

    if (divElement) {
      html2canvas(divElement)
        .then(function (canvas) {
          const dataURL = canvas.toDataURL();

          if (dataURL != "data:,") {
            console.log("Hello world")
            setImageDataURL(dataURL);
          }
        })
        .catch(error =>
          console.error(error)
        )
    }
    divElement?.style.setProperty("display", "none")
  }, []);


  return (

    <div>
      <div id="generator"
        style={{
          height: "200px",
          width: "200px",
          borderRadius: "9999px",
          backgroundColor: "transparent",
          background: `linear-gradient(to right, #ff8177 0%, #ff867a 10%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)`,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          alignContent: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: "40px",
        }}>
        {/* Your content inside the hidden div */}
        <p>
          Y G
        </p>
      </div>
      {/* Display the image to users */}
      {imageDataURL && <img src={imageDataURL} alt="Captured content" />}
    </div>
  );
};

export default ConvertToImage;

