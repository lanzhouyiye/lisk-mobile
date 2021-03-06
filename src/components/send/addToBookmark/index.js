import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P, Small } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import Avatar from '../../avatar';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { tokenMap } from '../../../constants/tokens';
import { accountFollowed as accountFollowedAction } from '../../../actions/accounts';
import { deviceType, deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';
import DropDownHolder from '../../../utilities/alert';

const isAndroid = deviceType() === 'android';
const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

@connect(null, {
  accountFollowed: accountFollowedAction,
})
class AddToBookmark extends React.Component {
  state = {
    buttonTitle: '',
    label: {
      value: '',
      validity: -1,
    },
  };

  validator = str => (str.length > 20 ? 1 : 0)

  componentDidMount() {
    const { prevStep, navigation: { setParams } } = this.props;

    setParams({
      title: isSmallScreen ? 'Send' : 'Add to bookmarks',
      showButtonLeft: true,
      action: () => prevStep(),
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lng !== this.props.lng) {
      const {
        navigation: { setParams },
      } = this.props;
      setParams({
        title: isSmallScreen ? 'Send' : 'Add to bookmarks',
      });
    }
  }

  onChange = (value) => {
    const { t } = this.props;
    this.setState({
      buttonTitle: (value.length > 0) ? t('Save and continue') : t('Continue'),
      label: {
        value,
        validity: this.validator(value),
      },
    });
  }

  forward = () => {
    this.props.move({
      to: 2,
    });
  }

  saveAndContinue = () => {
    const { t } = this.props;
    const { value, validity } = this.state.label;

    if (validity !== 1) {
      DropDownHolder.closeAlert();

      if (value.length > 0) {
        const { accountFollowed, sharedData } = this.props;
        accountFollowed(sharedData.address, value);
      }

      this.forward();
    } else {
      DropDownHolder.error(t('Error'), t('The label must be shorter than 20 characters.'));
    }
  }

  render() {
    const {
      settings, styles, sharedData: { address }, t,
    } = this.props;
    const { label } = this.state;
    const shouldDisplayAvatar = settings.token.active === tokenMap.LSK.key;

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          onSubmit={this.saveAndContinue}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: this.state.buttonTitle || t('Continue'),
            type: 'inBox',
          }}
        >
          <View>
            {!isSmallScreen ? (
              <View style={styles.headerContainer}>
                <P style={[styles.subHeader, styles.theme.subHeader]}>
                  {t('Optional: add a label to save this address for the future.')}
                </P>
              </View>
            ) : null}

            <View>
              <View style={styles.row}>
                <P style={[styles.label, styles.theme.label]}>
                  {t('Address')}
                </P>

                <View style={styles.addressContainer}>
                  {shouldDisplayAvatar ?
                    <Avatar
                      address={address || ''}
                      style={styles.avatar}
                      size={35}
                    /> : null
                  }

                  <Small style={[styles.address, styles.text, styles.theme.text]}>
                    {address}
                  </Small>
                </View>
              </View>

              <Input
                reference={(el) => { this.input = el; }}
                label={t('Label (optional)')}
                value={label.value}
                autoFocus={!isAndroid}
                autoCorrect={false}
                innerStyles={{ input: styles.input }}
                multiline={true}
                onChange={this.onChange}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(AddToBookmark), getStyles());
