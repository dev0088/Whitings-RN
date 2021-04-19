import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import CryptoJS from 'crypto-js';
import {client_id, client_secret, redirect_uri} from './const';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

function MainScreen() {
  const [currentUrl, setCurrentUrl] = useState(
    'https://developer.withings.com/sdk/#/?id=webviews',
  );

  useEffect(() => {
    const createUrl = async () => {
      const external_id = '17633015';
      const preflang = 'en_US';
      const shortname = 'abc';
      const gender = '0';
      const iv = '';

      console.log('client_id: ', client_id, client_secret);
      console.log('client_secret: ', client_id, client_secret);
      // Encrypt sample birthdate data.
      const cryptedbirthdate = CryptoJS.AES.encrypt('12345678', client_secret);

      const userMeasures =
        '[{"value": 180,"unit": -2,"type": 4},{"value": 8000,"unit": -2,"type": 1}]';

      /* Encrypt */
      const cryptedmesures = CryptoJS.AES.encrypt(userMeasures, client_secret);
      console.log('encrypted text: ', cryptedmesures.toString());

      /* Signature */
      const signatureString = `${client_id},${cryptedbirthdate.toString()},${cryptedmesures.toString()},${external_id},${gender},${iv},${preflang},${redirect_uri},${shortname}`;
      const cryptedsignature = await hmacSHA512(signatureString, client_secret);

      const withingsUrl = `https://account.withings.com/sdk/sdk_init?client_id=${client_id}&cryptbirthdate=${cryptedbirthdate}&cryptmeasures=${cryptedmesures}&external_id=${external_id}&gender=${gender}&iv=${iv}&preflang=${preflang}&redirect_uri=${redirect_uri}&shortname=${shortname}&signature=${cryptedsignature}`;

      console.log(withingsUrl);
      setCurrentUrl(withingsUrl);

      /* Decript */
      var bytes = CryptoJS.AES.decrypt(
        cryptedmesures.toString(),
        client_secret,
      );
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      console.log('decrypted text: ', plaintext);
    };

    createUrl();
  }, []);

  return (
    <WebView
      source={{uri: currentUrl}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    backgroundColor: Colors.black,
    flex: 1,
  },
});

export default MainScreen;
