import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Paper, Typography, Grow, Card, ButtonBase, CardContent, CardMedia, Button, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import InfoIcon from '@mui/icons-material/Info';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import useStyles from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookChapters } from '../../actions/book-chapters'

export const BookChapters = () => {
	const { chapters, isLoadingChapters } = useSelector((state) => state.bookChapters);
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [openChapterId, setOpenChapterId] = useState("");
	const { bookId } = useParams();

	useEffect(() => {
		console.log(bookId);
		dispatch(fetchBookChapters(bookId));
	}, []);

	const handleOpenChapter = (chapter_number) => {
		navigate(`/books/${bookId}/chapter/${chapter_number}`);
	}

	const handleClickToOpenChapterDetails = (chapter_number) => {
		handleToCloseChapterDetails();
		setOpenChapterId(chapter_number);
	};
	
	const handleToCloseChapterDetails = () => {
		setOpenChapterId("");
	};
	
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
			<Grid className={classes.container} container alignItems="stretch" spacing={3}>
				{chapters.map((item, index) => (
					<Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
						<Card className={classes.card} key={item.chapter_number} raised elevation={6}>
							<ButtonBase className={classes.cardAction} onClick={() => {handleOpenChapter(item.chapter_number)}}>
								<CardMedia className={classes.media} image={item?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgR6z93nanGeVEANRPfurTRUOQuCIgjowwA&usqp=CAU"} title={item.chapter_name} />
								<div className={classes.overlay} >
									<Typography variant='h6'>Chapter {item.chapter_number}. {item.chapter_name}</Typography>
									<Typography variant='body2'>({item?.verses_count} Verses)</Typography>
									
								</div>
							</ButtonBase>	
							<div className={classes.overlay2}>
								<Button style={{ color: 'white' }} size="large" onClick={(e) => handleClickToOpenChapterDetails(item.chapter_number) }>
									<InfoIcon className={classes.overlay2} fontSize="large" />
								</Button>
							</div>
							<div>
								<Dialog scroll='body' disableEscapeKeyDown open={openChapterId === item.chapter_number} maxWidth="md" fullWidth onClose={handleToCloseChapterDetails}>
									<DialogContent>
									<Card className={classes.card} key={item.chapter_number} raised elevation={6}>
											<ButtonBase className={classes.cardAction} onClick={() => {handleClickToOpenChapterDetails(item.chapter_number)}}>
												<CardMedia className={classes.media} image={item?.image || "https:encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgR6z93nanGeVEANRPfurTRUOQuCIgjowwA&usqp=CAU"} title={item.chapter_name} />
												<div className={classes.overlay} >
													<Typography variant='h6'>Chapter {item.chapter_number}. {item.chapter_name}</Typography>
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
		)
	)
}