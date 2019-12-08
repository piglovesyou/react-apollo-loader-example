/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Home.css';
import { useHomeNewsQuery } from './news.graphql';

type Props = {};

const Home = (_: Props) => {
  const { data, loading } = useHomeNewsQuery();
  useStyles(s);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <p className={s.networkStatusMessage}>
          {data && data.networkStatus.isConnected ? 'Online' : 'Offline'}
        </p>
        <h1>React.js News</h1>
        {loading || !data || !data.reactjsGetAllNews
          ? 'Loading...'
          : data.reactjsGetAllNews.map(item => (
              <article key={item.link} className={s.newsItem}>
                <h1 className={s.newsTitle}>
                  <a href={item.link}>{item.title}</a>
                </h1>
                <div
                  className={s.newsDesc}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </article>
            ))}
      </div>
    </div>
  );
};

export default Home;
