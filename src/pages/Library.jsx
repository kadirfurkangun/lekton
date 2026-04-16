import React from 'react';
import { Grid, TextField, Drawer, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Library = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [books, setBooks] = React.useState([]); // Placeholder for book data
    const [filteredBooks, setFilteredBooks] = React.useState([]);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        // Filter books based on the search term
        setFilteredBooks(books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, books]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Library</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ marginLeft: '20px', flexGrow: 1 }}
                    />
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={toggleDrawer}>
                <div>
                    {/* Navigation items can go here */}
                </div>
            </Drawer>
            <Grid container spacing={2} style={{ padding: '20px' }}>
                {filteredBooks.map(book => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h3>{book.title}</h3>
                            <p>{book.description}</p>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Library;
