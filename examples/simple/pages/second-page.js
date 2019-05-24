import React from 'react'
import PropTypes from 'prop-types'

import { withNamespaces, withRouter, Link } from '../i18n'

class SecondPage extends React.Component {

  static async getInitialProps() {
    return {
      namespacesRequired: ['second-page'],
    }
  }

  render() {
    const { router, t } = this.props
    return (
      <React.Fragment>
        <h1>{t('h1')}</h1>
        <Link href='/'>
          <button
            type='button'
          >
            {t('back-to-home')}
          </button>
        </Link>
        <button type='button' onClick={() => router.replace('/')}>
          {t('back-to-home')}
          - withRouter
        </button>
      </React.Fragment>
    )
  }
}

SecondPage.propTypes = {
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default withRouter(withNamespaces('second-page')(SecondPage))
