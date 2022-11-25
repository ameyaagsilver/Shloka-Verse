import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grow, ButtonBase, Divider } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CommentIcon from '@material-ui/icons/Comment'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	let user = JSON.parse(localStorage.getItem('profile'));
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	let ejsServerAddress = process.env.REACT_APP_EJS_SERVER_ADDRESS;

	const handleDelete = (id) => {
		dispatch(deletePost(id));
	}
	const handleLike = (id) => {
		dispatch(likePost(id));
	}
	const handleOpenPost = () => {
		navigate(`/posts/${post._id}`);
	}

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find((like) => like === (user?.result?._id || user?.result?.sub))
				? (
					<><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
				) : (
					<><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
				);
		}

		return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
	};


	return (
		<Grow in>
			<Card className={classes.card} raised elevation={6}>
				<ButtonBase className={classes.cardAction} onClick={handleOpenPost}>
					<CardMedia className={classes.media} image={ejsServerAddress + post.imageFiles[0].image} title={post.title} />
					<div className={classes.overlay} >
						<Typography variant='h6'>{post.name}</Typography>
						<Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
					</div>
				</ButtonBase>
				<div className={classes.overlay2}>
					{(user?.result?._id === post?.creator || user?.result?.sub === post?.creator) ?
						<Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
							<MoreHorizIcon fontSize='medium' />
						</Button>
						: null}
				</div>
				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
				</div>
				<Typography className={classes.title} variant="h5" component="h5">{post.title}</Typography>
				<Typography className={classes.title} gutterBottom variant="body2" color="textSecondary" component="p">Chapter {post.chapter}, Shloka {post.shlokaNumber}</Typography>
				<CardContent>
					<Typography gutterBottom variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Button size="small" color="primary" disabled={!user?.result} onClick={() => { handleLike(post._id) }}>
						<Likes />
					</Button>
					<Button style={{borderRadius:100, color: 'gray'}} onClick={handleOpenPost}>
						<CommentIcon style={{ marginRight: '.2rem' }}/>{post?.comments?.length}
					</Button>
					{(user?.result?._id === post?.creator || user?.result?.sub === post?.creator) ?
						<Button size="small" color="secondary" onClick={() => { handleDelete(post._id) }}><DeleteIcon fontSize="small" />Delete</Button>
						: null}

				</CardActions>

			</Card>
		</Grow>
	)
}

export default Post;