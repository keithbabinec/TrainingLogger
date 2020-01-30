import IActivity from '../../Models/IActivity';

interface IHomeState {
    recentActivities: IActivity[],
    queryCompleted: boolean,
    queryInProgress: boolean
};

export default IHomeState;