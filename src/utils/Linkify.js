import React from "react";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";

function linkifyDecorator(decoratedHref, decoratedText, key) {
  const match = decoratedHref.match(/^https?:\/\/[\bwww\b]?\.?screenhole\.\w+\/?(.*)/);

  if (match) {
    return <Link to={`/${match[1]}`} key={key}>{decoratedText}</Link>
  }

  return (
    <a href={decoratedHref} key={key} target="_blank" rel="noopener nofollow">{decoratedText}</a>
  );
}

const WrappedLinkify = ({ children, ...rest }) => (
  <Linkify componentDecorator={linkifyDecorator} {...rest}>
    {children}
  </Linkify>
);

export default WrappedLinkify;
