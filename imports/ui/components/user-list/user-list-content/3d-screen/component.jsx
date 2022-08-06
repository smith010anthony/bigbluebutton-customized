import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import Icon from '/imports/ui/components/icon/component';
import { Session } from 'meteor/session';
import {isVideoBroadcasting,screenshareHasEnded} from '/imports/ui/components/screenshare/service';
import { styles } from '/imports/ui/components/user-list/user-list-content/styles';

const intlMessages = defineMessages({
  threeDScreen: {
    id: 'app.3dscreen.PaneTitle',
    description: 'label for 3d screen toggle button',
  },
});

class ThreeDScrrenButton extends PureComponent {
  render() {
    const handleClickToggle3DScreen = () => {
      Session.set('show3DScreen',!Session.get('show3DScreen'));
      if(isVideoBroadcasting()){
        screenshareHasEnded();
      }
      //window.dispatchEvent(new Event('panelChanged'));
    };

    const {
      intl,
      isPresenter,
      pollIsOpen,
      forcePollOpen,
    } = this.props;

    // if (!isPresenter) return null;
    // if (!pollIsOpen && !forcePollOpen) return null;

    return (
      <div className={styles.messages}>
        <div className={styles.container}>
          <h2 className={styles.smallTitle}>
            {intl.formatMessage(intlMessages.threeDScreen)}
          </h2>
        </div>
        <div className={styles.list}>
          <div className={styles.scrollableList}>
            <div
              role="button"
              tabIndex={0}
              className={styles.listItem}
              data-test="3DScrrenMenuButton"
              onClick={handleClickToggle3DScreen}
            >
              <Icon iconName="desktop" />
              <span>{intl.formatMessage(intlMessages.threeDScreen)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(ThreeDScrrenButton);

ThreeDScrrenButton.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  isPresenter: PropTypes.bool.isRequired,
  pollIsOpen: PropTypes.bool.isRequired,
  forcePollOpen: PropTypes.bool.isRequired,
};
