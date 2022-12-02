import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Card, Grid, Grow } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { getPostById, getRecommendedPostsByPost } from '../../../actions/posts';
import Post from '../../Posts/Post/Post';
import { getPosts, getPostsBySearch } from '../../../actions/posts'

export const ListView = () => {
    let { posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { chapterNumber } = useParams();
    let ejsServerAddress = process.env.REACT_APP_EJS_SERVER_ADDRESS;

    useEffect(() => {
        if (chapterNumber) searchPost();
    }, [chapterNumber]);

    const searchPost = () => {
        dispatch(getPostsBySearch({ search: 'none', chapterNumber: chapterNumber }));
    }

    const openPost = (_id) => navigate(`/gita/chapter/${chapterNumber}/verse/${_id}`);

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }
    return (
        <div>
            <Paper style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }} elevation={6}>
                <div className={classes.section}>
                    <Typography variant='h6' align='center'>Chapter {chapterNumber}</Typography>
                </div>
            </Paper>

            {posts?.map((post) => (
                <div>
                    <Link to={`/gita/chapter/${chapterNumber}/verse/${post._id}`}>Shloka {post.verse_number} ({post.title})</Link>
                    {post?.imageFiles?.length ? (
                        <>
                            &nbsp;&nbsp;&nbsp;
                            Images:: 
                            {post.imageFiles.map((imageFile, index) => (
                                <a href={ejsServerAddress + `${imageFile.image}`} target="_blank">({index+1})</a>
                            ))}
                        </>
                    ) : <></>}
                    
                    {post?.audioFiles?.length ? (
                        <>
                            &nbsp;&nbsp;&nbsp;
                            Audio:: 
                            {post.audioFiles.map((audioFile, index) => (
                                <a href={ejsServerAddress + `${audioFile.audio}`} target="_blank">({index+1})</a>
                            ))}
                        </>
                    ) : <></>}
                    
                    &nbsp;&nbsp;&nbsp;
                    {post?.youtubeLink?.length ? (
                        <a href={post.title} target="_blank">Youtube Link</a>
                    ) : <></>}
                    
                    <Divider style={{ margin: '10px 0' }} />
                </div>
            ))}
        </div>
    )
}
