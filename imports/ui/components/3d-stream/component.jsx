import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FullscreenService from '../fullscreen-button/service';
import FullscreenButtonContainer from '../fullscreen-button/container';
import { styles } from './styles';
import PollingContainer from '/imports/ui/components/polling/container';
import { withLayoutConsumer } from '/imports/ui/components/layout/context';
const intlMessages = defineMessages({
  threeDscreenLabel: {
    id: 'app.3dscreen.3dscreenLabel',
    description: '3 D screen area element label',
  },
});

const ALLOW_FULLSCREEN = Meteor.settings.public.app.allowFullscreen;
const THREEDSCREEN_MEDIA_ELEMENT_NAME='player';

class ThreeDStreamComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      isFullscreen: false,
    };

    this.onFullscreenChange = this.onFullscreenChange.bind(this);
  }

  componentDidMount() {
    this.ThreeDStreamComponent.addEventListener('fullscreenchange', this.onFullscreenChange);

    load('34.244.178.141'); 
    //onIntercat();
  }

  componentDidUpdate(prevProps) {
    const {
      isPresenter,
    } = this.props;
    if (isPresenter && !prevProps.isPresenter) {
        // skip for now
        //threeDscreenHasEnded();
    }
  }

  componentWillUnmount() {
    const {
      getSwapLayout,
      shouldEnableSwapLayout,
      toggleSwapLayout,
    } = this.props;
    const layoutSwapped = getSwapLayout() && shouldEnableSwapLayout();
    if (layoutSwapped) toggleSwapLayout();
    this.ThreeDStreamComponent.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  onFullscreenChange() {
    const { layoutContextDispatch } = this.props;
    const { isFullscreen } = this.state;
    const newIsFullscreen = FullscreenService.isFullScreen(this.ThreeDStreamComponent);
    if (isFullscreen !== newIsFullscreen) {
      this.setState({ isFullscreen: newIsFullscreen });
      layoutContextDispatch({ type: 'setScreenShareFullscreen', value: newIsFullscreen });
    }
  }

  

  

  renderFullscreenButton() {
    const { intl } = this.props;
    const { isFullscreen } = this.state;

    if (!ALLOW_FULLSCREEN) return null;

    return (
      <FullscreenButtonContainer
        key={_.uniqueId('fullscreenButton-')}
        elementName={intl.formatMessage(intlMessages.threeDscreenLabel)}
        fullscreenRef={this.ThreeDStreamComponent}
        isFullscreen={isFullscreen}
        dark
      />
    );
  }

  

  render() {
    console.log('@sxr 3dstream component')
    const { loaded, isFullscreen } = this.state;
    const { isPresenter } = this.props;

    return (
      <div
        className={styles.threeDscreenContainer}
        key="threeDscreenContainer"
        ref={(ref) => { this.ThreeDStreamComponent = ref; }}
      >

        {isFullscreen && <PollingContainer />}

        {loaded && this.renderFullscreenButton()}

        <div  
          style={{ maxHeight: '100%', width: '100%', height: '100%',background:"#ddd",zIndex:99999 }}  
          ref={(ref) => { this.threeDScreen = ref; }}
          id={THREEDSCREEN_MEDIA_ELEMENT_NAME}
          key={THREEDSCREEN_MEDIA_ELEMENT_NAME}
          >

        </div>
      </div>
    )
  }
}

export default injectIntl(withLayoutConsumer(ThreeDStreamComponent));

ThreeDStreamComponent.propTypes = {
  intl: PropTypes.object.isRequired,
  isPresenter: PropTypes.bool.isRequired,
};
