import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState("");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [qrColor, setQRColor] = useState("fafafa");
  const [bgColor, setBGColor] = useState("000000");
  const [selectedFormat, setSelectedFormat] = useState("svg");

  const generate = (e) => {
    e.preventDefault();
    if (data === "") {
      toast.warning("Please enter some data");
    } else {
      window.open(
        `https://api.qrserver.com/v1/create-qr-code/?data=${data}&;size=${height}x${width}&color=${qrColor}&bgcolor=${bgColor}&format=${selectedFormat}`,
        "_blank"
      );
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    if (data === "") {
      toast.warning("Please enter some data");
    } else {
      fetch(
        `https://api.qrserver.com/v1/create-qr-code/?data=${data}&;size=${height}x${width}&color=${qrColor}&bgcolor=${bgColor}&format=${selectedFormat}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `qrCode.${selectedFormat}`;
          link.click();
          URL.revokeObjectURL(blobUrl);
          toast.success("Download Successful");
        });
    }
  };
  return (
    <>
      <h1>QR Code Generator</h1>
      <div className="container">
        <form>
          <input
            type="text"
            placeholder="Enter Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <div className="subForm">
            <input
              type="number"
              placeholder="Enter Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="subForm">
            <div className="subForm">
              <label>QR Color</label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQRColor(e.target.value.slice(1))}
              />
            </div>
            <div className="subForm">
              <label>Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBGColor(e.target.value.slice(1))}
              />
            </div>
          </div>

          <div className="subForm">
            <label>Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="svg">SVG</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
          <button onClick={generate}>Generate</button>
          <button onClick={handleDownload}>Download</button>
        </form>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${data}&;size=${height}x${width}&color=${qrColor}&bgcolor=${bgColor}&format=${selectedFormat}`}
          alt=""
          title=""
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
