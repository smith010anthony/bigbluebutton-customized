import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Users from '/imports/api/users/';
import Auth from '/imports/ui/services/auth';
import MediaService, { getSwapLayout, shouldEnableSwapLayout } from '/imports/ui/components/media/service';
import {
  isVideoBroadcasting,
  isGloballyBroadcasting,
} from './service';
import ThreeDStreamComponent from './component';

const ThreeDStreamContainer = (props) => {
  let show3DScreen= Session.get('show3DScreen');
  console.log('@sxr 3dstream container show3DScreen',show3DScreen)
  if (show3DScreen && !isVideoBroadcasting() ) {
    console.log('@sxr 3dstream container 111')
    return <ThreeDStreamComponent {...props} />;
  }
  return null;
};

export default withTracker(() => {
  const user = Users.findOne({ userId: Auth.userID }, { fields: { presenter: 1 } });
  return {
    isPresenter: user.presenter,
    getSwapLayout,
    shouldEnableSwapLayout,
    toggleSwapLayout: MediaService.toggleSwapLayout,
  };
})(ThreeDStreamContainer);
