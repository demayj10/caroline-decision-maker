import React, { useState } from 'react'
import { AppBar, Toolbar, Paper, Button, Container, Typography, Stack, TextField, Modal, Box } from '@mui/material';

// import image from '../static/images/katAndJohn.jpg';

const appStyle = {
  textAlign: 'center',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // backgroundImage: `url(${image})`
  backgroundColor: '#ADD8E6',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const appBarStyle = {
  backgroundColor: '#3457D5',
  color: 'black'
}

const buttonStyle = {
  backgroundColor: '#3457D5',
  color: 'black'
}

const paperStyle = {
  margin: "1em",
  height: "fit-content"
}

const modalStyle = {
  position: 'absolute',
  top: '45%',
  left: '23%',
  width: 200,
  padding: '2em 1em',
  backgroundColor: '#fff',
  textAlign: 'center',
  boxShadow: 24
}

const App = () => {
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");
  const [decided, setDecided] = useState("");
  const [modal, setModal] = useState(false);

  const decider = () => {
    const max = 2;
    const min = 1;
    const decisionValue = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(decisionValue);
    if (decisionValue === 2) {
      setDecided(option2);
    } else {
      setDecided(option1);
    }
    setModal(true);
  }

  const handleClose = () => {
    setModal(false);
    setDecided("");
  }

  const clearOptions = () => {
    setOption1("");
    setOption2("");
  }

  return (
    <Container sx={appStyle} maxWidth="lg">
      <AppBar sx={appBarStyle}>
        <Toolbar>
          <Typography variant="h6" textAlign="center" >
            Caroline's Decision Maker
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper elevation={20} sx={paperStyle}>
        <Stack spacing={5} padding="2em 1em">
          <Typography variant='h4'>What's the decision?</Typography>
          <Stack direction="column" spacing={2}>
            <TextField
              variant='outlined'
              size='small'
              label="Option 1"
              value={option1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOption1(e.target.value)}
            />
            <TextField
            variant='outlined'
            size='small'
            label="Option 2"
            value={option2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOption2(e.target.value)}
            />
          </Stack>
          <Container maxWidth="md">
            <Stack
              spacing={1}
            >
              <Button 
                variant='contained'
                sx={buttonStyle}
                disabled={option1 === "" || option2 === ""}
                onClick={() => decider()}
              >
                Decide For Me!
              </Button>
              <Button
                onClick={() => clearOptions()}
              >
                Clear
              </Button>
            </Stack>
            
          </Container>
        </Stack>
      </Paper>

      <Modal open={modal} onClose={() => handleClose()}>
        <Box sx={modalStyle}>
          <Typography
           variant="body1"
           fontWeight='700'
          >
            {decided}
          </Typography>
        </Box>
      </Modal>
    </Container>    
  )
}

export default App
