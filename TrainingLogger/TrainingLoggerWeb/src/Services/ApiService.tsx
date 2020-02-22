import axios, { AxiosInstance } from 'axios';
import IDistanceActivity from '../Models/IDistanceActivity';

class ApiService {

    // constructor that requires a base URI and a bearer token.
    constructor(baseUri: string, token: string) {
        if (!baseUri) {
            throw new Error('the base uri was not provided');
        }
        if (!token) {
            throw new Error('the auth token was not provided');
        }

        this.AuthenticatedApi = axios.create({
            baseURL: baseUri,
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
    }

    // the authenticated api
    AuthenticatedApi: AxiosInstance;

    // an api operation that calls one of the authorized endpoints.
    GetActivitiesByUser() {
        return this.AuthenticatedApi.get('/activity/get/user')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw Error('An error has occurred calling the api: ' + error);
            });
    }

    AddActivity(newActivity: IDistanceActivity) {
        return this.AuthenticatedApi.post('/activity/add', newActivity)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw Error('Failed to submit the new activity: ' + error);
            });
    }
}

export default ApiService;