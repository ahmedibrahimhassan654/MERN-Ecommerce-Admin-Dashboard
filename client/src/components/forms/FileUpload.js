import React from 'react'
import  Resizer  from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';




const FileUpload=({ values, setValues, setLoading })=>{
    	const { user } = useSelector((state) => ({
		...state,
	}))


const fileUploadAndResize=(e)=>{
// console.log(e.target.files);
//resize
let files=e.target.files
 let allUploadedFiles = values.images;
if(files){
    setLoading(true)
    for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
            files[i],
            1000,
            1000 ,
            'JPEG',
            100,
            0,
            (uri)=>{
                console.log(uri);
              
        axios.post(
                `${process.env.REACT_APP_API}/addimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
                    },
                     "based64") ;



       
        
    }
    
}
//send back to server to upload to clodinary 
//set url to images [] in the parent compomenent state-product create 

}
return(
    <>
    <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
             // onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="m-3"
              />
            </Badge>
          ))}
      </div>
<div className='row'>
        
    <label className="btn btn-primary">
        Uploade Product images
    <input 
    type='file' 
    multiple 
    hidden
    accept='images/*'
    onChange={fileUploadAndResize}
    />
      </label>

    </div>
    </>

)

}

export default FileUpload