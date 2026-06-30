import Blog from "./blog.model.js";
import cloudinary from "../../config/cloudinary.js";
import slugify from "slugify"
import fs from "fs/promises"


export const createBlog = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({ success: false, message: "Unauthorized User" })
        }

        const { title, content, category, tags, visibility, allowComments } = req.body

        if (!title || !content || !category) return res.status(400).json({ success: false, message: "Missing required details" })

        if (!req.file) return res.status(400).json({ success: false, message: "Cover image is required" })

            console.log(req.file)
        const uploadImage = await cloudinary.uploader.upload(req.file.path,
            {
                resource_type: 'image',
                folder: "blogs"
            })
            console.log("Uploaded Image:", uploadImage)

        // deletes the file from the local server after it is uploaded on cloudinary 
        await fs.unlink(req.file.path)

        let slug = slugify(title, {
            lower: true,
            strict: true
        })

        const existingBlog = await Blog.findOne({ slug })
        if (existingBlog) slug = `${slug}-${Date.now()}`;


        const blog = await Blog.create({
            title,
            slug,
            content,
            category,
            visibility,
            tags: tags ? Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim()) : [],
            status:"published",
            allowComments,
            publishedAt: new Date(),
            author: userId,
            coverImage: {
                url: uploadImage.secure_url,
                publicId: uploadImage.public_id
            }
        })

        return res.status(201).json({ success: true, message: "Blog created successfully", blog })
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getUserBlogs = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({ success: false, message: "Unauthorized User" })
        }
        const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, blogs })
    }catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "name email profileImg")
        return res.status(200).json({ success: true, blogs })
    }catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getSingleBlog = async (req, res) => {
    const { slug } = req.params
    if(!slug){
        return res.status(400).json({ success: false, message: "Missing required details" })
    }
    try{
        const blog = await Blog.findOne({slug}).populate("author", "name email profileImg")
        if(!blog){
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        return res.status(200).json({ success: true, blog: blog })
    }catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteBlog = async (req, res) => {
    const { slug } = req.params
    if(!slug){
        return res.status(400).json({ success: false, message: "Missing required details" })
    }
    try{
        const blog = await Blog.findOne({slug})
        if(!blog){
            return res.status(404).json({ success: false, message: "Blog not found" })
        }

        const userId = req.userId
        if(blog.author.toString() !== userId){
            return res.status(403).json({ success: false, message: "Unauthorized User" })
        }

        await cloudinary.uploader.destroy(blog.coverImage.publicId);
        await blog.deleteOne()
        return res.status(200).json({ success: true, message: "Blog deleted successfully" })

    }catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const updateBlog = async (req, res) => {
    const { slug } = req.params
    if(!slug){
        return res.status(400).json({ success: false, message: "Missing required details" })
    }
    try{
        const blog = await Blog.findOne({slug})
        if(!blog){
            return res.status(404).json({ success: false, message: "Blog not found" })
        }

        const userId = req.userId
        if(blog.author.toString() !== userId){
            return res.status(403).json({ success: false, message: "Unauthorized User" })
        }

        const { title, content, category, tags, visibility, allowComments } = req.body

        if(title){
            blog.title = title
            blog.slug = slugify(title, {
                lower: true,
                strict: true
            })
        }
        if(content) blog.content = content
        if(category) blog.category = category
        if(tags) blog.tags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim())
        if(visibility) blog.visibility = visibility
        if(allowComments !== undefined) blog.allowComments = allowComments

        await blog.save()
        
        return res.status(200).json({ success: true, message: "Blog Updated successfully" })

    }catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getBlogsByCategory = async (req, res) => {
    const { category } = req.params
    if(!category){
        return res.status(400).json({ success: false, message: "Missing required details" })
    }
    try{
        const blogs = await Blog.find({category}).sort({ createdAt: -1 }).populate("author", "name email profileImg")
        return res.status(200).json({ success: true, blogs })
    }catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}