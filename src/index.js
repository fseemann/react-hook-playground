import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {NativeForm, FormikForm} from './App';
import * as serviceWorker from './serviceWorker';

function App() {
    return <div>
        <NativeForm></NativeForm>
        <FormikForm></FormikForm>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
