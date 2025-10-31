import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Fade } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import './styles/App.css';

// Create a modern custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Arial", sans-serif',
  },
});

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        {/* Animated background gradient */}
        <div className="gradient-bg"></div>
        
        <Container maxWidth="xl" className="content-container">
          {/* Header Section */}
          <Fade in={true} timeout={800}>
            <Box className="header-section">
              <Typography variant="h2" className="main-title">
                👥 User Directory
              </Typography>
              <Typography variant="h6" className="subtitle">
                Discover and connect with amazing people
              </Typography>
            </Box>
          </Fade>

          {/* Search Bar */}
          <Fade in={true} timeout={1000}>
            <Box className="search-section">
              <SearchBar 
                searchQuery={searchQuery} 
                onSearchChange={handleSearchChange}
                userCount={filteredUsers.length}
              />
            </Box>
          </Fade>

          {/* Loading State */}
          {loading && (
            <Box className="loading-container">
              <CircularProgress size={60} thickness={4} />
              <Typography variant="h6" style={{ marginTop: '20px', color: '#667eea' }}>
                Loading users...
              </Typography>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Fade in={true}>
              <Alert severity="error" className="error-alert">
                <strong>Oops!</strong> {error}. Please try again later.
              </Alert>
            </Fade>
          )}

          {/* Users Grid */}
          {!loading && !error && (
            <>
              {filteredUsers.length > 0 ? (
                <Box className="users-grid">
                  {filteredUsers.map((user, index) => (
                    <Fade 
                      in={true} 
                      timeout={500} 
                      style={{ transitionDelay: `${index * 50}ms` }}
                      key={user.id}
                    >
                      <div>
                        <UserCard user={user} />
                      </div>
                    </Fade>
                  ))}
                </Box>
              ) : (
                <Fade in={true}>
                  <Box className="no-results">
                    <Typography variant="h5" className="no-results-text">
                      🔍 No users found matching "{searchQuery}"
                    </Typography>
                    <Typography variant="body1" className="no-results-subtitle">
                      Try searching with a different name
                    </Typography>
                  </Box>
                </Fade>
              )}
            </>
          )}

          {/* Footer */}
          <Box className="footer">
            <Typography variant="body2">
              Built with ❤️ using React & Material UI
            </Typography>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
