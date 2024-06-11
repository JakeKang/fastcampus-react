import React from 'react';

const BookAdd = ({ add }) => {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [url, setUrl] = React.useState('');
  return (
    <div>
      <h3>Book Add Form</h3>
      <p>
        title : <input type="text" value={title} onChange={changeTitle} />
      </p>
      <p>
        comment : <input type="text" value={message} onChange={changeMessage} />
      </p>
      <p>
        author : <input type="text" value={author} onChange={changeAuthor} />
      </p>
      <p>
        url : <input type="text" value={url} onChange={changeUrl} />
      </p>
      <p>
        <button
          onClick={create}
          disabled={
            title === '' || message === '' || author === '' || url === ''
          }
        >
          등록
        </button>
      </p>
    </div>
  );

  function create() {
    console.log('create');
    add({ title, message, author, url });
    setTitle('');
    setMessage('');
    setAuthor('');
    setUrl('');
  }

  function changeTitle(e) {
    setTitle(e.target.value);
  }

  function changeMessage(e) {
    setMessage(e.target.value);
  }

  function changeAuthor(e) {
    setAuthor(e.target.value);
  }

  function changeUrl(e) {
    setUrl(e.target.value);
  }
};

export default BookAdd;
