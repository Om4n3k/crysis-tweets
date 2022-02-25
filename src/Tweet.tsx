import {FC} from 'react';
import {Data, Medium} from "./types";
import moment from "moment-with-locales-es6";

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
    if (media.type === 'video') console.log(media);
    switch (media.type) {
      case 'photo': return <img key={media.media_key} src={media.url} className='w-auto rounded-md' alt={media.url}/>;
      case 'video': return <img key={media.media_key} src={media.preview_image_url} className={'w-auto rounded-md'} alt={media.preview_image_url}/>
      default: return <p key={media.media_key}>Unknown type {media.type}</p>
    }
  }

  return (
    <div className='p-4 bg-gray-900 rounded-md shadow shadow-sm space-y-4'>
      <div className='flex justify-between items-center'>
        <div className='space-x-3'>
          <img src={props.tweet.author.profile_image_url} className='aspect-square w-8 rounded-full inline-block' alt={props.tweet.author.username}/>
          <span className='font-bold text-lg'>{props.tweet.author.username}</span>
        </div>
        <small>{moment(props.tweet.created_at).locale('pl').fromNow()}</small>
      </div>
      <p className='text-xl'>
        {renderText(props.tweet.text)}
      </p>
      {props.tweet.media.map(x => (
        generateMedia(x)
      ))}
    </div>
  )
};

export default Tweet;