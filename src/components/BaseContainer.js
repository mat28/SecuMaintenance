// @flow
import * as React from "react";
import {Button, Header as NBHeader, Left, Body, Title, Right, Icon, Content} from "native-base";
import { EvilIcons } from "@expo/vector-icons";

import Container from "./Container"
import type {NavigationProps, ChildrenProps} from "./Types";
import variables from "../../native-base-theme/variables/commonColor";

type BaseContainerProps = NavigationProps<*> & ChildrenProps & {
    title: string | React.Node,
    scrollable?: boolean,
    footer?: React.Node,
    safe?: boolean,
    bottomColor?: string
};

export default class BaseContainer extends React.Component<BaseContainerProps> {
    render(): React.Node {
        const {title, navigation, scrollable, footer, safe, bottomColor} = this.props;
        return <Container {...{safe, bottomColor}}>
                <NBHeader noShadow>
                    <Left>
                        <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <EvilIcons name="navicon" size={32} color={variables.gray} />
                        </Button>
                    </Left>
                    <Body>
                    {
                        typeof(title) === "string" ? <Title>{title}</Title> : title
                    }
                    </Body>
                    <Right style={{ alignItems: "center" }}>
                        <Button transparent onPress={() => navigation.navigate("Create")}>
                            <Icon name="ios-add-outline" style={{ color: variables.gray, fontSize: 50 }} />
                        </Button>
                    </Right>
                </NBHeader>
                {
                    scrollable ? <Content>
                            {this.props.children}
                        </Content>
                    :
                        this.props.children
                }
                {
                    footer
                }
            </Container>;
    }
}
