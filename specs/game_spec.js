import {MoravecPlayer} from "./bots/MoravecPlayer";

export function gameSpec(spec) {

    // Check info helpers

    async function getCurrentTrialNumber() {
        const levelStateComponent = await spec.findComponent("LevelState");
        return levelStateComponent.props.currentTrialNumber;
    }

    // Assert helpers

    async function assertOperationDisplayShows(result) {
        const operationDisplayComponent = await spec.findComponent('OperationDisplay');

        // TODO: Think if using operationResult() is the best way to scrap the value shown on screen...
        const valueOnScreen = operationDisplayComponent.operationResult().toString();

        if (valueOnScreen !== result) {
            throw Error(`Was expecting to display number ${result} on screen, but it's showing ${valueOnScreen}`);
        }
    }

    async function assertCalculationOKMessageShown() {
        await spec.exists('CorrectAnswerMessage');
    }

    async function assertCalculationWrongMessageShown() {
        await spec.exists('WrongAnswerMessage');
    }

    async function assertNoAnswerFeedbackIsShownToTheUser() {
        await spec.notExists('UserAnswerFeedback');
    }

    async function assertYouCanDoBetterMessageShown() {
        await spec.exists('YouCanDoBetterMessage');
    }

    async function assertCurrentTrialNumberIs(expectedTrialNumber) {
        const currentTrialNumber = await getCurrentTrialNumber();

        if (currentTrialNumber !== expectedTrialNumber) {
            throw Error(`Was expecting current trial to be number ${expectedTrialNumber}, 
                but it's showing ${currentTrialNumber}`);
        }
    }

    // Spec

    spec.describe('As a user', function () {
        const aPlayer = new MoravecPlayer(spec);

        spec.it("hitting the Play button should show me the level selection screen", async function () {
            await spec.exists('PlayButton');
            await aPlayer.startGame();

            await spec.exists('LevelSelection');
        });

        spec.it("I can enter any number and it will be shown in the screen", async function () {
            await aPlayer.startGame();
            await aPlayer.playCurrentLevel();

            await aPlayer.pressANumberSequence("1");

            await assertOperationDisplayShows("1");
        });

        spec.it("I can enter a sequence of numbers and all the digits will be shown in the screen in correct order", async function () {
            await aPlayer.startGame();
            await aPlayer.playCurrentLevel();

            await aPlayer.pressANumberSequence("135");

            await assertOperationDisplayShows("135");
        });

        spec.it("hitting the Enter key without entering a number before does nothing", async function () {
            await aPlayer.startGame();
            await aPlayer.playCurrentLevel();

            await aPlayer.pressEnter();

            await assertNoAnswerFeedbackIsShownToTheUser();
        });

        spec.it("entering a correct answer (before exceeding max solving time) shows an OK message and increases the trial counter", async function () {
            await aPlayer.startGame();
            await aPlayer.playCurrentLevel();
            const previousTrialNumber = await getCurrentTrialNumber();

            await aPlayer.enterTheRightAnswer();

            await assertCalculationOKMessageShown();
            await spec.pause(1000);
            await assertCurrentTrialNumberIs(previousTrialNumber + 1);
        });

        spec.it("entering a WRONG answer (before exceeding max solving time) shows a 'wrong' message and increases the trial counter", async function () {
            await aPlayer.startGame();
            await aPlayer.playCurrentLevel();
            const previousTrialNumber = await getCurrentTrialNumber();

            await aPlayer.enterAWrongAnswer();

            await assertCalculationWrongMessageShown();
            await spec.pause(1000);
            await assertCurrentTrialNumberIs(previousTrialNumber + 1);
        });

        spec.it("entering a WRONG answer out of time (max solving time exceeded) also shows the 'wrong' message and increases the trial counter", async function () {
            await aPlayer.startGame();
            await aPlayer.playCurrentLevel();
            const previousTrialNumber = await getCurrentTrialNumber();

            await aPlayer.waitUntilMaxSolvingTimeIsExceeded();

            await aPlayer.enterAWrongAnswer();

            await assertCalculationWrongMessageShown();
            await spec.pause(1000);
            await assertCurrentTrialNumberIs(previousTrialNumber + 1);
        });

        spec.it("entering a correct answer out of time (max solving time exceeded) shows a 'you can do better' message and does NOT increase the trial counter", async function () {
            await aPlayer.startGame();
            await aPlayer.playCurrentLevel();
            const previousTrialNumber = await getCurrentTrialNumber();

            await aPlayer.waitUntilMaxSolvingTimeIsExceeded();

            await aPlayer.enterTheRightAnswer();

            await assertYouCanDoBetterMessageShown();
            await spec.pause(1000);
            await assertCurrentTrialNumberIs(previousTrialNumber);
        });
    })
}