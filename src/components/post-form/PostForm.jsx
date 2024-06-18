import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };


    // const handleFileSelect = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             // console.log(reader.result);
    //         };
    //         reader.readAsText(file);
    //     }
    // };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);



    return (
        <div className=" mx-auto mt-10 p-6 bg-gray-800 rounded-xl shadow-md outline-dashed">
            <h1 className="text-2xl font-bold mb-6 text-white">Create Post</h1>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
                <div>
                    <label className="block text-white text-lg text-left font-medium mt-4">Title</label>
                    <Input
                        placeholder="Title"
                        {...register("title", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <label className="block text-white text-lg text-left font-medium mt-4">Slug</label>
                    <Input
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    {/* <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} /> */}
                    <label className="block text-white text-lg text-left font-medium mt-4">Featured Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-white text-lg text-left font-medium mt-4">Content</label>
                    <RTE
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        {/* <label className="block text-gray-700 font-medium">Post Status</label> */}
                        <label className="block text-white text-lg text-left font-medium mt-4">Post Status</label>
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            {...register("status", { required: true })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

