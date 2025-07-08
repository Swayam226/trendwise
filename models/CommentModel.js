import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    slug: String,
    author: String,
    content: String,
}, { timestamps: true });

export const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
