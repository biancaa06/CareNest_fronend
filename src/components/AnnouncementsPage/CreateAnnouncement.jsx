import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { useForm } from "react-hook-form";

function CreateAnnouncement({ onSubmit }) {
    const { 
        register,
        control, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-gray-700">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Create Announcement</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                   
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register("title", {
                                required: "Title is required",
                                maxLength: {
                                    value: 255,
                                    message: "Title cannot exceed 255 characters"
                                }
                            })}
                            className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700 ${
                                errors.title ? "border-red-500" : ""
                            }`}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description", {
                                required: "Description is required",
                                maxLength: {
                                    value: 8000,
                                    message: "Description cannot exceed 8000 characters"
                                }
                            })}
                            className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700 ${
                                errors.description ? "border-red-500" : ""
                            }`}
                            rows="4"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                        >
                            Create Announcement
                        </button>
                    </div>
                </form>
                <DevTool control={control} />
            </div>
        </div>
    );
}

export default CreateAnnouncement;
