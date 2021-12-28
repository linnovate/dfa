import React, { useEffect, useRef } from 'react';
import { Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml.js/dfa';
import { useParty, useQuery } from '@daml/react';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
 } from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

const RequestsGraph: React.FC = () => {

  const party = useParty();
  const canvasRef = useRef();

  const results = useQuery(User.FlightRequest);
  // const resultsCompleted = useQuery(User.CompletedRequest);

  const datasets = results.contracts.map(item => {
    const color1 = Math.random() * 200 + 55;
    const color2 = Math.random() * 200 + 55;
    const color3 = Math.random() * 200 + 55;
    return {
      data: [{
        x: item.payload.flight.timeStart,
        y: item.payload.flight.altitude,
        r: 13,
        backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
      }, {
        x: item.payload.flight.timeEnd,
        y: item.payload.flight.altitude,
        r: 13,
        backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
      }],
      label: item.payload.user,
      borderColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
      backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 0.5)`,
      tension: 0.1
    }
  });
  
  useEffect(() => {
    let myChart;
    if (canvasRef.current) {
      myChart = new Chart(canvasRef.current, {
        type: 'line',
        data: { 
          datasets
        },
      });
    }
  
    return () => {
      myChart && myChart.destroy();
    };
  },[datasets]);
  


  
  return (
      <Segment className="daml-section">

          <Header as='h2'>
              <Icon name='globe' />
              <Header.Content>Requests Graph</Header.Content>
          </Header>

          <Divider />

          { party && <canvas ref={canvasRef}></canvas> }

      </Segment>
  );
}

export default RequestsGraph;