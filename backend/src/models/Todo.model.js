import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [200, "Description cannot exceed 200 characters"],
        default: ""
    },
    completed: {
        type: Boolean,
        default: false          
    },
   priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
   }
}, { timestamps: true });       

export default mongoose.model('Todo', todoSchema);
