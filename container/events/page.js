// events.page.js
import { connect } from 'react-redux'
// import NoSSR from 'react-no-ssr';
// import Clock from './redux-example-Clock'
// import AddCount from './redux-example-AddCount'

export default connect(state => state.Root)(({name,language,pageSEO
}) => {
  return (
    <div>
      <h1>{name[language]}</h1>
      <h2>{pageSEO?'on SEO':'on CLIENT'}</h2>
    </div>
  )
})


