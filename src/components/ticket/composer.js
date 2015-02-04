var React = require('react');

var Composer = React.createClass({
    render: function () {
        return (
            <form className="compose">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="btn-group" data-toggle="buttons">
                            <label className="btn btn-default active">
                                <input type="radio" name="visibility"
                                    value="public"
                                    autoComplete="off"
                                    checked />
                                    Offentligt svar
                            </label>
                            <label className="btn btn-default">
                                <input type="radio" name="visibility"
                                    value="private"
                                    autoComplete="off" />
                                    Intern anteckning
                            </label>
                        </div>
                    </div>
                    <div className="panel-body">
                        <textarea className="form-control" rows="4"></textarea>
                    </div>
                    <div className="panel-footer">
                        <ul className="nav nav-pills">
                            <li>
                                <button type="submit"
                                    className="btn btn-primary">
                                    <i className="fa fa-send"></i> Skicka + <i className="fa fa-archive"></i>
                                </button>
                            </li>
                            <li>
                                <button type="submit"
                                    className="btn btn-default">
                                    <i className="fa fa-send"></i> Skicka
                                </button>
                            </li>
                            <li>
                                <button type="button"
                                    className="btn btn-default tool"
                                    title="Bifoga">
                                    <i className="fa fa-paperclip"></i>
                                </button>
                            </li>
                            <li>
                                <div className="btn-group"
                                    data-toggle="buttons">
                                    <label className="btn btn-default tool">
                                        <input type="checkbox" id="private"
                                            autoComplete="off" />
                                            <i className="fa fa-unlock-alt"></i>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        );
    }
});


module.exports = Composer;