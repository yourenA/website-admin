import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { checkLogin} from './actions/login'
import axios from 'axios';
axios.defaults.withCredentials = true;
const store = configureStore();
store.dispatch(checkLogin());
exports.store  = store;
const render = Component =>
    ReactDOM.render(
            <Provider store={store}>
                <Component />
            </Provider>
        ,
        document.getElementById('root')
    );
render(App)

registerServiceWorker();
