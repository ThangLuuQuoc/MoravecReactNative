import {connect} from "react-redux";
import React from "react";
import {StatsMainScreen} from "../components/statistics/StatsMainScreen";
import {fetchOperationCategoryStats} from "../actions/stats_actions";

class StatsContainer extends React.Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.handleShowOperationStats = this.handleShowOperationStats.bind(this);
    }

    handleShowOperationStats(operationCategory, responseTimes) {
        this.props.navigation.navigate('OperationStatsScreen',
            {operationCategory: operationCategory, responseTimes: responseTimes});
    }

    componentDidMount() {
        this.props.actions.fetchStats();
    }

    render() {
        return <StatsMainScreen operationStats={this.props.operationCategoryStats}
                                onShowOperationStats={this.handleShowOperationStats}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        operationCategoryStats: state.stats.operationCategoryStats
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            fetchStats: () => {
                dispatch(fetchOperationCategoryStats())
            }
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);