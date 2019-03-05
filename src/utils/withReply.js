import React from "react";

export function withReply(message) {
  const catchMention = message.match(/(@\w+)/g);

  if (catchMention) {
    const linkedReply = `<a href="/${catchMention[0].slice(1)}">${catchMention[0]}</a>`;
    const composedMessage = message.replace(catchMention[0], linkedReply);

    // yolo baby
    return <span dangerouslySetInnerHTML={ {__html: composedMessage}} />
  } else {
    return message;
  }
}
