import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const searchTags = query.get('tags');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAddTag = (tag) => setTags([...tags, tag]);

    const handleDeleteTag = (tag) => setTags(tags.filter((t) => tag !== t));

    const searchPost = () => {
        if (search.trim() || tags.length) {
            dispatch(getPostsBySearch({ search: search.trim(), tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search.trim() || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate("/");
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                        {!(searchQuery || searchTags) ? 
                        
                        <Paper elevation={6}>
                            <Pagination page={page} className={classes.pagination}/>
                        </Paper> : null
                    }
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                onChange={(e) => { setSearch(e.target.value) }}
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onKeyUp={handleKeyPress}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAddTag}
                                onDelete={handleDeleteTag}
                                label="Tags"
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained'>Search Post</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
