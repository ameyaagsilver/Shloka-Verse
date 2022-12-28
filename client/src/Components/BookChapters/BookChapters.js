import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Paper, Typography, Grow, Card, ButtonBase, CardContent, CardMedia, Button, TextField, Divider } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import InfoIcon from '@mui/icons-material/Info';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { toast } from 'wc-toast';

import useStyles from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookChapters, createChapter } from '../../actions/book-chapters'
import { Roadmap } from '../../Components/Roadmap/Roadmap';

export const BookChapters = () => {
	const { chapters, isLoadingChapters } = useSelector((state) => state.bookChapters);
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [openChapterId, setOpenChapterId] = useState("");
	const { bookId } = useParams();
	const [chapterData, setChapterData] = useState({
		chapter_id:'', chapter_name: '', chapter_summary: '',
		chapter_summary_hindi: '', image: '',
		name_hindi: '', chapter_name_meaning: '', chapter_name_transliterated: '',
		book_id: bookId,
	});
	const [displayAddChapterForm, setDisplayAddChapterForm] = useState(false);

	useEffect(() => {
		dispatch(fetchBookChapters(bookId));
	}, []);

	const handleAddChapter = (e) => {
		e.preventDefault();
		dispatch(createChapter({...chapterData, book_id: bookId}, toast));
	}

	const clear = () => {
		setChapterData({
			chapter_id:'', chapter_name: '', chapter_summary: '',
			chapter_summary_hindi: '', image: '',
			name_hindi: '', chapter_name_meaning: '', chapter_name_transliterated: '',
		});
	}

	const handleOpenChapter = (chapter_id) => {
		navigate(`/books/${bookId}/chapter/${chapter_id}`);
	}

	const handleClickToOpenChapterDetails = (chapter_id) => {
		handleToCloseChapterDetails();
		setOpenChapterId(chapter_id);
	};
	
	const handleToCloseChapterDetails = () => {
		setOpenChapterId("");
	};

	const toggleAddChapterForm = () => {
		setDisplayAddChapterForm(!displayAddChapterForm);
	}
	
	if(!isLoadingChapters && !chapters?.length) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					No chapters to display
				</Typography>
			</Paper>
		)
	}

	return (
		isLoadingChapters ? <CircularProgress /> : (
			<>
				<wc-toast></wc-toast>
				<Roadmap />
				
				<Grid className={classes.container} container alignItems="stretch" spacing={3}>
					{chapters.map((item, index) => (
						<Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
							<Card className={classes.card} key={item.chapter_id} raised elevation={6}>
								<ButtonBase className={classes.cardAction} onClick={() => {handleOpenChapter(item.chapter_id)}}>
									<CardMedia className={classes.media} image={item?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgR6z93nanGeVEANRPfurTRUOQuCIgjowwA&usqp=CAU"} title={item.chapter_name} />
									<div className={classes.overlay} >
										<Typography variant='h6'>Chapter {item.chapter_id}. {item.chapter_name}</Typography>
										<Typography variant='body2'>({item?.verses_count} Verses)</Typography>
										
									</div>
								</ButtonBase>	
								<div className={classes.overlay2}>
									<Button style={{ color: 'white' }} size="large" onClick={(e) => handleClickToOpenChapterDetails(item.chapter_id) }>
										<InfoIcon className={classes.overlay2} fontSize="large" />
									</Button>
								</div>
								<div>
									<Dialog scroll='body' open={openChapterId === item.chapter_id} maxWidth="md" fullWidth onClose={handleToCloseChapterDetails}>
										<DialogContent>
										<Card className={classes.card} key={item.chapter_id} raised elevation={6}>
												<ButtonBase className={classes.cardAction} onClick={() => {handleClickToOpenChapterDetails(item.chapter_id)}}>
													<CardMedia className={classes.media} image={item?.image || "https:encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgR6z93nanGeVEANRPfurTRUOQuCIgjowwA&usqp=CAU"} title={item.chapter_name} />
													<div className={classes.overlay} >
														<Typography variant='h6'>Chapter {item.chapter_id}. {item.chapter_name}</Typography>
														<Typography variant='body2'>({item?.verses_count} Verses)</Typography>
													</div>
													<div className={classes.overlay2} >
														<Typography variant='h6'>{item.name_hindi}</Typography>
													</div>
												</ButtonBase>
										</Card>
										<DialogContentText>
											<br/>
											{item.chapter_summary}
											<br/>
											{item.chapter_summary_hindi}
										</DialogContentText>
										</DialogContent>
										<DialogActions>
										<Button onClick={handleToCloseChapterDetails} 
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
				
				<Button variant="contained" color="primary" size='small' onClick={toggleAddChapterForm}>Add Chapter</Button>

				{displayAddChapterForm ? (
					<div>
						<Paper className={classes.paper} elevation={6}>
							<form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={(e) => (handleAddChapter(e))} encType="multipart/form-data">
								<Typography variant='h6'>Add a new Chapter</Typography>
								<TextField name="Chapter Id" variant="outlined" label="Chapter ID" fullWidth value={chapterData.chapter_id} onChange={(e) => setChapterData({ ...chapterData, chapter_id: e.target.value })} />
								<TextField name="Chapter Name" variant="outlined" label="Chapter Name" fullWidth value={chapterData.chapter_name} onChange={(e) => setChapterData({ ...chapterData, chapter_name: e.target.value })} />
								<TextField name="Chapter Summary" variant="outlined" label="Chapter Summary" fullWidth value={chapterData.chapter_summary} onChange={(e) => setChapterData({ ...chapterData, chapter_summary: e.target.value })} />
								<TextField name="Chapter Summary Hindi" variant="outlined" label="Hindi Summary" fullWidth value={chapterData.chapter_summary_hindi} onChange={(e) => setChapterData({ ...chapterData, chapter_summary_hindi: e.target.value })} />
								<TextField name="Image Link" variant="outlined" label="Image Link" fullWidth value={chapterData.image} onChange={(e) => setChapterData({ ...chapterData, image: e.target.value })} />
								<TextField name="Name in Hindi" variant="outlined" label="Name(Hindi)" fullWidth value={chapterData.name_hindi} onChange={(e) => setChapterData({ ...chapterData, name_hindi: e.target.value })} />
								<TextField name="Chapter Name Meaning" variant="outlined" label="Meaning of Chapter Name" fullWidth value={chapterData.chapter_name_meaning} onChange={(e) => setChapterData({ ...chapterData, chapter_name_meaning: e.target.value })} />
								<TextField name="Chapter name Transliterated" variant="outlined" label="Chapter Name Transliterated" fullWidth value={chapterData.chapter_name_transliterated} onChange={(e) => setChapterData({ ...chapterData, chapter_name_transliterated: e.target.value })} />
								<TextField name="Book Id" variant="outlined" label="Id of the Book" inputProps={{ readOnly: true }} fullWidth value={chapterData.book_id} />

								<Button className={classes.buttonSubmit} variant="contained" color="primary" size='medium' type="large" fullWidth>Submit</Button>
								<Button variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
							</form>
						</Paper>
					</div>
				) : <></>}		
			</>
		)
	)
}