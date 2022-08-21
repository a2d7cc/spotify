import { TrackAction, TrackActionTypes } from './../../types/tracks';
import { Dispatch } from "react"
import axios from 'axios';

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/tracks')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})            
        } catch (error) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Error while fetching tracks'})
        }
    }
}