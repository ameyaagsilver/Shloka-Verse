import React, { useEffect } from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Components/Home/Home";
import { Auth } from "./Components/Auth/Auth";
import { PostDetails } from "./Components/PostDetails/PostDetails";
import { Form } from './Components/Form/Form'
import { BookChapters } from './Components/BookChapters/BookChapters'
import { ListView } from './Components/BookChapters/ListView/ListView'
import { Books } from './Components/Books/Books'

function App() {
    let user = JSON.parse(localStorage.getItem('profile'));

    setTimeout(() => {
        user = JSON.parse(localStorage.getItem('profile'));
    }, 1000);

    return (
        <BrowserRouter >
            <Container maxWidth='lg'>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Navigate to="/books" />} />
                    <Route path="/create-post" exact element={<Form />} />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" exact element={<PostDetails />} />
                    <Route path="/books" exact element={<Books />} />
                    <Route path="/books/:bookId" exact element={<BookChapters />} />
                    <Route path="/books/:bookId/chapter/:chapterNumber" exact element={<ListView />} />
                    <Route path="/books/:bookId/chapter/:chapterNumber/verse/:id" exact element={<PostDetails />} />
                    <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/" />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
