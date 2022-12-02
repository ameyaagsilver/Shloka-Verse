import mongoose from "mongoose";

const gitaChapterSchema = mongoose.Schema({
    chapter_number: String,
    chapter_name: String,
    name_hindi: String,
    chapter_name_meaning: String,
    chapter_name_transliterated: String,
    chapter_summary: String,
    chapter_summary_hindi: String,
    verses_count: Number,
    image: String,
});

const GitaChapter = mongoose.model('GitaChapter', gitaChapterSchema);

export default GitaChapter;