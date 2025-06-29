import { NextResponse } from 'next/server';
import { Chess } from 'chess.js';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: Request): Promise<Response> {
  try {
    const { fen } = await request.json();
    
    if (!fen) {
      return NextResponse.json({ error: 'FEN string is required' }, { status: 400 });
    }

    // Validate FEN
    try {
      new Chess(fen);
    } catch {
      return NextResponse.json({ error: 'Invalid FEN string' }, { status: 400 });
    }

    // Run Stockfish analysis
    const stockfish = spawn(path.join(process.cwd(), 'bin', 'stockfish'));
    
    return new Promise<Response>((resolve) => {
      let analysis = '';
      const timeout = setTimeout(() => {
        stockfish.kill();
        resolve(NextResponse.json({ analysis: 'Analysis timed out' }, { status: 408 }));
      }, 5000);

      stockfish.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('bestmove')) {
          clearTimeout(timeout);
          stockfish.kill();
          resolve(NextResponse.json({ analysis }));
        } else if (output.includes('info depth')) {
          analysis = output.split('\n').pop() || '';
        }
      });

      stockfish.on('error', () => {
        clearTimeout(timeout);
        resolve(NextResponse.json({ error: 'Stockfish error' }, { status: 500 }));
      });

      // Set up commands for Stockfish
      stockfish.stdin.write('uci\n');
      stockfish.stdin.write('setoption name MultiPV value 1\n');
      stockfish.stdin.write(`position fen ${fen}\n`);
      stockfish.stdin.write('go depth 20\n');
    });
  } catch {
    console.error('Analysis error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 