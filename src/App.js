import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

    const [name, setName] = useState('John Doe');
    const [code, setCode] = useState('');
    const [errno, setErrno] = useState('');
    const [errString, setErrString] = useState('');

    function callRequestAuthCode() {
        window.tt.requestAuthCode({
            // Web application App ID
            appId: "cli_a5c9dcc22038d010",
            success: (res) => {
            // Return the pre-authorization code after the user does not need to log in
            const { code } = res;
            setCode(code);
            },
            fail: (error) => {
            // If the login fails, the corresponding errno and errString will be returned.
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
                // Web application App ID
                appID: "cli_a5c9dcc22038d010",
                scopeList: [],
                success: (res) => {
                    //Return pre-authorization code after user authorization
                    const { code } = res;
                    setCode(code);
                },
                fail: (error) => {
                    // It is necessary to additionally determine whether it is a failure caused by the client not supporting requestAccess based on errno.
                    const { errno, errString } = error;
                    if (errno === 103) {
                    // The client version is too low and does not support requestAccess. You need to call requestAuthCode instead.
                    callRequestAuthCode();
                    } else {
                        //User refuses authorization or authorization fails
                        setErrno(errno);
                        setErrString(errString);
                    }
                },
                });
            } else { // The JSSDK version is too low and does not support requestAccess. You need to call requestAuthCode instead.
                callRequestAuthCode();
            }
        }
        console.log('App mounted', code, errno, errString);
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
