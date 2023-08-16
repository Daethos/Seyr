import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import combatReducer from './game/reducers/combatState';
import communityReducer from './game/reducers/communityState';
import gameReducer from './game/reducers/gameState';
import userReducer from './game/reducers/userState';
import rootSaga from './sagas/rootSaga';

const saga = createSagaMiddleware();
const middleware = [saga];
export const store = configureStore({
    reducer: {
        combat: combatReducer,
        community: communityReducer,
        user: userReducer,
        game: gameReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

saga.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
    <Router>
        <App />
    </Router>
    </Provider>
);