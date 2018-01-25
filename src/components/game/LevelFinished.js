import React from 'react'
import {View, Text} from "react-native";
import {Button, Icon} from "native-base";
import {LevelEfficacyStars} from "../common/LevelEfficacyStars";
import {LEVEL_FINISHED_STYLES} from "../../styles/game/styles";

export class LevelFinished extends React.Component {
    constructor(props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderOptions = this.renderOptions.bind(this);

        this.goToNextLevel = this.goToNextLevel.bind(this);
        this.replayLevel = this.replayLevel.bind(this);
        this.shareLevelResult = this.shareLevelResult.bind(this);

        this.goToMainPage = this.goToMainPage.bind(this);
    }

    renderHeader() {
        return (
            <View style={LEVEL_FINISHED_STYLES.header}>
                <View>
                    <Text style={LEVEL_FINISHED_STYLES.headerCongratulationsText}>
                        Felicitaciones. Nivel completado.
                    </Text>
                </View>
                <View>
                    <View>
                        <Text style={LEVEL_FINISHED_STYLES.headerLevelText}>Nivel {this.props.level}</Text>
                    </View>
                    <LevelEfficacyStars correctAnswers={this.props.totalCorrect} />
                    <View>
                        <Text>{this.props.totalCorrect + ' / ' + this.props.totalTrials + ' correctas'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderOptions() {
        return (
            <View style={LEVEL_FINISHED_STYLES.options}>
                <View>
                    <Button style={LEVEL_FINISHED_STYLES.shareButton} onPress={this.shareLevelResult}>
                        <Text style={LEVEL_FINISHED_STYLES.shareButtonText}>COMPARTIR</Text>
                    </Button>
                </View>
                <View style={LEVEL_FINISHED_STYLES.gameOptionsContainer}>
                    <Button style={LEVEL_FINISHED_STYLES.replayButton} onPress={this.replayLevel}>
                        <Icon name="md-refresh" style={LEVEL_FINISHED_STYLES.replayButtonIcon}/>
                    </Button>
                    <Button style={LEVEL_FINISHED_STYLES.nextLevelButton} onPress={this.goToNextLevel}>
                        <Icon name="md-arrow-round-forward" style={LEVEL_FINISHED_STYLES.nextLevelButtonIcon}/>
                    </Button>
                </View>
            </View>
        )
    }

    goToNextLevel() {
        const actualLevel = this.props.level;
        const nextLevel = actualLevel + 1;
        this.props.startLevel(nextLevel);
    }

    replayLevel() {
        const actualLevel = this.props.level;
        this.props.startLevel(actualLevel);
    }

    shareLevelResult() {

    }

    goToMainPage() {
        const {navigate} = this.props.navigation;
        navigate('Home');
    }

    render() {
        return (
            <View style={LEVEL_FINISHED_STYLES.levelFinished}>
                <View style={LEVEL_FINISHED_STYLES.background}/>
                <View style={LEVEL_FINISHED_STYLES.content}>
                    {this.renderHeader()}
                    {this.renderOptions()}
                </View>
                {/*<View >
                    <Button onPress={this.props.goToMainPage}>
                        <Text>MENU PRINCIPAL </Text>
                    </Button>
                </View>*/}
            </View>
        )
    }
}