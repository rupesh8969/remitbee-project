import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  IconButton,
  Tooltip 
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

const UserCard = ({ user }) => {
  // Generate a unique gradient for each user based on their ID
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  ];

  const userGradient = gradients[user.id % gradients.length];

  // Generate initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="user-card">
      {/* Colorful header with gradient */}
      <Box 
        className="card-header"
        style={{ background: userGradient }}
      >
        <Box className="avatar">
          <PersonIcon style={{ fontSize: '40px', color: '#fff' }} />
          <Typography variant="h4" className="avatar-initials">
            {getInitials(user.name)}
          </Typography>
        </Box>
      </Box>

      <CardContent className="card-content">
        {/* User Name */}
        <Typography variant="h5" className="user-name">
          {user.name}
        </Typography>
        
        <Typography variant="body2" className="user-username">
          @{user.username}
        </Typography>

        {/* Contact Information */}
        <Box className="contact-section">
          <Box className="contact-item">
            <EmailIcon className="contact-icon" />
            <Typography variant="body2" className="contact-text">
              {user.email}
            </Typography>
          </Box>

          <Box className="contact-item">
            <PhoneIcon className="contact-icon" />
            <Typography variant="body2" className="contact-text">
              {user.phone.split(' ')[0]}
            </Typography>
          </Box>

          <Box className="contact-item">
            <LanguageIcon className="contact-icon" />
            <Typography variant="body2" className="contact-text">
              {user.website}
            </Typography>
          </Box>
        </Box>

        {/* Company Information */}
        <Box className="company-section">
          <Chip 
            icon={<BusinessIcon />}
            label={user.company.name}
            className="company-chip"
            size="small"
          />
          <Typography variant="caption" className="company-catchphrase">
            "{user.company.catchPhrase}"
          </Typography>
        </Box>

        {/* Location */}
        <Box className="location-section">
          <LocationOnIcon className="location-icon" />
          <Typography variant="body2" className="location-text">
            {user.address.city}, {user.address.street}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box className="action-buttons">
          <Tooltip title="Send Email" arrow>
            <IconButton 
              className="action-button"
              size="small"
              onClick={() => window.open(`mailto:${user.email}`)}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Visit Website" arrow>
            <IconButton 
              className="action-button"
              size="small"
              onClick={() => window.open(`https://${user.website}`, '_blank')}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Call" arrow>
            <IconButton 
              className="action-button"
              size="small"
              onClick={() => window.open(`tel:${user.phone}`)}
            >
              <PhoneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
