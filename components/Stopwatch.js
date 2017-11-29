const pad0 = (value) => {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var Stopwatch = React.createClass({
  getInitialState() {
    return {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      running: false
    };
  },
  reset() {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
  },
  format() {
    return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
  },
  start() {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  },
  step() {
    if (!this.state.running) return;
    this.calculate();
  },
  calculate() {
    this.setState({
      miliseconds: this.state.miliseconds + 1
    }, () => {
      if (this.state.miliseconds >= 100) {
        this.setState({
          seconds: this.state.seconds + 1,
          miliseconds: 0
        }, () => {
          if (this.state.seconds >= 60) {
            this.setState({
              minutes: this.state.minutes + 1,
              seconds: 0
            })
          }
        });
      }
    });
  },
  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  },
  render() {
    return (
      <div>
        <nav className="controls">
          <button
            className="button"
            onClick={ this.start }
          >
            Start
          </button>
          <button
            className="button"
            onClick={ this.stop }
          >
            Stop
          </button>
          <button
            className="button"
            onClick={ this.reset }
          >
            Reset
          </button>
        </nav>
        <div className="stopwatch">
          { this.format() }
        </div>
      </div>
    );
  }
});
