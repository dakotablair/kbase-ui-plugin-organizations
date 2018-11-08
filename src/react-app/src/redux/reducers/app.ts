import { Action } from 'redux'
import { ActionFlag } from '../actions'
import { AppSuccess } from '../actions/app';
import { StoreState, AppState } from '../../types';

export function appSuccess(state: StoreState, action: AppSuccess): StoreState {
    return {
        ...state,
        app: {
            status: AppState.READY,
            config: action.config
        }
    }
}

function reducer(state: StoreState, action: Action): StoreState | null {
    switch (action.type) {
        case ActionFlag.APP_SUCCESS:
            return appSuccess(state, action as AppSuccess)
        default:
            return null
    }
}

export default reducer