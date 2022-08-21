import { PlaylistAddOutlined } from '@material-ui/icons';
import { TrackState, TrackAction, TrackActionTypes } from './../../types/tracks';

const initialState: TrackState = {
    tracks: [],
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch(action.type) {
        case TrackActionTypes.FETCH_TRACKS:
            return {error: '', tracks: action.payload}
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}

        default:
            return state
    }
}