import { createStore } from "redux";

// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(initialState, rootReducer) {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  // We'll create our store with the combined reducers and thunk, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(rootReducer, initialState, composeEnhancers());

  return { store };
}
