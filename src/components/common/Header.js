import React, {Component} from "react";
import {View, Text} from "react-native";
import {BackButton} from "./BackButton";
import {Header} from "native-base";
import {HEADER_STYLES} from "../../styles/common/styles";
import {withNavigation} from "react-navigation";

export const MoravecHeader = withNavigation(class extends React.Component {
    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleGoBack(){
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Header style={HEADER_STYLES.header}>
                <View style={HEADER_STYLES.left}>
                    <BackButton goBack={this.handleGoBack}/>
                </View>
                <View style={HEADER_STYLES.titleContent}>
                    <Text style={HEADER_STYLES.title}>{this.props.title}</Text>
                </View>
            </Header>
        )
    }
});