function truncateText(text, maxLength) {
    let words = text.split(' ');
    let truncatedText = words.slice(0, maxLength).join(' ');
    if (words.length > maxLength) {
      truncatedText += '...';
    }
    return truncatedText;
  }

export {truncateText};
