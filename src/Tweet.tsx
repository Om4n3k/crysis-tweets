import {FC, MouseEventHandler} from 'react';
import {Data, Medium} from "./types";
import moment from "moment-with-locales-es6";
import {FaTwitter} from "react-icons/fa";

interface Props {
  tweet: Data;
}

const Tweet: FC<Props> = (props) => {
  const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  const renderText = (txt: string) =>
    txt
      .split(" ")
      .map(part =>
        URL_REGEX.test(part) ? <a className='text-blue-500' href={part}>{part}</a> : part + " "
      );

  const generateMedia = (media: Medium) => {
    switch (media.type) {
      case 'photo': return <img key={media.media_key} src={media.url} className='w-auto rounded-md' alt={media.url}/>;
      case 'video': return <img key={media.media_key} src={media.preview_image_url} className={'w-auto rounded-md'} alt={media.preview_image_url}/>
      default: return <p key={media.media_key}>Unknown type {media.type}</p>
    }
  }

  const copyURL: MouseEventHandler = e => {
    navigator.clipboard.writeText(`https://twitter.com/${props.tweet.author.username}/status/${props.tweet.id}`).then(() => {
      alert('URL copied to clipboard');
    }).catch(e => {
      alert('Copying not allowed')
    })
  }

  return (
    <div className='p-4 bg-gray-900 rounded-md shadow shadow-sm space-y-4'>
      <div className='flex justify-between items-center'>
        <a rel='noreferrer' target='_blank' href={`https://twitter.com/${props.tweet.author.username}`} className='space-x-3'>
          <img src={props.tweet.author.profile_image_url} className='aspect-square w-8 rounded-full inline-block' alt={props.tweet.author.username}/>
          <span className='font-bold text-lg'>{props.tweet.author.username}</span>
        </a>
        <small>{moment(props.tweet.created_at).locale('pl').fromNow()}</small>
      </div>
      <p className='text-xl'>
        {renderText(props.tweet.text)}
      </p>
      {props.tweet.media.map(x => (
        generateMedia(x)
      ))}
      <div className='space-x-4 flex'>
        <button className='bg-blue-500 hover:bg-blue-700 transition-colors text-sm rounded-full w-auto px-4 h-10 uppercase font-bold tracking-wider' onClick={copyURL}>Kopiuj link</button>
        <a rel='noreferrer' href={`https://twitter.com/${props.tweet.author.username}/status/${props.tweet.id}`} target='_blank' className='bg-blue-500 hover:bg-blue-700 transition-colors rounded-full w-10 aspect-square flex items-center justify-center uppercase font-bold tracking-wider'><FaTwitter/></a>
      </div>
    </div>
  )
};

export default Tweet;