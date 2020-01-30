import IActivity from '../../Models/IActivity';

interface IHomeState {
    recentActivities: IActivity[],
    queryInProgress: boolean
};

export default IHomeState;