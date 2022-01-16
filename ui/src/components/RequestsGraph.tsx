import React, { useState, useEffect, useRef } from 'react'
import { Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { useGlobalState } from "../contexts/GlobalState";
import DamlJsonApi from '../services/DamlJsonApi';

import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } from 'chart.js';
Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle);

const list = [];
let ws;

/**
 * React component for the `Requests Graph` of the `App`.
 */
const RequestsGraph: React.FC = () => {

  // global states
  const party = DamlJsonApi.party;
  const [user, setUser] = useGlobalState('user'); // enable context recycling

  // local states
  const [items, setItems] = useState();
  const canvasRef = useRef();

  // load items
  useEffect(() => {
    (async () => {

      if (!party) {
        ws?.close();
        setItems(null);
      } else {
        // setup listener 
        ws = DamlJsonApi.querySocket(["User:FlightRequest"], { user: party });
        ws.addEventListener("message", (event) => {
          const isUpdate = DamlJsonApi.messageHandler(event, list);
          isUpdate && setItems([...list]);
        });
      }

    })()
  }, [party])

  // create datasets
  let timeStart, timeEnd;
  let labels = [];
  let datasets = [];
  if (items) {
    datasets = items.map(item => {
      const flight = item.payload.flight;
      timeStart = new Date(flight.timeStart).toLocaleString();
      timeEnd = new Date(flight.timeEnd).toLocaleString();

      labels.includes(timeStart) || labels.push(timeStart)
      labels.includes(timeEnd) || labels.push(timeEnd)
      const color1 = Math.random() * 200 + 55;
      const color2 = Math.random() * 200 + 55;
      const color3 = Math.random() * 200 + 55;
      return {
        data: [{
          x: timeStart,
          y: flight.altitude,
          r: 13,
          backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
        }, {
          x: timeEnd,
          y: flight.altitude,
          r: 13,
          backgroundColor: `rgba(${color1}, ${color2}, ${color3}, 1)`,
        }],
        label: item.payload.user.split("::")[0],
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
  }, [datasets]);

  // template
  return (
    <Segment className="daml-section">

      <Header as='h2'>
        <Icon name='globe' />
        <Header.Content>Requests Graph</Header.Content>
      </Header>

      <Divider />

      {items && <canvas ref={canvasRef}></canvas>}

    </Segment>
  );
}

export default RequestsGraph;