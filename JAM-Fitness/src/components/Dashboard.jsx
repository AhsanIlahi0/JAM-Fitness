import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    caloriesBurned: 0,
    totalMinutes: 0,
    weeklyProgress: []
  });

  useEffect(() => {
    // Mock data for demonstration
    setStats({
      totalWorkouts: 12,
      caloriesBurned: 1500,
      totalMinutes: 360,
      weeklyProgress: [
        { day: 'Mon', calories: 250 },
        { day: 'Tue', calories: 300 },
        { day: 'Wed', calories: 200 },
        { day: 'Thu', calories: 350 },
        { day: 'Fri', calories: 400 },
        { day: 'Sat', calories: 150 },
        { day: 'Sun', calories: 275 }
      ]
    });
  }, []);

  const chartData = {
    labels: stats.weeklyProgress.map(day => day.day),
    datasets: [
      {
        label: 'Calories Burned',
        data: stats.weeklyProgress.map(day => day.calories),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Progress'
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to JAM Fitness
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Workouts
              </Typography>
              <Typography variant="h3">
                {stats.totalWorkouts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Calories Burned
              </Typography>
              <Typography variant="h3">
                {stats.caloriesBurned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Minutes
              </Typography>
              <Typography variant="h3">
                {stats.totalMinutes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Line options={chartOptions} data={chartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 