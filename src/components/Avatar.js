// @flow
import * as React from "react";
import {Image} from "react-native";

import Images from "./images";
import type {BaseProps} from "./Types";

type AvatarProps = BaseProps & {
    size: number,
    id: number
};

export default class Avatar extends React.Component<AvatarProps> {
    static defaultProps = {
        size: 20,
        id: 0
    }

    render(): React.Node {
        const {size, id, style} = this.props;
        let source;
        if (id === 1) {
            source = require("../components/images/avatars/avatar-1.jpg");
        } else if (id === 2) {
            source=require("../components/images/avatars/avatar-2.jpg");
        } else if (id === 3) {
            source=require("../components/images/avatars/avatar-3.jpg");
        } else {
            source=require("../components/images/avatars/default-avatar.jpg");
        }
        return <Image {...{source}} style={[style, { width: size, height: size, borderRadius: size / 2 }]} />;
    }
}
