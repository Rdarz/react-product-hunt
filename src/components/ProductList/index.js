import React from 'react';
import { getAuthToken } from './api';
import { getApi } from 'src/common/apiService/apiWrapper';

import { getDate } from 'src/common/utils';
import Header from 'src/components/CommonComponents/Header';
import Loader from 'src/components/CommonComponents/Loader';
import DatePicker from 'react-date-picker';
import './style.scss';

class ProductList extends React.Component {
  state = {
    productList: [],
    date: new Date(),
    loading: true
  };
  componentDidMount() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      getAuthToken('oauth/token', {
        client_id: process.env.PH_API_KEY,
        client_secret: process.env.PH_API_SECRET,
        grant_type: 'client_credentials'
      }).then(res => {
        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.access_token);
        }
      });
    }
    if (accessToken) {
      this.getProduct(getDate());
    }
  }

  getProduct = date => {
    const accessToken = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      Host: 'api.producthunt.com'
    };
    getApi(`posts?day=${date}`, { headers }).then(res => {
      if (res.status === 200) {
        this.setState({
          productList: res.data.posts,
          loading: false
        });
      }
    });
  };
  onChange = date => {
    this.setState({ date, loading: true }, () => {
      this.getProduct(getDate(date));
    });
  };
  render() {
    const { productList, loading } = this.state;

    return (
      <>
        <Header />
        {loading && <Loader />}
        <div className="container main">
          <div className="postHeader">
            <div className="postDate">Product</div>
            <div className="dateInput">
              <DatePicker
                onChange={this.onChange}
                value={this.state.date}
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="posts">
            {productList &&
              productList.length > 0 &&
              productList.map((post, i) => {
                return (
                  <div
                    className="post"
                    key={i}
                    onClick={() => {
                      this.props.history.push(`/post/${post.id}`);
                    }}
                  >
                    <div className="post-thumbnail">
                      <img
                        src={post && post.thumbnail && post.thumbnail.image_url}
                      />
                    </div>
                    <div className="post-details">
                      <div className="post-left">
                        <div className="post-title">{post.name}</div>
                        <div className="post-tagline">{post.tagline}</div>
                        <span className="post-comments-count">
                          <img
                            src="src/common/assets/images/comment.png"
                            width="15"
                          />
                          <span>{post.comments_count}</span>
                        </span>
                      </div>
                      <div className="post-right">
                        <div className="votes-count">
                          <span>{post.votes_count}</span>
                          <div>Votes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default ProductList;
