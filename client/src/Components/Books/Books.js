import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Paper, Typography, Grow, Card, ButtonBase, CardContent, CardMedia, Button, TextField, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import InfoIcon from '@mui/icons-material/Info';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { toast } from 'wc-toast';

import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, createBook } from '../../actions/books'

export const Books = () => {
	const { books, isLoadingBooks } = useSelector((state) => state.books);
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [bookData, setBookData] = useState({
		book_id:'', title: '', description: '', description_hindi: '', image: ''
	});
	const [displayAddBookForm, setDisplayAddBookForm] = useState(false);
	const [openBookId, setOpenBookId] = useState("");

	useEffect(() => {
		dispatch(fetchBooks());
	}, []);

	const handleOpenChapter = (bookId) => {
		navigate(`/books/${bookId}`);
	}

	const handleAddChapter = (e) => {
		e.preventDefault();
		console.log(bookData);
		dispatch(createBook({...bookData}, toast));
	}

	const clear = () => {
		setBookData({
			book_id:'', title: '', description: '', description_hindi: [], image: ''
		});
	}

	const handleClickToOpenBookDetails = (chapter_number) => {
		handleToCloseBookDetails();
		setOpenBookId(chapter_number);
	};
	
	const handleToCloseBookDetails = () => {
		setOpenBookId("");
	};

	const toggleAddBookForm = () => {
		setDisplayAddBookForm(!displayAddBookForm);
	}
	
	if(!isLoadingBooks && !books?.length) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					No books to display
				</Typography>
			</Paper>
		)
	}

	return (
		isLoadingBooks ? <CircularProgress /> : (
			<div>
				<wc-toast></wc-toast>
				<Grid className={classes.container} container alignItems="stretch" spacing={3}>
					{books.map((item, index) => (
						<Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
							<Card className={classes.card} key={item.chapter_number} raised elevation={6}>
								<ButtonBase className={classes.cardAction} onClick={() => {handleOpenChapter(item.book_id)}}>
									<CardMedia className={classes.media} image={item?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgR6z93nanGeVEANRPfurTRUOQuCIgjowwA&usqp=CAU"} title={item.chapter_name} />
									<div className={classes.overlay} >
										<Typography variant='h6'>{item.title}</Typography>
										<Typography variant='body2'>({item?.chapter_count} Chapters)</Typography>
									</div>
								</ButtonBase>	
								<div className={classes.overlay2}>
									<Button style={{ color: 'white' }} size="large" onClick={(e) => handleClickToOpenBookDetails(item.book_id) }>
										<InfoIcon className={classes.overlay2} fontSize="large" />
									</Button>
								</div>
								<div>
									<Dialog scroll='body' open={openBookId === item.book_id} maxWidth="md" fullWidth onClose={handleToCloseBookDetails}>
										<DialogContent>
										<Card className={classes.card} key={item.chapter_number} raised elevation={6}>
												<ButtonBase className={classes.cardAction} onClick={() => {handleClickToOpenBookDetails(item.book_id)}}>
													<CardMedia className={classes.media} image={item?.image || "https:encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgR6z93nanGeVEANRPfurTRUOQuCIgjowwA&usqp=CAU"} title={item?.chapter_name} />
													<div className={classes.overlay} >
														<Typography variant='h6'>{item.title}</Typography>
														<Typography variant='body2'>({item?.verses_count} Verses)</Typography>
													</div>
													<div className={classes.overlay2} >
														<Typography variant='h6'>{item.name_hindi}</Typography>
													</div>
												</ButtonBase>
										</Card>
										<DialogContentText>
											<br/>
											{item.description}
											<br/>
											{item.description_hindi}
										</DialogContentText>
										</DialogContent>
										<DialogActions>
										<Button onClick={handleToCloseBookDetails} 
												color="primary">
											Close
										</Button>
										</DialogActions>
									</Dialog>
								</div>						
							</Card>
						</Grid>
					))}
				</Grid>
				<Divider style={{margin:"20px 0"}}></Divider>
				
				<Button variant="contained" color="primary" size='small' onClick={toggleAddBookForm}>Add Book</Button>

				{displayAddBookForm ? (
					<div>
						<Paper className={classes.paper} elevation={6}>
							<form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={(e) => (handleAddChapter(e))} encType="multipart/form-data">
								<Typography variant='h6'>Add a new Book</Typography>
								<TextField name="Book Id" variant="outlined" label="Book ID" fullWidth value={bookData.book_id} onChange={(e) => setBookData({ ...bookData, book_id: e.target.value })} />
								<TextField name="title" variant="outlined" label="Title" fullWidth value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />
								<TextField name="image" variant="outlined" label="Image Link" fullWidth value={bookData.image} onChange={(e) => setBookData({ ...bookData, image: e.target.value })} />
								<TextField name="description" variant="outlined" label="Description" fullWidth value={bookData.description} onChange={(e) => setBookData({ ...bookData, description: e.target.value })} />
								<TextField name="descriptionHindi" variant="outlined" label="Description(Hindi)" fullWidth value={bookData.description_hindi} onChange={(e) => setBookData({ ...bookData, description_hindi: e.target.value })} />
								{/* <div className={classes.fileInput}>
									<div className={classes.form}>
										{bookData.imageFiles.map((imageFile, index) => (
											<Card className={classes.card} key={index} raised elevation={6}>
												<CardMedia className={classes.media} image={imageFile.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kZmywGDfCYXNGtiEVYryQeGxfKGDy-fOuhFhQ0CUVW4P-HT6ql9swLBxsCiKV-JSvCA&usqp=CAU'}/>
												<FileBase64 type="file" onDone={(e) => handleSelectImageFile(index, e)} accept="image/*" />
												<TextField name="descOfImage" variant="outlined" label="Description of the Image" value={imageFile.desc} onChange={(e) => handleImageDesc(index, e)} />								
												<Button size="small" variant='contained' color="secondary" onClick={() => handleDeleteImageFile(index)}><DeleteIcon fontSize="small" />Remove</Button>
											</Card>							
										))}
									</div>
									<Button variant="contained" color="primary" size='small' onClick={addImageCard}>Add Image</Button>
								</div> */}
								<Button className={classes.buttonSubmit} variant="contained" color="primary" size='medium' type="large" fullWidth>Submit</Button>
								<Button variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
							</form>
						</Paper>
					</div>
				) : <></>}				
			</div>
		)
	)
}