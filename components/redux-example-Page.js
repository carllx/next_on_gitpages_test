import Link from 'next/link'
import { connect } from 'react-redux'
import Clock from './redux-example-Clock'
import AddCount from './redux-example-AddCount'

export default connect(state => state)(({ title, linkTo, lastUpdate, light }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Clock lastUpdate={lastUpdate} light={light} />
      <AddCount />
      <nav>
        <Link href={linkTo}><a>Navigate</a></Link>
      </nav>
    </div>
  )
})


