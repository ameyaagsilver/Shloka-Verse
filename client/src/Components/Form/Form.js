import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Divider, Card, CardMedia, Grow } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from "react-player";

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


export const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const [postData, setPostData] = useState({
		title: '', message: '', tags: [], imageFiles: [], audioFiles: [], chapter: '', shlokaNumber: '', youtubeLink: ''
	});
	const user = JSON.parse(localStorage.getItem('profile'));
	const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
		} else {
			console.log("postData::");
			console.log(postData);
			dispatch(createPost({ ...postData, name: user?.result?.name, createdAt: Date.now() }));
		}
		clear();
		navigate('/');
	}

	const clear = () => {
		setPostData({
			title: '', message: '', tags: [], imageFiles: [], audioFiles: [], chapter: '', shlokaNumber: '', youtubeLink: ''
		});
	}

	const addImageCard = () => {
		postData.imageFiles.push({'image':'', desc:''});
		setPostData({...postData, imageFiles: postData.imageFiles });
		console.log(postData);
	}

	const handleSelectImageFile = (index, e) => {
		const imageData = postData.imageFiles;
		imageData[index].image = e.base64;
		imageData[index].desc = e.name;
		setPostData({...postData, imageFiles: imageData});
	}

	const handleDeleteImageFile = (index) => {
		const imageData = postData.imageFiles;
		imageData.splice(index, 1);
		setPostData({...postData, imageFiles: imageData});
	}

	const handleImageDesc = (index, e) => {
		const imageData = postData.imageFiles;
		imageData[index].desc = e.target.value;
		setPostData({...postData, imageFiles: imageData});
	}

	const addAudioCard = () => {
		postData.audioFiles.push({'audio': '', 'desc': ''});
		setPostData({...postData, audioFiles: postData.audioFiles });
		console.log(postData);
	}

	const handleSelectAudioFile = (index, e) => {
		const audioData = postData.audioFiles;
		audioData[index].audio = e.base64;
		audioData[index].desc = e.name;
		setPostData({...postData, audioFiles: audioData});
		console.log(postData);
	}

	const handleDeleteAudioFile = (index) => {
		const audioData = postData.audioFiles;
		audioData.splice(index, 1);
		setPostData({...postData, audioFiles: audioData});
	}

	const handleAudioDesc = (index, e) => {
		const audioData = postData.audioFiles;
		audioData[index].desc = e.target.value;
		setPostData({...postData, audioFiles: audioData});
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
				<Typography variant='h6'>{currentId ? 'Update' : 'Create'} a shloka</Typography>
				<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
				<TextField name="chapter" variant="outlined" label="Chapter" fullWidth value={postData.chapter} onChange={(e) => setPostData({ ...postData, chapter: e.target.value })} />
				<TextField name="shlokaNumber" variant="outlined" label="Shloka no." fullWidth value={postData.shlokaNumber} onChange={(e) => setPostData({ ...postData, shlokaNumber: e.target.value })} />
				<TextField name="message" variant="outlined" label="Description" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
				<TextField name="youtubeLink" variant="outlined" label="Youtube Link" fullWidth value={postData.youtubeLink} onChange={(e) => setPostData({ ...postData, youtubeLink: e.target.value })} />
				<ChipInput
					style={{ margin: '10px 0' }}
					value={postData.tags}
					fullWidth
					onAdd={handleAddTag}
					onDelete={handleDeleteTag}
					label="Labels"
					variant='outlined'
				/>
				<div className={classes.fileInput}>
					<div className={classes.form}>
						{postData.imageFiles.map((imageFile, index) => (
							<Card className={classes.card} key={index} raised elevation={6}>
								<CardMedia className={classes.media} image={imageFile.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kZmywGDfCYXNGtiEVYryQeGxfKGDy-fOuhFhQ0CUVW4P-HT6ql9swLBxsCiKV-JSvCA&usqp=CAU'}/>
								<FileBase64 type="file" onDone={(e) => handleSelectImageFile(index, e)} accept="image/*" />
								<TextField name="descOfImage" variant="outlined" label="Description of the Image" value={imageFile.desc} onChange={(e) => handleImageDesc(index, e)} />								
								<Button size="small" variant='contained' color="secondary" onClick={() => handleDeleteImageFile(index)}><DeleteIcon fontSize="small" />Remove</Button>
							</Card>							
						))}
					</div>
					<Button variant="contained" color="primary" size='small' onClick={addImageCard}>Add Image</Button>

					<Divider style={{ margin: '20px 0' }} />

					<div className={classes.form}>
						{postData.audioFiles.map((audioFile, index) => (
							<Grow in>
								<Card className={classes.card} key={index} raised elevation={6}>
									<ReactAudioPlayer
										src={audioFile.audio}
										controls
									/>
									<FileBase64 type="file" onDone={(e) => handleSelectAudioFile(index, e)} accept="audio/*" />
									<TextField name="descOfImage" variant="outlined" label="Description of the Image" value={audioFile.desc} onChange={(e) => handleAudioDesc(index, e)} />								
									<Button size="small" variant='contained' color="secondary" onClick={() => handleDeleteAudioFile(index)}><DeleteIcon fontSize="small" />Remove</Button>
								</Card>							
							</Grow>
						))}
					</div>
					<Button variant="contained" color="primary" size='small' onClick={addAudioCard}>Add Audio</Button>

				</div>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size='medium' type="large" fullWidth>Submit</Button>
				<Button variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
			</form>
		</Paper>
	)
}

export default Form;