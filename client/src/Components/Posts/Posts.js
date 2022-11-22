import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core';

import React from 'react';
import Post from './Post/Post'
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
	const { posts, isLoading } = useSelector((state) => state.posts);
	const classes = useStyles();

	if(!isLoading && !posts?.length) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					No posts to display
				</Typography>
			</Paper>
		)
	}
	return (
		isLoading ? <CircularProgress /> : (
			<Grid className={classes.container} container alignItems="stretch" spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
						<Post post={post} setCurrentId={setCurrentId} />
					</Grid>
				))}
			</Grid>
		)
	)
}

export default Posts;