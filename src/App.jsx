import { useState } from 'react'
import { generateDiskPoints, projectTo2D, rotateDisks } from './utils/geometry.js'
import './App.css'
import bsIcon from './assets/bs-thumb.png';

function App() {
  const [count, setCount] = useState(0)

  // const mainAxis = tiltAxis(20);
  const mainAxis = { x: .2, y: 1, z: 0 }
  const galaxyAxis = { x: 0, y: 1, z: 0 }

  // Set up the canvas
  const canvas = document.getElementById('galaxyCanvas')
  const ctx = canvas.getContext('2d')
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width
  canvas.height = height

  let gameIndex = 0

  const games = [
    {
      name: "Bubble Siege",
      page: "",
      image: "",
      ringIndex: 3,
      starIndex: 0,
      coords: { x: 0.2, y: 0.3 },
    }
  ]

  // Create an array to hold the disks
  const galaxy = [
    { points: generateDiskPoints(0, 10, 30, 15, galaxyAxis), color: '#ffffff' },
    { points: generateDiskPoints(5, 20, 80, 12, galaxyAxis), color: '#ffffff' },
    { points: generateDiskPoints(20, 60, 200, 8, galaxyAxis), color: '#ffffee' },
    { points: generateDiskPoints(40, 100, 200, 5, galaxyAxis), color: '#bbbbff' },
    { points: generateDiskPoints(80, 150, 200, 2, galaxyAxis), color: '#5555ff' },
  ]

  // Functions
  function rotateAndDraw() {
    rotateDisks(galaxy, mainAxis, 0.1)
    drawDisksOnCanvas(galaxy)
  }
  function drawDisksOnCanvas(disks) {
    // Clear the canvas
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < disks.length; i++) {
      const disk = disks[i]
      drawDisk(i, disk.points, width, height, disk.color)
    }
  }
  function drawDisk(i, disk, width, height, color) {
    for (let j = 0; j < disk.length; j++) {
      const point = disk[j];

      // Project the point to 2D coordinates
      const projectedPoint = projectTo2D(point.x, point.y, point.z);
      const adjustedPoint = {
        x: projectedPoint.x * 12 + (width / 2),
        y: projectedPoint.y * 12 + (height / 2),
      };

      // Draw the point on the canvas
      ctx.beginPath();
      ctx.arc(adjustedPoint.x, adjustedPoint.y, 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      for (let g = 0; g < games.length; g++) {
        const game = games[g];
        if (g != gameIndex) continue;
        const { coords, ringIndex, starIndex } = game;
        if (i == ringIndex && starIndex == j) {
          ctx.beginPath();
          ctx.moveTo(adjustedPoint.x, adjustedPoint.y);
          ctx.lineTo((coords.x + 0.1) * width, coords.y * height);
          ctx.lineTo((coords.x - 0.1) * width, coords.y * height);
          ctx.strokeStyle = '#fff';
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  // Start rotation
  // setUpLabels();
  var intervalId = setInterval(rotateAndDraw, 10);
  return (
    <>
      <h1 className='title'>
        Torr Games
      </h1>
      <div className="container">
      <div className="row">
        <div className="column">
          <a href="https://store.steampowered.com/app/2216560/Bubble_Siege/">
          <h2 className='centerText'>
            Bubble Siege
            <img className='game-thumb' src={bsIcon}></img>
          </h2>
          </a>
        </div>
        <div className="column">
          <h2 className='centerText'>
            Modular Space
          </h2>
          <h3 className='centerText'>{"(Coming soon)"}</h3>
        </div>
        <div className="column"></div>
      </div>
      <div className="row">
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
      </div>
    </div>
    </>
  )
}

export default App
