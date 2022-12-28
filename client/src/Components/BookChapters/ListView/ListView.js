import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { getPostById, getRecommendedPostsByPost } from '../../../actions/posts';
import Post from '../../Posts/Post/Post';
import { getPosts, getPostsBySearch } from '../../../actions/posts';
import { Form } from '../../Form/Form';
import { Roadmap } from '../../Roadmap/Roadmap';

export const ListView = () => {
    let ejsServerAddress = process.env.REACT_APP_EJS_SERVER_ADDRESS;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    let { posts, isLoading } = useSelector((state) => state.posts);
    const { chapterNumber, bookId } = useParams();
	const [displayAddShlokaForm, setDisplayAddShlokaForm] = useState(false);

    useEffect(() => {
        if (chapterNumber) searchPost();
    }, [chapterNumber]);

    const searchPost = () => {
        dispatch(getPostsBySearch({ chapterNumber: chapterNumber, bookId: bookId }));
    }

    const toggleAddShlokaForm = () => {
        setDisplayAddShlokaForm(!displayAddShlokaForm);
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
            <Roadmap />

            {posts?.map((post) => (
                <div>
                    <Link to={`/books/${bookId}/chapter/${chapterNumber}/verse/${post._id}`}>Shloka {post.verse_number}</Link>
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
                        <a href={post.youtubeLink} target="_blank">Youtube Link</a>
                    ) : <></>}
                    
                    <Divider style={{ margin: '10px 0' }} />
                    
                </div>
            ))}

			<Button variant="contained" color="primary" size='small' onClick={toggleAddShlokaForm}>Add Shloka</Button>

            {displayAddShlokaForm ? <Form /> : null}
        </div>
    )
}
