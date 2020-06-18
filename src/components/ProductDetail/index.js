import React from 'react';
import { getApi } from 'src/common/apiService/apiWrapper';
import { getDate } from 'src/common/utils';

import Header from 'src/components/CommonComponents/Header';
import Loader from 'src/components/CommonComponents/Loader';

import './style.scss';

class ProductDetail extends React.Component {
  state = {
    productDetails: [],
    date: new Date(),
    loading: true,
    votesCount: 0
  };
  componentDidMount() {
    this.getProductDetails(getDate());
  }

  getProductDetails = date => {
    const { location } = this.props;
    const accessToken = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      Host: 'api.producthunt.com'
    };
    const id = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    );

    getApi(`posts/${id}`, { headers }).then(res => {
      if (res.status === 200) {
        this.setState({
          productDetails: res.data.post,
          votesCount: res.data.post.votes_count,
          loading: false
        });
      }
    });
  };

  render() {
    const { loading, productDetails, votesCount } = this.state;

    return (
      <>
        <Header />
        {loading && <Loader />}
        <div className="container main">
          {loading && 'Loading....'}
          <div className="post-desc">
            <div className="post-header">
              <div className="post-thumbnail">
                <img
                  src={
                    productDetails &&
                    productDetails.thumbnail &&
                    productDetails.thumbnail.image_url
                  }
                />
              </div>
              <div className="post-detail">
                <div className="post-title">{productDetails.name}</div>
                <div className="post-tagline">{productDetails.tagline}</div>

                {productDetails &&
                  productDetails.topics &&
                  productDetails.topics.map(t => {
                    return (
                      <span className="post-topic">
                        <span>{t.name}</span>
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className="post-body">
              <div className="pb-left">
                <div className="pb-desc">{productDetails.description}</div>
                <div className="pb-discussion">
                  <span>DISCUSSION</span>
                  <div className="pb-comments">
                    {productDetails.comments &&
                      productDetails.comments.length > 0 &&
                      productDetails.comments.map((c, i) => {
                        return (
                          <>
                            {i < 5 && (
                              <div className="comment-box">
                                <div className="post-thumbnail">
                                  <img
                                    src={
                                      c.user &&
                                      c.user.image_url &&
                                      c.user.image_url['64px']
                                    }
                                  />
                                </div>
                                <div className="post-detail">
                                  <div className="post-title">
                                    {c.user && c.user.name}
                                    {c.user && c.user.headline && (
                                      <span className="user-desg">
                                        {c.user && c.user.headline}
                                      </span>
                                    )}
                                  </div>
                                  <div className="post-tagline">{c.body}</div>
                                  <span className="comment-reply">{`Reply (${
                                    c.child_comments_count
                                  })`}</span>
                                  <span className="comment-reply">Share</span>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="pb-right">
                <div
                  className="pb-votes"
                  onClick={() =>
                    this.setState({ votesCount: this.state.votesCount + 1 })
                  }
                >
                  <span>{`Votes (${votesCount})`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductDetail;
