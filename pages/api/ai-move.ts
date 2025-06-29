import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { fen, aiLevel } = req.body;
  const stockfishPath = path.join(process.cwd(), 'bin', 'stockfish.exe.exe');
  const stockfish = spawn(stockfishPath);
  let bestMove: { from: string; to: string; promotion?: string } | null = null;
  let multiPV: string[] = [];

  // Pronounced depth scaling
  let depth = 8;
  if (aiLevel == 1) depth = 2;
  else if (aiLevel == 2) depth = 3;
  else if (aiLevel == 3) depth = 4;
  else if (aiLevel == 4) depth = 6;
  else if (aiLevel == 5) depth = 10;
  else if (aiLevel == 6) depth = 14;
  else if (aiLevel == 7) depth = 18;
  else if (aiLevel == 8) depth = 22;

  // For lower levels, ask for multiple principal variations
  const useMultiPV = aiLevel <= 3;
  if (useMultiPV) {
    stockfish.stdin.write('setoption name MultiPV value 4\n');
  }
  stockfish.stdin.write('ucinewgame\n');
  stockfish.stdin.write(`position fen ${fen}\n`);
  stockfish.stdin.write(`go depth ${depth}\n`);

  stockfish.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      // Collect multipv moves for lower levels
      if (useMultiPV && line.startsWith('info') && line.includes(' pv ')) {
        const match = line.match(/multipv (\d+) .+ pv ([a-h][1-8][a-h][1-8][qrbn]?)/);
        if (match) {
          const move = match[2];
          if (!multiPV.includes(move)) multiPV.push(move);
        }
      }
      if (line.startsWith('bestmove')) {
        let move = line.split(' ')[1];
        // For lower levels, pick randomly from top 2-4 moves if available
        if (useMultiPV && multiPV.length > 1) {
          const maxChoices = aiLevel === 1 ? 4 : aiLevel === 2 ? 3 : 2;
          const choices = multiPV.slice(0, maxChoices);
          move = choices[Math.floor(Math.random() * choices.length)];
        }
        if (move && move !== '(none)') {
          bestMove = {
            from: move.slice(0, 2),
            to: move.slice(2, 4),
            promotion: move.length > 4 ? move.slice(4) : undefined,
          };
        }
        stockfish.kill();
        res.status(200).json({ move: bestMove });
      }
    }
  });

  stockfish.stderr.on('data', (data) => {
    console.error(`Stockfish error: ${data}`);
  });

  stockfish.on('error', (err) => {
    res.status(500).json({ error: 'Failed to run Stockfish', details: err.message });
  });
} 