import React, { useState } from 'react';
import axios from 'axios';
import {BaseUrl} from "./constants";

function UploadFile() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [error, setError] = useState('');

    const token = localStorage.getItem("token");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('myfile', file);

        try {
            const response = await axios.post(BaseUrl + "/file_upload", formData, {
                headers: {
                    "Authorization": `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadStatus(response.data.uploaded_file_url);
            setError('');
        } catch (error) {
            setError(error.response.data.error || 'An error occurred.');
            setUploadStatus('');
        }
    };

    return (
        <div>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {uploadStatus && <p>File uploaded successfully. URL: {uploadStatus}</p>}
        </div>
    );
}

export default UploadFile;
