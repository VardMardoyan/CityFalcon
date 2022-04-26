import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import Header from './components/Header';
import Main from './components/Main';
import StoryService from './services/services';
import './App.css';

const App = () => {
  const [service] = useState(new StoryService());
  const [stories, setStories] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [language, setLanguage] = useState('en');
  const [orderBy, setOrderBy] = useState('top');
  const [minutes, setMinutes] = useState(1000)

  useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    service.getAllStories().then((res) => {
      if (res) {
        setNextPageToken(res.next_page_token);
        setStories(res.stories);
        setLoading(false);
      }
    });
  };

  const loadMoreStories = (value) => {
    service.getMoreStories(language, orderBy, nextPageToken).then((res) => {
      const selectedLanguage = res.stories.filter((lang) => { return value == lang.lang });
      setStories((prevData) => [...prevData, ...selectedLanguage]);
      setNextPageToken(res.next_page_token);
    });
  };

  const toggleFilter = () => {
    setIsFilterActive((isFilterActive) => !isFilterActive);
  };

  const refreshContent = () => {
    setLoading(true);
    setIsFilterActive(false);
    getStories();
  };

  const changeLanguage = ({ target: { value } }) => {
    setLoading(true);
    setLanguage(value);
    service.filterStories(value, orderBy).then(res => {
      const selectedLanguage = res.stories.filter((lang) => { return value == lang.lang });
      setStories([...selectedLanguage]);
      setLoading(false);
    });
  };

  const changeOrderBy = ({ target: { value } }) => {
    setLoading(true);
    setOrderBy(value);
    service.filterStories(value, language).then(res => {
      setStories([...res.stories]);
      setLoading(false);
    });
  };

  const changeAutoRefreshTime = ({ target: { value } }) => {
    setTimeout(() => {
      refreshContent();
    }, value);
  };

  const reset = () => {
    setLanguage('en');
    setOrderBy('top');
    setMinutes(minutes);
    refreshContent();
  };

  return (
    <div className="App">
      <Header />
      <Filters reset={reset} changeAutoRefreshTime={changeAutoRefreshTime} changeOrderBy={changeOrderBy} language={language} changeLanguage={changeLanguage} refreshContent={refreshContent} isFilterActive={isFilterActive} toggleActive={toggleFilter} />
      {loading ? <h3>Loading...</h3> : <Main stories={stories} loadMoreStories={loadMoreStories} />}
    </div>
  );
};

export default App;
