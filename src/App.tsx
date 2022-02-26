import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Data, Medium, TwitterResponse} from "./types";
import Tweet from "./Tweet";
import {FaSpinner} from "react-icons/fa";

function App() {
  const [tweets, setTweets] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true)
      const response = await axios.get<TwitterResponse>(`${process.env.REACT_APP_API_URL}/tweets`);
      const mapped = response.data.data.map(x => {
        let media: Medium[] = [];
        if (x.attachments && x.attachments.media_keys?.length > 0) {
          media = response.data.includes.media.filter(y => x.attachments.media_keys.includes((y.media_key)));
        }
        let author = response.data.includes.users.find(y => y.id === x.author_id)!

        return {
          ...x,
          author,
          media,
        }
      })
      setTweets(mapped);
      setLoading(false)
    }

    const interval = setInterval(async () => {
      fetchTweets();
    }, 60000);
    fetchTweets();
    return () => {
      clearInterval(interval)
    }
  }, []);

  return (
    <>
      <header className='w-full h-16 mb-4 bg-blue-900'>
        <div className='container mx-auto h-full flex items-center'>
          <h1 className='text-2xl font-bold'>Ukraine Crisis Tweets</h1>
        </div>
      </header>
      {loading && <FaSpinner className='text-6xl animate-spin text-blue-500 mx-auto my-8'/>}
      {!loading && (
        <div className='max-w-screen-md mx-auto space-y-4'>
          {tweets.map(x => (
            <Tweet tweet={x} key={x.id}/>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
