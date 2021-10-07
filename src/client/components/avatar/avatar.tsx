import React from 'react';
import './style.scss';

export default function Avatar({ name, imgSrc }: { name: string, imgSrc: string | undefined }): JSX.Element {
  return (
    imgSrc ? <img className="avatar avatar_img" src={imgSrc} alt={`member - ${name}`} />
      : <div className="avatar avatar_name"><p>{name[0]}</p></div>
  );
}
