import * as React from 'react';
import * as userModel from '../../data/models/user';
import User from './User';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/store/types';
import * as actions from '../../redux/actions/entities';

interface LoaderProps {
    userId: userModel.Username;
    user: userModel.User | undefined;
    avatarSize: number;
    onLoad: (userId: userModel.Username) => void;
}

interface LoaderState {

}

class Loader extends React.Component<LoaderProps, LoaderState> {


    render() {
        if (this.props.user) {
            return (
                <User user={this.props.user} avatarSize={this.props.avatarSize} />
            );
        } else {
            return (
                <div>
                    Loading user...
                </div>
            );
        }
    }

    componentDidMount() {
        if (!this.props.user) {
            this.props.onLoad(this.props.userId);
        }
    }
}



export interface OwnProps {
    userId: userModel.Username;
    avatarSize: number;
}

interface StateProps {
    user: userModel.User | undefined;
}

interface DispatchProps {
    onLoad: (userId: userModel.Username) => void;
}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    return {
        user: state.entities.users.byId.get(props.userId)
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.EntityAction>): DispatchProps {
    return {
        onLoad: (userId: userModel.Username) => {
            dispatch(actions.userLoader(userId) as any);
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(mapStateToProps, mapDispatchToProps)(Loader);