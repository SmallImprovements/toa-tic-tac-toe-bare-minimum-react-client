import React from 'react';
import withTicTacToe from '../withTicTacToe';
import './style.css';

// A sample game object that is received as props in the TicTacToe component
//
// {
//   gameUid: 'someId',
//   players: ['max', 'moritz']
//   turn: 'moritz',
//   board: [
//     ['max', 'moritz', ''],
//     ['', 'max', ''],
//     ['', '', '']
//   ],
//   status: {
//     type: 'ONGOING',
//     winner: null
//   }
// }

const rowStyle = {
  display: 'flex',
};

const cellStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'lightcoral',
  color: 'white',
  width: '100px',
  height: '100px',
  fontSize: '40px',
  marginRight: '5px',
  marginBottom: '5px',
};

class TicTacToe extends React.Component {
  render() {
    const { game, games, isInGame, hasPendingGame, actions, username } = this.props;
    const { create, join, leave, move } = actions;

    return (
      <div>
        <div>Hello { username }</div>
        { isInGame ?
            <Game username={username} game={game} onMove={move} onLeave={leave} /> :
            <Lobby games={games} onJoin={join} onCreate={create} />
        }
      </div>
    );
  }
}

export default withTicTacToe(TicTacToe);

function Game({ game, username, onMove, onLeave }) {
  return (
    <div>
      <div>
        { game.status.type === 'FINISHED' ?
          `${game.status.winner} wins!` :
          game.turn === username ? 'Make a move' : 'Waiting for other player'
        }
      </div>

      <div>
        { game.board.map((row, y) => {
          return (
            <div key={y} style={rowStyle}>
              {
                row.map((col, x) => {
                  let mark = '';
                  if (game.players[0] === col) { mark = 'X'; }
                  if (game.players[1] === col) { mark = 'O'; }
                  const onClick = mark ? () => {} : () => onMove({ y, x });
                  return (
                    <div key={x} style={cellStyle} onClick={onClick}>{ mark }</div>
                  );
                })
              }
            </div>
          );
        })}
      </div>
      <button onClick={onLeave}>Leave</button>
    </div>
  );
}

function Lobby({ games, onJoin, onCreate }) {
  return (
    <div>
        <div>
            <button onClick={onCreate}>Create new game</button>
        </div>

        <h1>Pending Games</h1>
        <ul>
            { games.map((game) => {
              return (
                <li key={game.gameUid}>
                  <button onClick={() => onJoin(game.gameUid) }>
                     { game.players[0] }
                  </button>
                </li>
              );
            })}
        </ul>
    </div>
  );
}
