const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching posts', error });
    }
}

exports.getOnePost = async (req, res) => {
     try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching posts', error });
    }
}


exports.createPost = async (req, res) => {
     try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching posts', error });
    }
}

exports.updatePost = async (req, res) => {
     try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching posts', error });
    }
}

exports.deletePost = async (req, res) => {
     try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching posts', error });
    }
}

