import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { getBooksBySearch } from '../../actions/books';

export const Roadmap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    let { books, isLoadingBooksBySearch } = useSelector((state) => state.books);
    const { chapterNumber, bookId } = useParams();

    useEffect(() => {
        if (bookId) dispatch(getBooksBySearch({ bookId: bookId }));
    }, [bookId]);

    if (isLoadingBooksBySearch) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress style={{align: "middle"}} />
            </Paper>
        );
    }

    if(bookId && chapterNumber) {
        return (
            <div>
                <Paper style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }} elevation={6}>
                    <div className={classes.section}>
                        <Typography variant='h6' align='center'>
                            <Link to={`/books/${bookId}`} style={{ textDecoration: 'none' }}>Book '{books[0]?.title}'</Link>
                            {' > '}
                            <Link to={`/books/${bookId}/chapter/${chapterNumber}`} style={{ textDecoration: 'none' }}>Chapter {chapterNumber}</Link> 
                        </Typography>                    
                    </div>
                </Paper>
            </div>
        );
    }

    else if(bookId) {
        return (
            <div>
                <Paper style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }} elevation={6}>
                    <div className={classes.section}>
                        <Typography variant='h6' align='center'>
                            <Link to={`/books/${bookId}`} style={{ textDecoration: 'none' }}>Book '{books[0]?.title}'</Link>
                        </Typography>                 
                    </div>
                </Paper>
            </div>
        );
    }

    else {
        return (<></>);
    }
}
