import Todo from "../models/Todo.model.js"
import ApiError from "../utils/ApiError.js"
import sendSuccessResponse from "../utils/ApiResponse.js"

export const createTodo = async (req, res, next) => {

    try {

        const { title, description, priority } = req.body

        if (!title) {
            return next(new ApiError(400, "title is required"))
        }
        const todo = await Todo.create({
            user: req.user._id,
            title,
            description,
            priority
        })
        sendSuccessResponse(res, 201, todo, "todo created successfully")

    } catch (error) {
        next(error)

    }

}


export const getTodo = async (req, res, next) => {
    try {

        const todos = await Todo.find({ user: req.user._id });
        sendSuccessResponse(res, 200, todos, "todo fetched successfully")

    } catch (error) {
        next(error)

    }

}

export const getTodoById = async (req, res, next) => {

    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if (!todo) {
            return next(new ApiError(404, "todo not found"))
        }
        sendSuccessResponse(res, 200, todo, "todo fetched successfully")

    } catch (error) {
        next(error)

    }

}

export const updateTodo = async (req, res, next) => {
    try {
        const { title, description, priority } = req.body

        const todo = await Todo.findOneAndUpdate({
            _id: req.params.id,
            user: req.user._id
        }, {
            title,
            description,
            priority
        }, {
            new: true,
            runValidators: true
        })

        if (!todo) {

            return next(new ApiError(404, "todo not found"))
        }
        sendSuccessResponse(res, 200, todo, "todo updated successfully")


    } catch (error) {
        next(error)

    }

}

export const toggleTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!todo) {

            return next(new ApiError(404, "todo not found"))
        }
        todo.completed = !todo.completed
        await todo.save()

        sendSuccessResponse(res, 200, todo, "todo updated successfully")

    } catch (error) {
        next(error)
    }
}

export const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })

        if (!todo) {

            return next(new ApiError(404, "todo not found"))
        }

        sendSuccessResponse(res, 200, todo, "todo deleted successfully")
    } catch (error) {
next(error)
    }
}