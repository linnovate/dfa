import React, { useState, useEffect, useRef } from 'react'
import { Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } from 'chart.js';
Chart.register( ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle );

/**
 * React component for the `Requests Graph` of the `App`.
 */
const RequestsGraph: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user');
  const [myRequests,] = useGlobalState('myRequests');

  // local states
  const [items, setItems] = useState(null);
  const canvasRef = useRef();
  
  // load requests
  useEffect(() => {
    (async () => {
      
      if (!party) {
        setItems(null);
      } else {
        const res = await DamlJsonApi.query(["User:FlightRequest"]);
        const resCompleted = await DamlJsonApi.query(["User:CompletedRequest"])
    
        const itemsRequest = res.result.map(item => item.payload)
        const itemsCompleted = resCompleted.result.map(item => item.payload)
        const items = [...itemsRequest, ...itemsCompleted];
        setItems(items);
      }
      
    })()
    
  }, [party, myRequests])

  // create datasets
  let timeStart, timeEnd;
  let labels = [];
  let datasets = [];
  if (items) {
    datasets = items.map(item => {
      timeStart = new Date(item.flight.timeStart).toLocaleString();
      timeEnd = new Date(item.flight.timeEnd).toLocaleString();
      
      labels.includes(timeStart) || labels.push(timeStart)
      labels.includes(timeEnd) || labels.push(timeEnd)
      const color1 = Math.random() * 200 + 55;
      const color2 = Math.random() * 200 + 55;
      const color3 = Math.random() * 200 + 55;
      return {
        data: [{
          x: timeStart,
          y: item.flight.altitude,
          r: 13,
          backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
        }, {
          x: timeEnd,
          y: item.flight.altitude,
          r: 13,
          backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
        }],
        label: item.user,
        borderColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
        backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 0.5)`,
        tension: 0.1
      }
    });
  }

  labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  
  useEffect(() => {
    let myChart;
    if (canvasRef.current) {
      myChart = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {
          responsive: true,
          scales: {
            y: {
              display: true,
              title: {
                display: true,
                text: 'altitude'
              },
              suggestedMin: 0,
              suggestedMax: 2000
            }
          }
        },
      });
    }
  
    return () => {
      myChart && myChart.destroy();
    };
  },[datasets]);
  
  // template
  return (
      <Segment className="daml-section">

          <Header as='h2'>
              <Icon name='globe' />
              <Header.Content>Requests Graph</Header.Content>
          </Header>

          <Divider />

          { items && <canvas ref={canvasRef}></canvas> }

      </Segment>
  );
}

export default RequestsGraph;