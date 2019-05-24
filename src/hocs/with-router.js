import React from 'react'
import PropTypes from 'prop-types'

import { wrapRouter } from '../router'

export default function (nextI18NextInternals) {
  return (WrappedComponent) => {
    class withRouter extends React.Component {
      render() {
        const { router: nextRouter } = this.context
        const router = wrapRouter(nextI18NextInternals, nextRouter)

        return <WrappedComponent router={router} {...this.props} />
      }
    }

    withRouter.contextTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      router: PropTypes.object,
    }

    const name = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    withRouter.displayName = `withRouter(${name})`

    withRouter.getInitialProps = WrappedComponent.getInitialProps

    return withRouter
  }
}
