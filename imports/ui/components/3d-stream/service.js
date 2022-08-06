import Screenshare from '/imports/api/screenshare';
import Auth from '/imports/ui/services/auth';

const THREEDSCREEN_MEDIA_ELEMENT_NAME = 'screenshareVideo';
let isvideoRunning=false;

let _isSharingScreen = false;
const _sharingScreenDep = {
  value: false,
  tracker: new Tracker.Dependency(),
};

const isSharingScreen = () => {
  _sharingScreenDep.tracker.depend();
  return _sharingScreenDep.value;
};

const setSharingScreen = (isSharingScreen) => {
  if (_sharingScreenDep.value !== isSharingScreen) {
    _sharingScreenDep.value = isSharingScreen;
    _sharingScreenDep.tracker.changed();
  }
};

// A simplified, trackable version of isVideoBroadcasting that DOES NOT
// account for the presenter's local sharing state.
// It reflects the GLOBAL screen sharing state (akka-apps)
const isGloballyBroadcasting = () => {
  const screenshareEntry = Screenshare.findOne({ meetingId: Auth.meetingID },
    { fields: { 'screenshare.stream': 1 } });

  return (!screenshareEntry ? false : !!screenshareEntry.screenshare.stream);
}

const isVideoBroadcasting = () => {
  const sharing = isSharingScreen();
  const screenshareEntry = Screenshare.findOne({ meetingId: Auth.meetingID },
    { fields: { 'screenshare.stream': 1 } });
  const screenIsShared = !screenshareEntry ? false : !!screenshareEntry.screenshare.stream;

  if (screenIsShared && isSharingScreen) {
    setSharingScreen(false);
  }

  return sharing || screenIsShared;
};

export {
  THREEDSCREEN_MEDIA_ELEMENT_NAME,
  isVideoBroadcasting,
  isGloballyBroadcasting,
};
