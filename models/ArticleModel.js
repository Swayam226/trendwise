import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: String,
    slug: String,
    meta: String,
    media: [String],  // image URLs, video links
    content: String,
}, { timestamps: true });

export const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);
