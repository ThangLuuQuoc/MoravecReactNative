import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    eraseInput, getPlayedLevelsInfo, hideFeedback, showFeedback, startGame, startLevel, submitTrial,
    typeInput
} from "../actions/game_actions";
import {LevelFinished} from "../components/game/LevelFinished";
import {Game} from "../components/game/Game";
import {LevelSelection} from "../components/game/LevelSelection";

const mapStateToProps = (state) => {
    return state.game
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            startGame: () => {
                dispatch(startGame())
            },
            typeInput: (input) => {
                dispatch(typeInput(input))
            },
            eraseInput: () => {
                dispatch(eraseInput())
            },
            submitTrial: () => {
                dispatch(submitTrial())
            },
            showFeedback: () => {
                dispatch(showFeedback())
            },
            hideFeedback: () => {
                dispatch(hideFeedback())
            },
            startLevel: (level) => {
                dispatch(startLevel(level))
            },
            getPlayedLevelsInfo: () => {
                dispatch(getPlayedLevelsInfo())
            },
        }
    }
};

class GameEngine extends Component {
    static navigationOptions = {
        title: 'Game',
        header: null
    };

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.playNextLevel = this.playNextLevel.bind(this);
        this.replayCurrentLevel = this.replayCurrentLevel.bind(this);
        this.goToHome = this.goToHome.bind(this);
    }

    componentWillMount() {
        this.props.actions.startGame();
    }

    handleSubmit() {
        if (this.userEnteredResult()) {
            this.props.actions.showFeedback();
            setTimeout(this.props.actions.hideFeedback, this.props.feedback.duration);
            this.props.actions.submitTrial();
        }
    };

    userEnteredResult() {
        return this.props.trial.input != null;
    }

    playNextLevel() {
        const currentLevel = this.props.level;
        const nextLevel = currentLevel + 1;
        this.props.actions.startLevel(nextLevel);
    }

    replayCurrentLevel() {
        const currentLevel = this.props.level;
        this.props.actions.startLevel(currentLevel);
    }

    goToHome() {
        this.props.navigation.navigate('Home');
    }

    render() {
        if (this.props.level === null) {
            return <LevelSelection onSelectLevel={this.props.actions.startLevel}
                                   onLoading={this.props.actions.getPlayedLevelsInfo}
                                   levels={this.props.levels}
            />
        } else {
            if (!this.props.levelFinished) {
                return (
                    <Game {...this.props} onSubmit={this.handleSubmit}/>
                );
            } else {
                return <LevelFinished finishedLevel={this.props.level}
                                      onReplayLevel={this.replayCurrentLevel}
                                      onPlayNextLevel={this.playNextLevel}
                                      onHomeButtonPressed={this.goToHome}
                                      totalCorrect={this.props.totalCorrect}
                                      totalTrials={this.props.totalTrials}
                />;
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEngine);