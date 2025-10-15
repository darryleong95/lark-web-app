import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name] = useState('John Doe');
  const [code, setCode] = useState('');
  const [errno, setErrno] = useState('');
  const [errString, setErrString] = useState('');

  function callRequestAuthCode() {
    window.tt.requestAuthCode({
      appId: "cli_a5c9dcc22038d010",
      success: (res) => {
        const { code } = res;
        setCode(code);
      },
      fail: (error) => {
        const { errno, errString } = error;
        setErrno(errno);
        setErrString(errString);
      },
    });
  }

  useEffect(() => {
    if (window && window.tt) {
      if (window.tt.requestAccess) {
        window.tt.requestAccess({
          appID: "cli_a5c9dcc22038d010",
          scopeList: [],
          success: (res) => {
            const { code } = res;
            setCode(code);
          },
          fail: (error) => {
            const { errno, errString } = error;
            if (errno === 103) {
              callRequestAuthCode();
            } else {
              setErrno(errno);
              setErrString(errString);
            }
          },
        });
      } else {
        callRequestAuthCode();
      }
    } else {
      setErrno(103);
      setErrString('No window.tt');
    }
    // For debugging: log the status when mounted or on update
    // console.log('App mounted', code, errno, errString);
  }, []);

  return (
    <div className="App">
      <div className="title-screen">
        <h1 className="main-title">Welcome to Lark</h1>
        <h2 className="name-display">{name}</h2>
        <div className="code-display">
          <strong>Code:</strong> {code}
        </div>
        <div className="errno-display">
          <strong>Errno:</strong> {errno}
        </div>
        <div className="errstring-display">
          <strong>ErrString:</strong> {errString}
        </div>
      </div>
    </div>
  );
}

export default App;
