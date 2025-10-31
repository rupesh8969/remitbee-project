import React from 'react';
import { TextField, InputAdornment, Paper, Box, Typography, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';

const SearchBar = ({ searchQuery, onSearchChange, userCount }) => {
  const handleChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <Paper className="search-bar-container" elevation={0}>
      <Box className="search-wrapper">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users by name..."
          value={searchQuery}
          onChange={handleChange}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <Chip
                  label={`${userCount} ${userCount === 1 ? 'result' : 'results'}`}
                  size="small"
                  className="result-chip"
                  icon={<PeopleIcon />}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.25)',
              },
              '& fieldset': {
                borderColor: 'rgba(102, 126, 234, 0.2)',
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(102, 126, 234, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#667eea',
                borderWidth: '2px',
              },
            },
          }}
        />
      </Box>
      
      {!searchQuery && (
        <Typography variant="body2" className="search-hint">
          💡 Start typing to filter users instantly
        </Typography>
      )}
    </Paper>
  );
};

export default SearchBar;
