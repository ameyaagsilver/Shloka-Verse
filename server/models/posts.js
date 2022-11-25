import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        reqired: true
    },
    shlokaNumber: {
        type: String,
        required: true
    },
    name: String,
    message: String,
    creator: String,
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