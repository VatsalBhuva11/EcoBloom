import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const UploadPhoto = ({ nextStep, prevStep, handleChange, values }) => {
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };
    const Previous = (e) => {
        e.preventDefault();
        prevStep();
    };
    useEffect(() => {
        // create the preview
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(values.photo);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-12">
            <div class=" w-80 h-80">
                <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        {selectedFile === null ? (
                            <div>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG (MAX SIZE: 100kb)
                                </p>
                            </div>
                        ) : (
                            <div className=" text-gray-400 text-center gap-4 font-light flex flex-col justify-center items-center">
                                <img src={preview} className="h-20 w-20"></img>
                                <p>{selectedFile.name}</p>
                            </div>
                        )}
                    </div>
                    <input
                        onChange={(e) => {
                            handleChange(e, e.target.files[0]);
                            if (e.target.files.length > 0) {
                                setSelectedFile(e.target.files[0]);
                            }
                        }}
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
            <div className="flex justify-center items-center gap-4">
                <Button
                    onClick={Previous}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    PREV
                </Button>
                <Button
                    onClick={Continue}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default UploadPhoto;
