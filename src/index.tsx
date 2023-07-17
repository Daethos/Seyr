import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import combatReducer from './game/reducers/combatState';
import playerReducer from './game/reducers/playerState';
import userReducer from './game/reducers/userState';
import rootSaga from './game/sagas/rootSaga';

const saga = createSagaMiddleware();
const middleware = [saga];
export const store = configureStore({
  reducer: {
    player: playerReducer,
    combat: combatReducer,
    user: userReducer,
    // game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

saga.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);