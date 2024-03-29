import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetServerErrors } from '../../actions/authentication'

import './message.css';

class Message extends Component {
    render() {
        var messages = []
        if(this.props.list.length || this.props.errors.length) {
            messages = messages.concat(this.props.list);
        }
        var messageList = messages.map(message => {
            return (
                <React.Fragment>
                    <p>{message}</p>
                </React.Fragment>
            )
        })

        if(this.props.errors.length > 0) {
            return(
                <React.Fragment>
                    <div className='center-message'>
                        <div className='message'>
                            <div className='bad centered'>
                                {this.props.errors}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        if(messages.length == 0) {
            return(
                null
            )
        }
        else {
            return(
                <React.Fragment>
                    <div className='center-message'>
                        <div className='message'>
                            <div className={this.props.type}>
                                {messageList}
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            )
        }
    }

    componentWillUnmount() {
        this.props.resetServerErrors();
    }
}

function mapStateToProps(state) {
    return { 
        errors: state.errors
    };
}

export default connect(mapStateToProps, { resetServerErrors })(Message)