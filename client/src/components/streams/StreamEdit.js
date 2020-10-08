import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStream } from '../../actions';

class StreamEdit extends Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id)
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
    <div>
      {this.props.stream.title}
    </div>
  );
  }
}




const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { getStream })(StreamEdit);
