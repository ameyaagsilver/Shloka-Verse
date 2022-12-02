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
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../../actions/books'

export const Books = () => {
	const { books, isLoadingBooks } = useSelector((state) => state.books);
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [openChapterId, setOpenChapterId] = useState("");

	useEffect(() => {
		dispatch(fetchBooks());
	}, []);

	const handleOpenChapter = (bookId) => {
		navigate(`/books/${bookId}`);
	}

	const handleClickToOpenBookDetails = (chapter_number) => {
		handleToCloseBookDetails();
		setOpenChapterId(chapter_number);
	};
	
	const handleToCloseBookDetails = () => {
		setOpenChapterId("");
	};
	
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
								<Dialog scroll='body' disableEscapeKeyDown open={openChapterId === item.book_id} maxWidth="md" fullWidth onClose={handleToCloseBookDetails}>
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
		)
	)
}