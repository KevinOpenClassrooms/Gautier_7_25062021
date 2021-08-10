const database = require('../config/database.js');
const Comment = require('../models/Comment.js');

/* logique pour afficher l'ensemble des commentaires d'un post */
exports.getAllComments = (req, res) => {
    try {
        Comment.findAll()
            .then(comments => {
                console.log("postId:", req.params.postId)
                res.status(200).json(comments);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour créer un commentaire */
exports.createComment = (req, res) => {
    try {
        console.log(req.body);
        let { text, userId, postId } = req.body;
        Post.create({text, postId, userId})
            .then(newComment => {
                console.log("nouveau commentaire créé");
                res.status(201).json(newComment);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

/* logique pour afficher un commentaire (en fonction de son id) */
exports.getOneComment = (req, res) => {
    try {
        Post.findOne({where: {id:req.params.id}})
            .then(comment => {
                console.log("Commentaire trouvé:", comment.id);
                res.status(200).json(comment);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour supprimer un commentaire */
exports.deleteComment = (req, res) => {
    try {
        console.log(req.params.id);
        Comment.destroy({where: {id:req.params.id}})
            .then(comment => {
                console.log("Commentaire supprimé");
                res.status(200).json(comment);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour modifier un commentaire */
exports.editComment = (req, res) => {
    try {
        Comment.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                let updatedComment = {...req.body}
                res.status(201).json(updatedComment)
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};