

import glamorous from 'glamorous'
import {ThemeProvider} from 'glamorous'

const theme = {
  main: {color: 'red'}
}

const hh = glamorous.h1({
  fontSize: '10px'
}, ({theme}) => ({
  color: theme.main.color
}))

// export default ()=>{
//     <div>
//         <ThemeProvider theme={theme}>
//           <hh>Hello!</hh>
//         </ThemeProvider>
//     </div>
// }


export default function App() {
  return (

        <ThemeProvider theme={theme}>
          <hh>Hello!</hh>
        </ThemeProvider>



    )}



// action             = {type,text(is a state )}
// action creator     = function: return {action};
