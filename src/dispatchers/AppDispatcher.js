import { Dispatcher } from 'flux';


class AppDispatcher extends Dispatcher {
    dispatchAsync(promise, types, action = {}) {
        const { request, success, failure } = types;

        this.dispatch(request, action);

        return promise.then(
                response => dispatch(success, { ...action, response }),
                error => dispatch(failure, { ...action, error })
        );
    }

    dispatch(type, action = {}) {
        if (!type) {
            throw new Error('You forgot to specify type.');
        }

        // In production, thanks to DefinePlugin in webpack.config.production.js,
        // this comparison will turn `false`, and UglifyJS will cut logging out
        // as part of dead code elimination.
        if (process.env.NODE_ENV !== 'production') {
            // Logging all actions is useful for figuring out mistakes in code.
            // All data that flows into our application comes in form of actions.
            // Actions are just plain JavaScript objects describing “what happened”.
            // Think of them as newspapers.
            if (action.error) {
                console.error(type, action);
            } else {
                console.log(type, action);
            }
        }

        super.dispatch({ type, ...action });
    }
}

export const dispatcher = new AppDispatcher();

export default dispatcher;
