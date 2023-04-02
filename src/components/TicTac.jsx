import React,{useState} from 'react'
import './TicTac.css'
const TicTac = () => {
    const[board, setboard]= useState(Array(9).fill(null));
    const [player , setplayer] =useState('X');
    const[winner,setwinner] = useState(null);

    //defining possible winning combinations
    const checkWinner=(board) =>{
        const lines =[
            [1,2,3],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],

        ];
        //checking if any winnning combination have been achived bt a player

        for(let i=0;i<lines.length;i++)
        {
            const[a,b,c]=lines[i];
            if(board[a]&&board[a]===board[b]&&board[a]===board[c])
            {
                return board[a];
            }
        }
        //return null if their no winner
        return null;
    };

   // handle check events on the game board 
   const handleClick =(index)=>{
    //create a new board array
    const newBoard= [...board];
    //check if their is winner or square has already been clicked
    if(winner|| newBoard[index]) return;
    //set the new board state

    newBoard[index]=player;
    setboard(newBoard);
    setplayer(player === 'X' ?'O' :'X');
    setwinner(checkWinner(newBoard));

   };
   
   //render a single square on the game board

   const renderSquare =(index)=>(
    <button className='square' onClick={()=>handleClick(index)}>{board[index]}</button>

   );
   

   //render the entire board

   const renderBoard=()=>( 

<div className='board'>
   <div className='row'>
     {renderSquare(0)}
     {renderSquare(1)}
     {renderSquare(2)}
  </div>
  <div className='row'>
         {renderSquare(3)}
         {renderSquare(4)}
         {renderSquare(5)}
  </div>
  <div className='row'>
         {renderSquare(6)}
         {renderSquare(7)}
         {renderSquare(8)}
  </div>
</div>

   );

   //render game status message
   const renderStatus =()=>{
    if(winner){
        // eslint-disable-next-line no-template-curly-in-string
        return `Winner: ${winner}`;

    }
    else if(board.every((value)=>value=null)){
        return 'Draw';

    }else{
        // eslint-disable-next-line no-template-curly-in-string
        return `Next player : ${player}`;
    }
   };
   //reset the game to its innitial state

   const restGame=()=>{
    setboard(Array(9).fill(null));
    setplayer('X');
    setwinner(null);
   }
  return (
    <div className="game">
   
    <h1>React - TicTac </h1>
        <div className='game-board'>
        {renderBoard()}
        </div>
        <div className='game-info'>
        
        <div>{renderStatus()}</div>
        <button onClick={restGame}>Rest Game</button>

        </div>
        </div>
  )
}

export default TicTac
