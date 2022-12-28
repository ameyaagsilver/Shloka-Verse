import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

import useStyles from './styles';

export const Roadmap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { chapterNumber, bookId } = useParams();
    
    // if (isLoading) {
    //     return (
    //         <Paper elevation={6} className={classes.loadingPaper}>
    //             <CircularProgress size="7em" />
    //         </Paper>
    //     );
    // }
    if(bookId && chapterNumber) {
        return (
            <div>
                <Paper style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }} elevation={6}>
                    <div className={classes.section}>
                        <Typography variant='h6' align='center'>
                            <Link to={`/books/${bookId}`}>Books {bookId}</Link>
                            {'>'}
                            <Link to={`/books/${bookId}/chapter/${chapterNumber}`}>Chapter {chapterNumber}</Link> 
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
                            <Link to={`/books/${bookId}`}>Books {bookId}</Link>
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
