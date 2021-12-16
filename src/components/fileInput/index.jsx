import React, {useRef, useState} from 'react';
import './index.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";

function FileInput(props) {
    const [file, setFile] = useState(null)

    const inputRef = useRef()

    const {acceptTypes, onFileInput} = props

    function fileSelectedHandler(e) {
        const inputFile = e.target.files[0]
        if (inputFile) {
            setFile(inputFile)
            if (onFileInput)
                onFileInput(inputFile)
        }
    }

    return (
        <div className='file-input-container'>
            <input
                ref={inputRef}
                type='file'
                accept={acceptTypes}
                style={{'display': 'none'}}
                onChange={fileSelectedHandler}
            />
            <div className='small-title'>
                {props.title}
            </div>
            <div
                className='file-input-field flex-align-center flex-horizon-split'
                onClick={() => inputRef.current.click()}
            >
                <span className='file-input-text'>{file ? file.name : '点击上传文件'}</span>
                <FontAwesomeIcon icon={faEllipsisH} className='file-input-icon small-hover-btn'/>
            </div>
        </div>
    );
}

export default FileInput;