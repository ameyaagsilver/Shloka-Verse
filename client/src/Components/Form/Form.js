import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { useLocation } from 'react-router-dom';


const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const [postData, setPostData] = useState({
		title: '', message: '', tags: [], selectedFiles: [], audioFiles: [], chapter: '', shlokaNumber: '', youtubeLink: ''
	});
	const user = JSON.parse(localStorage.getItem('profile'));
	const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
		} else {
			console.log("postData:::");
			console.log(postData);
			dispatch(createPost({ ...postData, name: user?.result?.name, createdAt: Date.now() }));
		}
		clear();
	}
	const clear = () => {
		setCurrentId(null);
		setPostData({
			title: '', message: '', tags: [], selectedFiles: [], audioFiles: [], chapter: '', shlokaNumber: '', youtubeLink: ''
		});
	}
	const handleAddTag = (tag) => setPostData({ ...postData, tags: [...postData.tags, tag] });

	const handleDeleteTag = (tag) => setPostData({ ...postData, tags: postData.tags.filter((t) => tag !== t) });

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please sign In to post memories.
				</Typography>
			</Paper>

		)
	}
	return (
		<Paper className={classes.paper} elevation={6}>
			<form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit} encType="multipart/form-data">
				<Typography variant='h6'>{currentId ? 'Updating' : 'Creating'} a memory</Typography>
				<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
				<TextField name="chapter" variant="outlined" label="Chapter" fullWidth value={postData.chapter} onChange={(e) => setPostData({ ...postData, chapter: e.target.value })} />
				<TextField name="shlokaNumber" variant="outlined" label="Shloka no." fullWidth value={postData.shlokaNumber} onChange={(e) => setPostData({ ...postData, shlokaNumber: e.target.value })} />
				<TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
				<TextField name="youtubeLink" variant="outlined" label="Youtube Link" fullWidth value={postData.youtubeLink} onChange={(e) => setPostData({ ...postData, youtubeLink: e.target.value })} />
				<ChipInput
					style={{ margin: '10px 0' }}
					value={postData.tags}
					fullWidth
					onAdd={handleAddTag}
					onDelete={handleDeleteTag}
					label="Tags"
					variant='outlined'
				/>
				<div className={classes.fileInput}>
					<FileBase64 type="file" multiple={true} onDone={(e) => setPostData({...postData, selectedFiles: e.map((file) => file.base64)})} accept="image/*" />
					<FileBase64 type="file" multiple={true} onDone={(e) => setPostData({...postData, audioFiles: e.map((file) => file.base64)})} accept="audio/*" />
				</div>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size='medium' type="large" fullWidth>Submit</Button>
				<Button variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
			</form>
		</Paper>
	)
}

export default Form;