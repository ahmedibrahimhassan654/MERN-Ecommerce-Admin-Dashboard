import React from 'react'
import  Resizer  from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from 'react-redux';
// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';



const FileUpload=()=>{
    	const { user } = useSelector((state) => ({
		...state,
	}))


const fileUploadAndResize=(e)=>{
// console.log(e.target.files);
//resize
let files=e.target.files
if(files){
    for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
            files[i],
            720,
            720 ,
            'JPEG',
            100,0,
            (uri)=>{
        console.log(uri);
        }, "based64") ;



       
        
    }
}
//send back to server to upload to clodinary 
//set url to images [] in the parent compomenent state-product create 

}
return(
    <div className='row'>
    <label className="btn btn-primary">
        Uploade image
    <input 
    type='file' 
    multiple 
    hidden
    accept='images/*'
    onChange={fileUploadAndResize}
    />
      </label>
    {/* <Upload >
        <Button icon={<UploadOutlined onChange={fileUploadAndResize}/>}>Click to Upload</Button>
    </Upload>, */}

    </div>
)

}

export default FileUpload