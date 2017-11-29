var App = React.createClass({
  render: function() {
    return (
      <Stopwatch />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
