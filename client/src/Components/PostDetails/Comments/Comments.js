import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'wc-toast';

import { commentOnPost } from '../../../actions/posts';
import useStyles from './styles';

export const Comments = ({ post }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [userComment, setUserComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comments, setComments] = useState(post.comments);
    const commentsRef = useRef();

    const handlePostComment = async () => {
        const comment = `${user?.result?.name}: ${userComment}`;
        console.log(comment);
        if (user) {
            const newComments = await dispatch(commentOnPost(comment, post._id));
            setComments(newComments);
            setUserComment("");
            commentsRef.current.scrollIntoView({behavior: 'smooth'});
        } else {
            toast.error("Log in to post a comment");
        }
    }

    return (
        <div>
            <wc-toast></wc-toast>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((comment) => (
                        <Typography gutterBottom variant='subtitle2'>
                            <strong>{comment.split(":")[0]}:</strong>
                            {comment.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant='h6'>Write a comment</Typography>
                    <TextField
                        fullWidth
                        minRows={4}
                        variant='outlined'
                        multiline
                        value={userComment}
                        label='Comment'
                        onChange={(e) => setUserComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={!userComment} variant='contained' color='primary' onClick={handlePostComment}>Post</Button>
                </div>
            </div>
        </div>
    )
}
