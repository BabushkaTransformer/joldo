import {Uploader} from "uploader";
import {UploadButton} from "react-uploader";

const uploader = Uploader({
  apiKey: "free"
});

const options = {multi: true}

export const ImageUploader = (props) =>
  <UploadButton
    uploader={uploader}
    options={options}
    onComplete={files => {
      if (files.length === 0) {
        console.log('No files selected.')
      } else {
        console.log('Files uploaded:');
        console.log(files.map(f => f.fileUrl));
      }
    }}
    {...props}
  >
    {({onClick}) =>
      <button onClick={onClick}>
        Upload a file...
      </button>
    }
  </UploadButton>