import Blog from "./blog.model.js";
import cloudinary from "../../config/cloudinary.js";
import slugify from "slugify"
import fs from "fs/promises"


export const createBlog = async (req, res) => {
    try {
        const userId = req.userId
        if( !userId ){
            return res.status(400).json({ success: false, message: "Unauthorized User" })
        }

        const { title, content, category, tags, status, allowComments } = req.body

        if( !title || !content || !category ) return res.status(400).json({ success: false, message: "Missing required details" })

        if( !req.file ) return res.status(400).json({ success: false, message: "Cover image is required" })


        const uploadImage = await cloudinary.uploader.upload(req.file.path,
            { 
                resource_type: 'image',
                folder: "blogs"
            })    

            // deletes the file from the local server after it is uploaded on cloudinary 
        await fs.unlink(req.file.path)

        let slug = slugify(title,{
            lower: true,
            strict: true
        })

        const existingBlog = await Blog.findOne({slug})
        if( existingBlog ) slug = `${slug}-${Date.now()}`;


        const blog = await Blog.create({
            title,
            slug,
            content,
            category,
            tags: tags ? Array.isArray(tags) ? tags : tags.split(",").map( tag => tag.trim() ): [],
            status,
            allowComments,
            publishedAt: status === "published" ? new Date() : null,
            author: userId,
            coverImage:{
                url: uploadImage.secure_url,
                publicId: uploadImage.public_id
            }
        })

        return res.status(201).json({ success: true, message:"Blog created successfully", blog })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}