import React from 'react'
import Head from 'next/head'
// import Layout from '~/components/BlogLayout'
// import P from '~/components/P'
// import InlineCode from '~/components/InlineCode'

export default function WithDoc (options) {
  return function (content) {
    return class BlogPost extends React.Component {
      // getUrl(slug) {
      //   return `${ROOT_URL}/blog/${options.slug}`
      // }

      getShareLink(link) {
        return `/share?slug=${options.slug}&redirectTo=${encodeURIComponent(link)}`
      }

      render () {
        return (
            <div>

              <div className="markdown-content">
                {content}
              </div>

            </div>
        )
      }
    }
  }
}

// export const components = {
//   p: P,
//   code: InlineCode
// }
