import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';

class DetailsPage extends React.Component {
  state = {
    item: null,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { pageContext } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const detailItem = this.props[pageContext].filter((el) => el.id === id);

    this.setState({ item: detailItem[0] });
  }

  render() {
    const { item } = this.state;

    return item ? (
      <DetailsTemplate
        title={item.title}
        created={item.created}
        content={item.content}
        articleUrl={item.articleUrl}
        twitterName={item.twitterName}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}

DetailsPage.propTypes = {
  pageContext: PropTypes.string.isRequired,
  id: PropTypes.string,
  match: PropTypes.instanceOf(Object),
  params: PropTypes.instanceOf(Object),
};

DetailsPage.defaultProps = {
  id: '',
  match: {},
  params: {},
};

const mapStateToProps = (state) => ({
  articles: state.app.articles,
  notes: state.app.notes,
  twitters: state.app.twitters,
});

export default withContext(connect(mapStateToProps)(DetailsPage));
