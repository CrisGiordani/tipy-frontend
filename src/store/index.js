import { persistStore } from "redux-persist";

import createSagaMiddleWare from "redux-saga";
import createStore from "./createStore";

import persistReducers from "./persistReducer";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

const sagaMonitor = process.env.NODE_ENV
  ? console.tron.createSagaMonitor()
  : null;

const sagaMiddleware = createSagaMiddleWare({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
