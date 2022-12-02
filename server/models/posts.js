import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    chapter_id: Number,
    chapter_number: Number,
    externalId: Number,
    id: Number,
    shloka_hindi: String,
    title: {
        type: String,
        required: true
    },
    verse_number: Number, 
    verse_order: Number,
    shloka_transliteration: String,
    word_meanings: String,
    description: String,
    tags: [String],
    comments: {
        type: [String],
        default: [],
    },
    imageFiles: [{'image': String, 'desc': String}],
    audioFiles: [{'audio': String, 'desc': String}],
    youtubeLink: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;