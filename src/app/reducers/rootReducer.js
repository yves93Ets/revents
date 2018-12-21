import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
/*import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import modalsReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';*/

const rootReducer = combineReducers({
    /*
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: FormReducer,
    modals: modalsReducer,
    auth: authReducer,
    toastr: toastrReducer
    async: asyncReducer,*/
    events: eventReducer,
    test: testReducer
})

export default rootReducer;