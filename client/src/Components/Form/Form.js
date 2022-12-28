import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Divider, Card, CardMedia, Grow } from '@material-ui/core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from "react-player";
import { toast } from 'wc-toast';


import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

export const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { bookId, chapterNumber } = useParams();
	const [postData, setPostData] = useState({
		book_id: bookId, chapter_number: chapterNumber, message: '', tags: [], imageFiles: [], audioFiles: [],
		verse_number: '', youtubeLink: '', shloka_hindi: "", shloka_transliteration: "", word_meanings: "", description: "",
	});
	const user = JSON.parse(localStorage.getItem('profile'));
	const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);

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
			dispatch(createPost({ ...postData, name: user?.result?.name, createdAt: Date.now() }, toast));
		}
		clear();
	}

	const clear = () => {
		setPostData({
			book_id: bookId, chapter_number: chapterNumber, message: '', tags: [], imageFiles: [], audioFiles: [],
			verse_number: '', youtubeLink: '', shloka_hindi: "", shloka_transliteration: "", word_meanings: "", description: "",
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
			<wc-toast></wc-toast>
			<form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit} encType="multipart/form-data">
				<Typography variant='h6'>{currentId ? 'Update' : 'Create'} a shloka</Typography>
				<TextField name="Book Id" variant="outlined" label="Book Id" fullWidth value={postData.book_id} inputProps={{ readOnly: true }} />
				<TextField name="Chapter Number" variant="outlined" label="Chapter No." fullWidth value={postData.chapter_number} inputProps={{ readOnly: true }} />
				{/* <FormControl fullWidth>
					<InputLabel id="select-gita-chapter">Chapter</InputLabel>
					<Select label="Chapter" labelId="select-gita-chapter" id="demo-simple-select" fullWidth value={postData.chapter} onChange={(e) => setPostData({ ...postData, chapter: e.target.value })} >
						{chapters.map((item, index) => (
							<MenuItem key={index} value={item.chapter_name}>{item.chapter_name}</MenuItem>
						))}
					</Select>
				</FormControl> */}
				<TextField name="verse_number" inputProps={{ required: true }} variant="outlined" label="Verse no." fullWidth value={postData.verse_number} onChange={(e) => setPostData({ ...postData, verse_number: e.target.value })} />
				<TextField name="shloka_hindi" variant="outlined" label="Shloka(Hindi)" fullWidth value={postData.shloka_hindi} onChange={(e) => setPostData({ ...postData, shloka_hindi: e.target.value })} />
				<TextField name="shloka_transliteration" variant="outlined" label="Shloka(Transliterated/English)" fullWidth value={postData.shloka_transliteration} onChange={(e) => setPostData({ ...postData, shloka_transliteration: e.target.value })} />
				<TextField name="Word Meanings" variant="outlined" label="Word meanings" fullWidth value={postData.word_meanings} onChange={(e) => setPostData({ ...postData, word_meanings: e.target.value })} />
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
							<Grow in>
								<Card className={classes.card} key={index} raised elevation={6}>
									<CardMedia className={classes.media} image={imageFile.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kZmywGDfCYXNGtiEVYryQeGxfKGDy-fOuhFhQ0CUVW4P-HT6ql9swLBxsCiKV-JSvCA&usqp=CAU'}/>
									<FileBase64 type="file" onDone={(e) => handleSelectImageFile(index, e)} accept="image/*" />
									<TextField name="descOfImage" variant="outlined" label="Description of the Image" value={imageFile.desc} onChange={(e) => handleImageDesc(index, e)} />								
									<Button size="small" variant='contained' color="secondary" onClick={() => handleDeleteImageFile(index)}><DeleteIcon fontSize="small" />Remove</Button>
								</Card>							
							</Grow>
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