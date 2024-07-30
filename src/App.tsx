import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DiceSimulationApp: React.FC = () => {
  const [trials, setTrials] = useState<number>(50);
  const [results, setResults] = useState<{ average: string; count: number }[]>([]);

  const rollDice = (): number => Math.floor(Math.random() * 6) + 1;

  const simulateDiceRolls = () => {
    const newResults = Array(51).fill(0);
    for (let i = 0; i < trials; i++) {
      const sum = Array(10).fill(0).map(rollDice).reduce((a, b) => a + b, 0);
      const average = sum / 10;
      const index = Math.round((average - 1) * 10);
      newResults[index]++;
    }
    setResults(newResults.map((count, index) => ({
      average: ((index / 10) + 1).toFixed(1),
      count
    })));
  };

  useEffect(() => {
    simulateDiceRolls();
  }, [trials]);

  const handleTrialsChange = (value: number) => {
    const newValue = Math.max(50, value);
    setTrials(newValue);
  };

  return (
    <div className="App">
      <h1>サイコロシミュレーション (10回振り)</h1>
      <div>
        <label htmlFor="trials">試行回数:</label>
        <button onClick={() => handleTrialsChange(trials - 50)} disabled={trials <= 50}>-</button>
        <input
          id="trials"
          type="number"
          value={trials}
          onChange={(e) => handleTrialsChange(parseInt(e.target.value) || 50)}
          min="50"
        />
        <button onClick={() => handleTrialsChange(trials + 50)}>+</button>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={results}>
            <XAxis dataKey="average" type="number" domain={[1, 6]} ticks={[1, 2, 3, 4, 5, 6]} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiceSimulationApp;