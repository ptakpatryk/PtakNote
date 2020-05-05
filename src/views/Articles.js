import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/Molecules/Card/Card';
import Heading from 'components/atoms/Heading/Heading';
import { cutString } from 'shared/utility';
import Modal from 'components/Organisms/Modal/Modal';

function Articles({ articles, filterValue, error }) {
  return (
    <GridTemplate>
      <>
        <Modal show={error}>Something went wrong!</Modal>
        {articles.length === 0 ? (
          <Heading>No articles to show.</Heading>
        ) : (
          articles
            .filter((el) => el.title.toLowerCase().includes(filterValue))
            .map((el) => (
              <Card
                id={el.id}
                key={el.id}
                title={el.title}
                content={cutString(el.content, 15)}
                created={el.created}
                articleUrl={el.articleUrl}
                cardType="articles"
              />
            ))
        )}
      </>
    </GridTemplate>
  );
}

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  filterValue: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Object),
};

Articles.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  return {
    articles: state.app.articles,
    filterValue: state.app.filterValue,
    error: state.app.error,
  };
};

export default connect(mapStateToProps)(Articles);
