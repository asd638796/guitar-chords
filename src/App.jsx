import React, { useState } from 'react';

function GridLines({ rows, cols }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          style={{
            border: '1px solid lightgray',
            boxSizing: 'border-box',
          }}
        />
      ))}
    </div>
  );
}

function Circle({ number, showNumber }) {
  return (
    <div
      style={{
        width: '4vw',
        height: '4vw',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5vw',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {showNumber && number}
    </div>
  );
}

function GuitarFretboard() {
  const [chord, setChord] = useState('');
  const [scaleShape, setScaleShape] = useState('');
  const [showClosedGrid, setShowClosedGrid] = useState(false);
  const [showOpenGrid, setShowOpenGrid] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true); // Toggle numbers
  const [circles, setCircles] = useState([]);

  const rows = 5;
  const cols = 4;

  const generateVisualization = () => {
    const chordArray = chord
      .split(' ')
      .map((val) => (val === 'x' ? null : parseInt(val, 10)));

    const scaleArray = scaleShape
      .trim()
      .split('\n')
      .map((line) =>
        line.split(' ').map((v) => (v === 'x' ? null : parseInt(v, 10)))
      );

    const newCircles = [];
    for (let i = 0; i < chordArray.length; i++) {
      const chordValue = chordArray[i];
      if (chordValue == null) continue;

      if (!scaleArray[i]) continue;

      const colIndex = scaleArray[i].indexOf(chordValue);
      if (colIndex < 0) continue;

      const leftVw = (colIndex + 0.5) * (50 / cols);
      const topVh = i * 10;

      newCircles.push({
        chordValue: chordValue,
        top: topVh,
        left: leftVw,
      });
    }

    setCircles(newCircles);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        height: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder='Enter chord (e.g., "x 1 x 3 7 x")'
          value={chord}
          onChange={(e) => setChord(e.target.value)}
          style={{ width: '50vw', padding: '10px', marginBottom: '10px' }}
        />

        <textarea
          placeholder="Enter scale shape row by row (e.g., '0 1 2 3' on each line)"
          value={scaleShape}
          onChange={(e) => setScaleShape(e.target.value)}
          style={{ width: '50vw', height: '150px', padding: '10px' }}
        />

        <div style={{ marginTop: '10px' }}>
          <button
            onClick={generateVisualization}
            style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}
          >
            Generate Visualization
          </button>

          <button
            onClick={() => setShowClosedGrid(!showClosedGrid)}
            style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}
          >
            {showClosedGrid
              ? 'Hide Fretboard Grid (Closed Position)'
              : 'Show Fretboard Grid (Closed Position)'}
          </button>

          <button
            onClick={() => setShowOpenGrid(!showOpenGrid)}
            style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}
          >
            {showOpenGrid
              ? 'Hide Fretboard Grid (Open Position)'
              : 'Show Fretboard Grid (Open Position)'}
          </button>

          {/* TOGGLE SHOW NUMBERS */}
          <button
            onClick={() => setShowNumbers(!showNumbers)}
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            {showNumbers ? 'Hide Numbers' : 'Show Numbers'}
          </button>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          width: '70vw',
          height: '50vh',
          margin: '5vw',
        }}
      >
        {showClosedGrid && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50vw',
              height: '50vh',
            }}
          >
            <GridLines rows={5} cols={4} />
          </div>
        )}

        {showOpenGrid && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '12.5vw',
              width: '50vw',
              height: '50vh',
            }}
          >
            <GridLines rows={5} cols={4} />
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50vw',
            height: '50vh',
          }}
        >
          {circles.map((c, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: `${c.top}vh`,
                left: `${c.left}vw`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Circle number={c.chordValue} showNumber={showNumbers} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuitarFretboard;
