// @flow
/* eslint-disable no-console */
import * as React from "react";
//import { Provider } from 'react-redux';
import {Dimensions, StyleSheet} from "react-native";
import {StyleProvider, Icon, Button} from "native-base";
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {useStrict, observable, computed, Provider} from "mobx";
import {observer} from "mobx-react/native";

import {Images, Firebase} from "./src/components";
import {Login} from "./src/login";
import {SignUp} from "./src/sign-up";
import {ForgotPassword} from "./src/forgot-password";
import {Drawer} from "./src/drawer";
import {Home} from "./src/home";
import {Calendar} from "./src/calendar";
import {Overview} from "./src/overview";
import {Groups} from "./src/groups";
import {Lists} from "./src/lists";
import {Profile} from "./src/profile";
import {Timeline} from "./src/timeline";
import {Settings} from "./src/settings";
import {Marker, Maps} from 'react-native-maps';
import {ListsDetail} from './src/listsdetail';
import {Create} from "./src/create";
import MainStore from "./src/MainStore";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import GlobalFont from 'react-native-global-font';
import DevTools from 'mobx-react-devtools';
import RNFetchBlob from 'react-native-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';



@observer
export default class App extends React.Component<{}> {

    store = new MainStore();

    @observable _ready: boolean = false;
    @observable _authStatusReported: boolean = false;
    @observable _isLoggedIn: boolean = false;

    @computed get ready(): boolean { return this._ready; }
    set ready(ready: boolean) { this._ready = ready; }

    @computed get authStatusReported(): boolean { return this._authStatusReported; }
    set authStatusReported(authStatusReported: boolean) { this._authStatusReported = authStatusReported; }

    @computed get isLoggedIn(): boolean { return this._isLoggedIn; }
    set isLoggedIn(isLoggedIn: boolean) { this._isLoggedIn = isLoggedIn; }

    componentWillMount() {
        const promises = [];
        StyleSheet.create({
            book : {
              fontFamily: "Avenir-Book"
            }
          });
            /*Font.loadAsync({
                "Avenir-Book": require("./fonts/Avenir-Book.ttf"),
                "Avenir-Light": require("./fonts/Avenir-Light.ttf")
            })
            let fontName = 'Avenir-Book';
            GlobalFont.applyGlobal(fontName);*/

        Promise.all(promises.concat(Images.downloadAsync()))
            .then(() => this.ready = true)
            .catch(error => console.error(error))
        ;
        useStrict(true);
        Firebase.init();
        Firebase.auth.onAuthStateChanged(async user => {
            this.isLoggedIn = !!user;
            if (this.isLoggedIn) {
                this.store.init();
            }
            this.authStatusReported = true;
        });
    }

    render(): React.Node {
        const {ready, authStatusReported, isLoggedIn, store} = this;
        const onNavigationStateChange = () => undefined;
        return <Provider {...{store}}>
            <StyleProvider style={getTheme(variables)}>
                {
                    ready && authStatusReported ?
                        (
                            isLoggedIn ?
                                <PublicNavigator {...{onNavigationStateChange}} />
                                :
                                <PrivateNavigator {...{onNavigationStateChange}} />
                        )
                        :
                        <Spinner
                        visible={require("./splash.png")}
                        textContent={"Loading..."}
                         textStyle={{color: '#50D2C2'}} />
                }
            </StyleProvider>
        </Provider>
    }
}

// $FlowFixMe
console.ignoredYellowBox = [
    "Setting a timer"
];

const MainNavigator = DrawerNavigator({
    Home: { screen: Home },
    Calendar: { screen: Calendar },
    Overview: { screen: Overview },
    Groups: { screen: Groups },
    Lists: { screen: Lists },
    Maps: { screen: Map },
    Profile: { screen: Profile },
    Timeline: { screen: Timeline },
    Settings: { screen: Settings },
    Create: { screen: Create },
    ListsDetail : {screen : ListsDetail}
}, {
    drawerWidth: Dimensions.get("window").width,
    contentComponent: Drawer
});

const navigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    }
};

const PrivateNavigator = StackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword }
}, navigatorOptions);

const PublicNavigator = StackNavigator({
    Main: { screen: MainNavigator }
}, navigatorOptions);

export {PublicNavigator};
