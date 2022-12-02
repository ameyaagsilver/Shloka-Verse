import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Card, Grid, Grow } from '@material-ui/core/';
import { CardContent, ImageList, ImageListItem } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from "react-player";

import useStyles from './styles';
import { getPostById, getRecommendedPostsByPost } from '../../actions/posts';
import Post from '../Posts/Post/Post';
import { Comments } from './Comments/Comments';


export const PostDetails = () => {
    let { post, recommendedPosts, isLoading, isRecommendedPostsLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { bookId, chapterNumber, id } = useParams();
    let ejsServerAddress = process.env.REACT_APP_EJS_SERVER_ADDRESS;

    useEffect(() => {
        if (id) dispatch(getPostById(id));
    }, [id]);

    useEffect(() => {
        if (post) dispatch(getRecommendedPostsByPost(post));
    }, [post]);
    recommendedPosts = recommendedPosts.filter((p) => p._id !== post?._id);

    const openPost = (_id) => navigate(`/posts/${_id}`);

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    if (!isLoading && !post) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    No post exists with the given id
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h3">{post.title}</Typography>
                    <Typography variant="h5" component="h5">Chapter {post.chapter_number}, Shloka {post.verse_number}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <div >
                        {post.shloka_hindi.split("\n").map((item, index) => (
                            <div key={index} className={classes.middleContent}>
                                <Typography>{item}</Typography>
                            </div>
                        ))}
                        <Divider style={{ margin: '20px 0' }} />
                        {post.shloka_transliteration.split("\n").map((item, index) => (
                            <div key={index} className={classes.middleContent}>
                                <Typography>{item}</Typography>
                            </div>
                        ))}
                            <Divider style={{ margin: '20px 0' }} />
                            <div className={classes.section}>
                                <div className={classes.middleContent}>
                                    <Grow in>
                                        <ReactAudioPlayer 
                                            src={ejsServerAddress + "uploads/verse_recitation/" + post.chapter_number + "/" + post.verse_number + ".mp3"}
                                            controls
                                        />
                                    </Grow>
                                </div>
                            </div>
                            <Divider style={{ margin: '20px 0' }} />
                            {post.word_meanings}
                    </div>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                        {post.tags.map((tag) => (
                            <Link to={`/tags/${tag}`} key={tag} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                                {` #${tag} `}
                            </Link>
                        ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.description}</Typography>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.imageSection}>
                    <Grow in>
                        <ImageList variant="masonry" sx={{ width: "60%", height: "45%" }} cols={3} gap={8}>
                            {post?.imageFiles.map((item) => (
                                <ImageListItem key={item}>
                                    <img
                                        src={ejsServerAddress + item.image}
                                        alt={"Image here"}
                                        loading="lazy"
                                        width={50}
                                    />
                                    <ImageListItemBar
                                        title={item.desc}
                                        actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={"info about"}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grow>
                </div>  
            </div>
            <div className={classes.section}>
                <div className={classes.form}>
                    {post?.audioFiles?.map((item, index) => (
                        <Grow in>
                            <Card className={classes.card} key={index} raised elevation={6}>
                                <ReactAudioPlayer
                                    src={ejsServerAddress + item.audio}
                                    controls
                                />
                                <CardContent>
                                    <Typography>{item.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grow>
                    ))}
                </div>
            </div>

            {/* <div className={classes.section}>
                <ReactPlayer controls={true} url={post?.youtubeLink || 'https://www.youtube.com'}/>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h6">
                    Created by:
                    <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                        {` ${post.name}`}
                    </Link>
                </Typography>
                <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
            </div> */}

            <div className={classes.section}>
                {isRecommendedPostsLoading ?
                    (<Paper elevation={6} className={classes.loadingPaper}>
                        <CircularProgress size="5em" />
                    </Paper>) :
                    (recommendedPosts?.length !== 0 ? (
                        <div className={classes.section}>
                            <Typography gutterBottom variant="h5">You might also like:</Typography>
                            <div className={classes.recommendedPosts}>
                                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                    {recommendedPosts.map((post) => (
                                        <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                                            <Post post={post} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    ) :
                        <div className={classes.section}>
                            <Typography gutterBottom variant="h5">You might also like:</Typography>
                            <div className={classes.recommendedPosts}>
                                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                                    <Typography variant='h6' align='center'>
                                        Can't find any recommendations for this post.
                                    </Typography>
                                </Grid>
                            </div>
                        </div>

                    )
                }
            </div>
        </Paper>
    )
}
