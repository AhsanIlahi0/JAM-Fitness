import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const workoutTypes = [
  'Running',
  'Walking',
  'Cycling',
  'Swimming',
  'Weight Training',
  'Yoga',
  'HIIT',
  'Other'
];

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    type: '',
    duration: '',
    calories: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newWorkout.type || !newWorkout.duration || !newWorkout.calories) {
      toast.error('Please fill in all required fields');
      return;
    }

    const workout = {
      ...newWorkout,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };

    setWorkouts(prev => [workout, ...prev]);
    setNewWorkout({
      type: '',
      duration: '',
      calories: '',
      notes: ''
    });
    toast.success('Workout logged successfully!');
  };

  const handleDelete = (id) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
    toast.success('Workout deleted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Workout Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Log New Workout
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Workout Type"
                  name="type"
                  value={newWorkout.type}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                >
                  {workoutTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={newWorkout.duration}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Calories Burned"
                  name="calories"
                  type="number"
                  value={newWorkout.calories}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  multiline
                  rows={4}
                  value={newWorkout.notes}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Log Workout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Workout History */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Workouts
              </Typography>
              <List>
                {workouts.map((workout) => (
                  <ListItem key={workout.id} divider>
                    <ListItemText
                      primary={workout.type}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {workout.date}
                          </Typography>
                          {` — ${workout.duration} mins, ${workout.calories} calories`}
                          {workout.notes && <br />}
                          {workout.notes}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleDelete(workout.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {workouts.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No workouts logged yet" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkoutTracker; 