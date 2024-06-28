import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';


const Home = () => {
  const [roomId, setRoomID] = useState();
  const navigate = useNavigate();

  const handleRoomInput = (e) => {
    setRoomID(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
        navigate(`/room/${roomId}`);
    }
};

  return (
    <Container justifyContent="center">
        <Box
            height={80}
            width={500}
            margin="auto"
            my={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={4}
            p={2}
            sx={{ border: '2px solid grey' }}
        >
      <TextField
          required
          label="Room ID"
          defaultValue=""
          onChange={(value) => handleRoomInput(value)}
          value={roomId}
        />
        <Button
            variant='contained'
            onClick={(e) => handleSubmit(e)}
            >
            Create/Join Room
        </Button>
        </Box>

    </Container>
  )
}

export default Home
