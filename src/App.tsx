import React, { ChangeEvent, useState } from 'react'
import { AppBar, Toolbar, Paper, Button, Container, Typography, Stack, TextField, Modal, Box } from '@mui/material';

const appStyle = {
  textAlign: 'center',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#ADD8E6',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const appBarStyle = {
  backgroundColor: '#3457D5',
  color: 'white'
}

const buttonStyle = {
  backgroundColor: '#3457D5',
  color: 'white'
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

type Option = {
  id: number,
  value: string
}

const OPTION_LIMIT: number = 5;

const App = () => {
  const [options, setOptions] = useState<Option[]>([
    {id: 1, value: ""}, {id: 2, value: ""}
  ]);
  const [decided, setDecided] = useState("");
  const [modal, setModal] = useState(false);

  const decider = () => {
    const decisionValue: number = Math.floor(Math.random() * options.length);
    setDecided(options[decisionValue].value);
    setModal(true);
  }

  const handleClose = () => {
    setModal(false);
    setDecided("");
  }

  const clearOptions = () => {
    setOptions([{id: 1, value: ""}, {id: 2, value: ""}]);
  }

  const addAnotherOption = () => {
    setOptions([...options, { id: options.length+1, value: ""}]);
  }

  const handleOptionsChange = (event: ChangeEvent<HTMLInputElement>, id: number): void => {
    const existingOptions: Option[] = options;
    const index: number = existingOptions.findIndex((option: Option) => id === option.id);
    if (index >= 0) {
      existingOptions[index].value = event.target.value;
      setOptions([...existingOptions]);
    } else {
      throw Error(`Can't find item with id [${id}] in the options`);
    }
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
            {options.map((option: Option) => {
              return (
                <TextField
                   variant='outlined'
                   key={`OptionInput${option.id}`}
                   size='small'
                   label={`Option ${option.id}`}
                   value={option.value}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => handleOptionsChange(e, option.id)}
                />
              )
            })}
          </Stack>
          <Container maxWidth="md">
            <Stack
              spacing={1}
            >
              <Button
                variant='contained'
                color="primary"
                onClick={() => addAnotherOption()}
                disabled={OPTION_LIMIT === options.length}
              >
                I need more options!
              </Button>
              <Button 
                variant='contained'
                sx={buttonStyle}
                disabled={options.length !== options.filter((option: Option) => option.value !== "").length}
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
